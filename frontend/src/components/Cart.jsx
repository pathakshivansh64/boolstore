import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose(); 
    navigate('/checkout'); 
  };

  if (!token) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-4">Please Login</h2>
          <p className="mb-6">You need to be logged in to view your cart.</p>
          <button
            onClick={onClose}
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="divide-y">
              {cart.map(item => (
                <div key={item._id} className="py-4 flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={clearCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded mb-2 flex items-center justify-center"
              >
                <TrashIcon className="h-5 w-5 mr-2" />
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;