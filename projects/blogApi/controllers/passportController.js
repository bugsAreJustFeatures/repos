// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

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

                // if passwords are not the same else authorise user
                if (password !== user.password) { // change to use match above
                    return done(null, false, { errors: `Invalid password entered` });
                } else { 
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

module.exports = createSession;