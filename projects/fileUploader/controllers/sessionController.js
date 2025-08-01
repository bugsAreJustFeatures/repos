// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

function createSession(passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await prisma.users.findFirst({
                    where: {
                        username: username
                    },
                });

                //check user is existing otherwise return error message - in form of text, not an error
                if (!user) {
                    return done(null, false, { errors: `Invalid username entered!` });
                };
                
                //if user exists, then check password
                const match = await bcrypt.compare(password, user.password);

                //if they dont match return  err message again, otherwise authorise user
                if (!match) {
                    return done(null, false, { errors: `Invalid password entered`});
                } else {
                    return done(null, user);
                };

            } catch (err) {
                return done(err)
            }
        })
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

            return done(null, user)
        } catch (err) {
            return done(err)
        }
    });
};

module.exports = createSession;