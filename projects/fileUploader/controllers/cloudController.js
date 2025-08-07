const { createClient } = require("@supabase/supabase-js");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const supabase = createClient(process.env.PROJECT_URL, process.env.PROJECT_SERVICE_ROLE_KEY);

// upload file manually to files bucket and returns the new file path to use in the next function as well as be stored in the db
async function uploadFile(userId, oldlink, fileName, fileData) {
    let storedPath;

    // upload to bucket
    try {
        const { data, error } = await supabase.storage
        .from("files-bucket")
        .upload(`${userId}_${Date.now()}_${fileName}`, fileData.buffer, {
            contentType: fileData.mimetype
        });
        
        if (error) {
            console.log("Error from uploading to bucket: ", error);
        };

        console.log("File Uploaded: ", data);
        storedPath = data.path;
    } catch (err) {
        console.log("Error whilst uploading file: ", err);
        return;
    };

    // use file path that i just stored in bucket and upload to db
    try {
        console.log("Stored path check", storedPath);
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
        return;
    };

};

// download file from files bucket  
async function downloadFile(fileStart, fileEnd) {
    const { data, error } = await supabase
    .from('files')
    .select('link')
    .like('link', `${fileStart}%`)
    .like('link', `%${fileEnd}`);

    if (error || !data) {
        console.log("Error whilst trying to find file in db: ", error);
        return;
    };

    console.log(`fileStart: ${fileStart}`);
    console.log(`fileEnd: ${fileEnd}`);

    console.log(data[0].link)
    const storedPath = data[0].link;

    const { data: signedData, error: signedError } = await supabase.storage
    .from('files-bucket')
    .createSignedUrl(storedPath, 60, {
        download: true
    });

    console.log(signedData)
    if (signedError) {
        console.log("Error whilst making a signed URL: ", signedError);
    };

    console.log(`SignedURL should be made now: ${signedData.signedUrl}`);
    return signedData.signedUrl;
    
};

module.exports = {
    uploadFile,
    downloadFile,
};