const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.PROJECT_URL, process.env.PROJECT_SERVICE_ROLE_KEY);

async function uploadFileToCloud(userId, fileData) {
    let storedPath;

    // use userId and file name provided from fileData to make a unique file name and then pass in buffer from fileData to send file data to bucket
    try {
        const fileName = `${Date.now()}_${userId}_${fileData.originalname}`;

        const { data, error } = await supabase
        .storage
        .from(`files-bucket`)
        .upload(fileName, fileData.buffer, {
            contentType: fileData.mimetype,
        });

        if (error) {
            console.error("Supabase error: ", error);
            return;
        };

        storedPath = data.path
        // console.log(data)
        return data;
    } catch (err) {
        console.error("Unexpected Error: ", err)
        return;
    };
};

async function downloadFileFromCloud(storedPath) {
    //use storedPath to download from storage
    try {
        const { data, error } = await supabase.storage
        .from("files-bucket")
        .createSignedUrl(storedPath, 60, {
            download: true,
        });

        if (error) {
            console.error("Error with database: ", error);
        };

        return data.signedUrl;
    } catch (err) {
        console.error("Unexpected error whilst downloading: ", err);
        return;
    };
};

module.exports = {
    uploadFileToCloud,
    downloadFileFromCloud,
};