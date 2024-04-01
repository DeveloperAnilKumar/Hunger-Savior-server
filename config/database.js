const mongoose = require("mongoose")
require("dotenv").config()

const databaseConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URL).then(() => {
            console.log("database connection connect successfully")
        }).catch((error) => {
            console.log("issue with database connection", error)
        })

    } catch (error) {
        console.log("issue with database connection", error)
    }
}

module.exports = databaseConnection;


