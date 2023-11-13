import dotenv from 'dotenv';
dotenv.config({ path: './.env' })
import connectDB from "./config/db.js";
import app from './app.js';


connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`⚙️ Server running : ${process.env.BASE_URL}:${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
