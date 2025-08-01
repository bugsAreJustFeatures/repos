import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {

    //create user
    // const newUser = await prisma.users.create({
    //     data: {
    //         username: "Harry",
    //         password: "sdkljfdsklfjdskl"
    //     },
    // })

    //get users
    const users = await prisma.users.findMany();

    console.log(users)
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })