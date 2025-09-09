// main imports
import { PrismaClient } from "../database/generated/prisma/index.js";
const prisma = new PrismaClient();

async function postCheckResults(req, res, next) {
    const resultX = req.body.resultX;
    const resultY = req.body.resultY;
    const sceneNumber = parseInt(req.params.sceneNumber, 10); // need to do this because its passed through json.stringify and prisma expects an integer for the column
    const character = req.body.character;

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
        const rangeX = 60;
        const rangeY = 100;
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
            return res.status(200).json({ msg: `success` });
        } else {
            return res.status(200).json({ msg: `fail` });
        };
        
    } catch (err) { // internal error 
        return res.status(500).json({ msg: "Server error", err });
    };
};

export {
    postCheckResults,
}