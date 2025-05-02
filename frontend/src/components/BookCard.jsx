import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  const { token } = useAuth();

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">${book.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={!token}
            className={`flex items-center px-3 py-1 rounded text-sm ${
              token 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            <ShoppingCartIcon className="h-4 w-4 mr-1" />
            {token ? 'Add to Cart' : 'Login Required'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;