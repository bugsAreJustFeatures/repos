import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {

    //create user
    const newFile = await prisma.files.create({
        data: {
            title: "file1",
            link: "https://www.youtube.com/watch?v=aIbyceB8GOQ&t=391s",
            folderId: 36,
            userId: 32,
        },
    });

    //get users
    // const users = await prisma.users.findMany();

    console.log(newFile)
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