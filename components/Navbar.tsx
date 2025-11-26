import React from 'react';
import { PageView } from '../types';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const { cart } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.cartQuantity, 0);

  const navItemClass = (page: PageView) => 
    `cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
      currentPage === page 
        ? 'bg-indigo-600 text-white shadow-md' 
        : 'text-slate-600 hover:bg-white/50 hover:text-indigo-600'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto glass rounded-2xl px-6 py-3 flex justify-between items-center shadow-sm">
        <div 
          onClick={() => setCurrentPage('HOME')} 
          className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
        >
          PastelShop
        </div>

        <div className="flex items-center gap-2 md:gap-4 font-medium text-sm md:text-base">
          <button 
            onClick={() => setCurrentPage('HOME')}
            className={navItemClass('HOME')}
          >
            Shop
          </button>
          
          <button 
            onClick={() => setCurrentPage('CART')}
            className={`${navItemClass('CART')} relative`}
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setCurrentPage('ADMIN')}
            className={navItemClass('ADMIN')}
          >
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
};