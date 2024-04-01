const cloudinary = require("cloudinary").v2;

const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: "dmzbii2tv",
            api_key: "855516411166552",
            api_secret: "RsUTo62LhUkAApS-wu2nh2Vi7g4",
        });
    } catch (error) {
        console.log(error)
    }
};


module.exports = cloudinaryConnect;