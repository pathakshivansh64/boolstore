import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();

 
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    if (!token) {
      toast.error('Please login to add items to cart');
      return false;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === book._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === book._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
    toast.success(`${book.title} added to cart!`);
    return true;
  };

  const removeFromCart = (bookId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        cartTotal, 
        cartCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);