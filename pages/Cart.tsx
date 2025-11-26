import React from 'react';
import { useStore } from '../context/StoreContext';

export const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, totalCartAmount, clearCart } = useStore();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-12 min-h-screen container mx-auto px-4 max-w-2xl text-center">
        <div className="glass p-12 rounded-3xl">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
          <p className="text-slate-500">Looks like you haven't added any items yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-12 min-h-screen container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="glass p-4 rounded-xl flex items-center gap-4 transition-all hover:shadow-md">
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-800">{item.name}</h3>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-slate-500 mb-2">{item.category}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center glass-input rounded-lg border border-slate-200">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white/50 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.cartQuantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white/50 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-slate-800">
                    ${(item.price * item.cartQuantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl sticky top-28">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${totalCartAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="h-px bg-slate-200 my-2"></div>
              <div className="flex justify-between text-lg font-bold text-slate-800">
                <span>Total</span>
                <span>${totalCartAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                alert('Checkout feature coming soon!');
                clearCart();
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};