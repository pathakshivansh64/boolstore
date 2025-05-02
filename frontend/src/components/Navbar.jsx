import {
  ShoppingCartIcon,
  UserIcon,
  ArrowLongRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Cart from './Cart';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { cartCount } = useCart();
  const { token, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (!token) {
      toast.error('Please login to view your cart');
      return;
    }
    setIsCartOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-indigo-600">
          BookStore
        </a>

        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder='Search books (e.g. "Harry Potter price:10-20")'
              className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleCartClick}
            className="relative p-2 text-gray-700 hover:text-indigo-600"
            aria-label="Cart"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {token && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {token ? (
            <button
              onClick={logout}
              className="p-2 text-gray-700 hover:text-indigo-600"
              aria-label="Logout"
            >
              <ArrowLongRightIcon className="h-6 w-6" />
            </button>
          ) : (
            <a href="/login" className="p-2 text-gray-700 hover:text-indigo-600">
              <UserIcon className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
};

export default Navbar;
