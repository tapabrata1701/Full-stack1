// require("dotenv").config({ path: "./env" }); //it will run perfectly
import connectDB from "./db/db.js";  //! '/db.js' is important

import dotenv from "dotenv";

dotenv.config({ 
    path: "../env" 
});

connectDB()  //Returns a promise so we can use .then() and .catch() to handle success and failure respectively.
.then(() =>{
    app.on("error", (error) => {
        console.log("ERRR: ", error);
        throw error
    })

    app.listen(process.env.PORT || 9000, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log("MongoDB connection is failed ", err);
    process.exit(1);
});












/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/