import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books', error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch book', error: err.message });
  }
};

export const addBook = async (req, res) => {
  try {
   
    const { title, author, price, rating } = req.body;
    
    const image = req.file?.path;

    if (!title || !author || !price || !rating || !image)
      return res.status(400).json({ message: 'All book fields including image are required' });

    const book = new Book({ title, author, price, rating, image });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add book', error: err.message });
  }
};

export const buyBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Here you could log purchase, decrease inventory, etc.
    res.status(200).json({ message: `Book '${book.title}' purchased successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to process purchase', error: err.message });
  }
};
