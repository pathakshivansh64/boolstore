import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getBookById, buyBook } from '../api/books';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const { token } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleBuyNow = async () => {
    try {
      await buyBook(id, token);
      alert(`You have successfully purchased "${book.title}"!`);
    } catch (err) {
      setError('Purchase failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!book) {
    return <div className="text-center mt-8">Book not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-2/3">
            <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-gray-600 mt-2">by {book.author}</p>
            <div className="mt-4 flex items-center">
              <span className="text-yellow-400">★★★★★</span>
              <span className="ml-2 text-gray-600">{book.rating}/5</span>
            </div>
            <p className="text-2xl font-bold text-indigo-600 mt-4">
              ${book.price.toFixed(2)}
            </p>
            <p className="mt-6 text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => addToCart(book)}
                className="btn btn-secondary"
              >
                Add to Cart
              </button>
              {token && (
                <button
                  onClick={handleBuyNow}
                  className="btn btn-primary"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;