// main imports
import { PrismaClient } from "../database/generated/prisma/index.js";
const prisma = new PrismaClient();

import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

async function postHomeRoute(req, res, next) {

    try {
        // add user via temporary id and store it in jwt to identify the user until they enter a username
        const tempUserId = uuid();

        const addTempUser = await prisma.game_sessions.create({
            data: {
                userId: tempUserId,
            },
        });

        // was not added
        if (!addTempUser) {
            return res.status(500).json({ msg: "could not add temp user" });
        };

        // was added so make jwt and send confirm msg with jwt to frontend
        const token = jwt.sign(
            { id: tempUserId,},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}, 
        );

        return res.status(201).json({ msg: "temp user was made", accessToken: token });
    } catch (err) {
        return res.status(500).json({ msg: "could not setup jwt", err });
    };
};

async function postCheckResults(req, res, next) {
    const resultX = req.body.resultX;
    const resultY = req.body.resultY;
    const sceneNumber = parseInt(req.params.sceneNumber, 10); // need to do this because its passed through json.stringify and prisma expects an integer for the column
    const character = req.body.character;

    // console.log(resultX, resultY, sceneNumber, character)

    try {
        const checkCharacter = await prisma.characters.findFirst({
            where: {
                character_name: character,
            },
            select: {
                id: true,
            },
        });

        const checkPosition = await prisma.positions.findFirst({
            where: {
                sceneId: sceneNumber,
                characterId: checkCharacter.id,
            },
            select: {
                character_position_x: true,
                character_position_y: true,
            },
        });

        // create variables for storing db coordinates
        const storedX = checkPosition.character_position_x;
        const storedY = checkPosition.character_position_y;

        //check if where the user clicked was within the allowed boundaries around the point i have stored in db
        // how big is the area that users can click on image to be correct
        const rangeX = 50;
        const rangeY = 50;
        // furthest they can be away either left (x-axis) or down (y-axis)
        const lowerBoundaryX = storedX - rangeX;
        const lowerBoundaryY = storedY - rangeY;
        // furthest they can be away either right (x-axis) or up (y-axis)
        const upperBoundaryX = storedX + rangeX;
        const upperBoundaryY = storedY + rangeY;
        // check the user's position is correct and do the checks
        const checkX = (resultX > lowerBoundaryX && resultX < upperBoundaryX);
        const checkY = (resultY > lowerBoundaryY) && (resultY < upperBoundaryY);

        // check if the checks passed or failed
        if (checkX && checkY) { // checks passed and user found the character
            return res.status(200).json({ msg: `success`, foundCharacter: character });
        } else {
            return res.status(200).json({ msg: `fail` });
        };

    } catch (err) { // internal error 
        return res.status(500).json({ msg: "Server error", err });
    };
};

async function postStartTimer(req, res, next) {

    const bearerJwt = req.get("Authorization"); // get bearer jwt from the headers
    const accessToken = bearerJwt.split(" ")[1]; // split via space and get the element at index 1, which is jwt
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET); // decode the jwt
    const tempId = decoded.id; //  get temp id from jwt
    const startTime = Date.now();

    try {
        // start session timer

        const addStartTime = await prisma.game_sessions.update({
            where: {
                userId: tempId,
            },
            data: {
                start_time: startTime,
            },
        });

        // addition was not ok
        if (!addStartTime) {
            return res.status(500).json({ msg: "Could not start timer" });
        };

        // went well and time was stored (timer was started)
        return res.status(200).json({ msg: "Timer started", line: 80 });

    } catch (err) {
        return res.status(500).json({ err });
    };
};

async function postFinishGame(req, res, next) {

    // !!!!!! ----- these will need to be changed such as username will come from a form filled out by user and scene name will be passed through request body------ !!!!!!!

    const sceneName = "beach_club"; // change to req.body.sceneName + "_time";
    const username = "abcde"; // change to req.body.username via request body

    // get jwt and decode from authorization header
    const bearerJwt = req.get("Authorization"); // get bearer jwt from the headers
    const accessToken = bearerJwt.split(" ")[1]; // split via space and get the element at index 1, which is jwt
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET); // decode the jwt
    const tempId = decoded.id; //  get temp id from jwt
    const finishTime = Date.now(); // the time at which the user finished

    try {
        // find the time that the scene was started at - will need to reset db every now and again to delete all the started sessions that have not been completed
        const startTime = await prisma.game_sessions.findFirst({
            where: {
                userId: tempId,
            },
            select: {
                start_time: true,
            },
        });

        // calculate time to complete
        const timeToCompleteMs = finishTime - Number(startTime.start_time); //returns in ms and uses Number() to turn from bigint to int
        const timeToCompleteSeconds = timeToCompleteMs / 1000; //returns in seconds

        // add time to complete the scene
        const addSceneTime = await prisma.users.create({
            data: {
                username, 
                [sceneName]: timeToCompleteSeconds, // store time taken to complete in seconds
            },
        });

        // could not add scene time
        if (!addSceneTime) {
            return res.status(500).json({ msg: "could not add scene time" });
        };

        // all went well - so move on to deletion and sending confirmation to frontend

        // delete stored session start time
        const deleteStoredStart = await prisma.game_sessions.deleteMany({
            where: {
                userId: tempId,
            },
        });

        // could not delete start time
        if (!deleteStoredStart) {
            res.status(500).json({ msg: "could not delete stored start time" });
        };

        // send success status code with confirmation msg
        return res.status(201).json({ msg: "new time added" });

    } catch (err) {
        return res.status(500).json({ err });
    };
};

export {
    postHomeRoute,
    postCheckResults,
    postStartTimer,
    postFinishGame,
}