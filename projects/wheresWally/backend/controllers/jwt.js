import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { PrismaClient } from "../database/generated/prisma/index.js";
const prisma = new PrismaClient();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    // add issuer in prod
    // add audience in prod
};

export default function authoriseWithJwt(passport) {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            // check user exists in the db
            const user = await prisma.game_sessions.findFirst({
                where: {
                    userId: jwt_payload.id,
                },
            });

            // user doesnt exist
            if (!user) {
                return done(null, false);
            };

            // user exists and can be authorised
            return done(null, user);

        } catch (err) {
            // error occured and could not authorise user
            return done(err);
        };
    }));
};