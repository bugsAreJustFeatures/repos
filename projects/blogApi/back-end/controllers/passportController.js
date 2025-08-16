const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `secret`,
    audience: `localhost:3000`,
};

async function createSession(passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                // get user from db
                const user = await prisma.users.findFirst({
                    where: {
                        username: username,
                    },
                });

                // user was not found, so entered wrong username, or does not exist
                if (!user) {
                    return done(null, false, { errors: `Invalid username entered` });
                } 

                // decrypt password in db and compare to newly entered one
                const match = await bcrypt.compare(password, user.password);

                // if passwords are not the same
                if (password !== user.password) { // change to use match above
                    return done(null, false, { errors: `Invalid password entered` });
                } else {  // else give authorise user
                    return done(null, user);
                };


            } catch (err) {
                return done(err);
            };
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.users.findFirst({
                where: {
                    id: id,
                },
            });
            
            return done(null, user);
        } catch (err) {
            return done(err);
        };
    });
};

function authoriseWithJWT (passport) {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            console.log("jwt_payload", jwt_payload)
            try {
                const user = await prisma.users.findFirst({
                    where: {
                        id: jwt_payload.sub,
                    },
                    select: {
                        id: true,
                    },
                });

                if (user) { //user exists
                    console.log("user exists");
                    return done(null, user);
                } else { // user doesnt exist
                    console.log("user doesnt exist");
                    return done(null, false);
                };

            } catch (err) {
                return done(err);
            };
        }),
    );
};

module.exports = {
    createSession,
    authoriseWithJWT,
};