// import { PrismaClient } from "../database/prisma/index.js";

async function postLogin(req, res, next) {
    console.log("Youve been logged in");
};

async function postRegister(req, res, next) {
    console.log(req.body.username);
};

export {
    postLogin,
    postRegister,
}