import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Category, Product } from '../types';
import { generateProductDescription } from '../services/gemini';

export const Admin: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  
  // State for form
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState<Category>(Category.HOME);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setQuantity('');
    setCategory(Category.HOME);
    setDescription('');
    setImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setQuantity(product.quantity.toString());
    setCategory(product.category as Category);
    setDescription(product.description);
    setImage(product.image);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDescription = async () => {
    if (!name || !price) {
      alert("Please enter a name and price first.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateProductDescription(name, category, parseFloat(price));
    setDescription(desc);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData: Product = {
      id: editingId || Date.now().toString(),
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category,
      description,
      image: image || 'https://picsum.photos/400/400', // Fallback
    };

    if (editingId) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    resetForm();
  };

  return (
    <div className="pt-28 pb-12 min-h-screen container mx-auto px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <div className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
          {products.length} Products Total
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl sticky top-28">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Product Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-input px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none transition-colors"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full glass-input px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Quantity</label>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full glass-input px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full glass-input px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                >
                  {Object.values(Category).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {image && (
                  <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden border border-slate-200">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-600">Description</label>
                    <button 
                        type="button"
                        onClick={handleGenerateDescription}
                        disabled={isGenerating}
                        className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 disabled:opacity-50"
                    >
                        {isGenerating ? 'Generating...' : '✨ AI Generate'}
                    </button>
                </div>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full glass-input px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none h-24 resize-none"
                  required 
                ></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="submit" 
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  {editingId ? 'Update' : 'Add'} Product
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden border border-slate-100">
                            <img className="h-10 w-10 object-cover" src={product.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {products.length === 0 && (
                <div className="p-8 text-center text-slate-500">No products available. Add one to get started.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};