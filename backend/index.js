import express from "express";
import { PORT, MONGO_URL } from "./config.js"
import mongoose from "mongoose";
import { bookModel } from "./models/model.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

app.use(express.json());

app.use('/books', bookRoutes);

app.get("/", (req, res) => {
    console.log(req)
    return res.status(200).send('success')
})

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to Database');

    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`)
    })

}).catch((error) => {
    console.log(error);
})