import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be greater than 5'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
}, {
  timestamps: true, 
});

export default mongoose.model('Book', bookSchema);
