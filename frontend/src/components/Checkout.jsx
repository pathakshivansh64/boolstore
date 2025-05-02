import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/'); 
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input 
            type="text" 
            placeholder="4242 4242 4242 4242" 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            disabled={isProcessing}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiration</label>
            <input 
              type="text" 
              placeholder="MM/YY" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              disabled={isProcessing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input 
              type="text" 
              placeholder="123" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              disabled={isProcessing}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center ${isProcessing ? 'opacity-75' : ''}`}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Complete Payment'
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;