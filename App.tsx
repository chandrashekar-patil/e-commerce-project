import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';
import { PageView } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('HOME');

  const renderPage = () => {
    switch (currentPage) {
      case 'HOME':
        return <Home />;
      case 'CART':
        return <Cart />;
      case 'ADMIN':
        return <Admin />;
      default:
        return <Home />;
    }
  };

  return (
    <StoreProvider>
      <div className="min-h-screen text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-700">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="transition-all duration-500 ease-in-out">
          {renderPage()}
        </main>
      </div>
    </StoreProvider>
  );
}

export default App;