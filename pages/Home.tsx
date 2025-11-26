import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types';

export const Home: React.FC = () => {
  const { products, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categories = ['All', ...Object.values(Category)];

  const handleQuantityChange = (id: string, val: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, val) }));
  };

  const handleAddToCart = (product: any) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
    // Reset quantity selector
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
    // Optional: could show a toast here
  };

  return (
    <div className="pt-28 pb-12 min-h-screen container mx-auto px-4 max-w-6xl">
      
      {/* Hero / Filter Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
          Curated Aesthetics
        </h1>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          Discover our collection of minimalist treasures designed to bring calm and beauty to your everyday life.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white shadow-lg'
                  : 'glass text-slate-600 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="glass rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-64 overflow-hidden relative group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                  {product.category}
                </span>
                <span className="text-lg font-bold text-slate-800">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{product.name}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
                {product.description}
              </p>
              
              <div className="flex items-center gap-3 mt-auto">
                <div className="flex items-center glass-input rounded-lg px-2 py-1 border border-slate-200">
                  <button 
                    onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800"
                  >
                    -
                  </button>
                  <input 
                    type="number"
                    min="1"
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                    className="w-10 text-center bg-transparent outline-none text-slate-800 font-medium"
                  />
                  <button 
                    onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-slate-800 hover:bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition-colors shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p className="text-xl">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};