const { createClient } = require("@supabase/supabase-js");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const supabase = createClient(process.env.PROJECT_URL, process.env.PROJECT_SERVICE_ROLE_KEY);

// upload file manually to files bucket and returns the new file path to use in the next function as well as be stored in the db
async function uploadFile(userId, oldlink, fileName) {
    let storedPath;

    // upload to bucket
    try {
        const { data, error } = await supabase.storage
                                .from("files")
                                .upload(`${userId}/${Date.now()}_${fileName}`, File);
        
        if (error) {
            throw new Error(error);
        };

        console.log("File Uploaded: ", data);
        storedPath = data.path;
    } catch (err) {
        console.log("Error whilst uploading file: ", err);
        return;
    };

    // use file path that i just stored in bucket and upload to db
    try {
        await prisma.files.updateMany({
            where: {
                userId: userId,
                link: oldlink,
            },
            data: {
                link: storedPath,
            },
        });
    } catch (err) {
        console.log("Error whilst updating db: ", err);
    };

    return;
};

// download file from files bucket  
async function downloadFile(storedPath) {
    try {
        await supabase.storage.
        from("files").
        createSignedUrl(storedPath, 60, {
            download: true,
        });

        return;
    } catch (err) {
        console.log("Error whilst trying to download file from cloud: ", err);
        return;
    };
};

module.exports = {
    uploadFile,
    downloadFile,
};