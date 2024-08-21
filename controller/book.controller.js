import book from "../models/book.model.js";

export const getBooks = async (req, res) => {
    try {
        const books = await book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};