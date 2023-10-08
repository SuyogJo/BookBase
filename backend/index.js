import express from "express";
import { PORT, MONGO_URL } from "./config.js"
import mongoose from "mongoose";
import { bookModel } from "./models/model.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log(req)
    return res.status(200).send('success')
})

app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.title || !req.body.title) {
            return res.status(400).send({message: 'include all required parameters'});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await bookModel.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

app.get('/books', async (req, res) => {
    try {
        const books = await bookModel.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

app.get('/books/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const book = await bookModel.findById(id);

        return res.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

app.put('/books/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.title || !req.body.title) {
            return res.status(400).send({message: 'include all required parameters'});
        }
    
        const { id } = req.params;
        const result = await bookModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send({message: 'Book not found'})
        }
        else {
            return res.status(200).send({message: 'Book updated successfully'})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to Database');

    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`)
    })

}).catch((error) => {
    console.log(error);
})