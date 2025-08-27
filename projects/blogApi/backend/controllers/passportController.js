import { Strategy as LocalStrategy } from "passport-local";

import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

// import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

function createSessionWithUser(passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                //find user in db via username
                const user = await prisma.users.findFirst({
                    where: {
                        username: username,
                    },
                });

                // no user in db with username so could redirect to signup page
                if (!user) {
                    return done(null, false, { errors: `Invalid username entered` });
                };

                // check passwords match - uncomment when i want to use encrypted passwords
                // // // // // const match = await bcrypt.compare(password, user.password);
                if (password !== user.password) {
                    return done(null, false, { errors: `Invalid password entered` });
                } else {
                    // details match and user exists
                    return done(null, user)
                };
            } catch (err) {
                console.error(`Error whilst finding user in database: `, err); // get rid when in prod
                return done(err);
            };
        }),
    );

    passport.serializeUser((user, done) => {
        // get user details and make it so only id is used to figure out who the user is
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = prisma.users.findFirst({
                where: {
                    id: id,
                },
            });

            return done(null, user);
        } catch (err) {
            console.error(`Error whilst deserialising user: `, err); //  get rid in prod
            return done(err);
        };
    });
};  


function authenticateUserWithJwt(passport) {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        // find user in db via the payload, which is the id since ive done that in the session above
        try {
            const user = await prisma.users.findFirst({ 
                where: {
                    id: jwt_payload.sub,
                },
            });

            if (user) { // user exists and authenticate with jwt
                return done(null, user);
            } else { // no user was found and cannot authenticate user
                return done(null, false);
            };
        } catch (err) {
            console.log("Unexpected error: ", err);
            return done(err, null);
        }
        
    }));
};

export {
    createSessionWithUser,
    authenticateUserWithJwt,
}


