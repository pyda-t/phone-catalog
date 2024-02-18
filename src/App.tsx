import { FunctionComponent, useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Styles
import './App.scss';

// Types
import { PageType } from './types/PageType';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { NoResult } from './components/NoResult';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';

const pages: { path: string, type: PageType }[] = [
  { path: 'phones', type: 'phone' },
  { path: 'tablets', type: 'tablet' },
  { path: 'accessories', type: 'accessory' },
  { path: 'favorites', type: 'favorites' },
];

export const App: FunctionComponent = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    if (!menuIsOpen) {
      return;
    }

    setMenuIsOpen(false);
  };

  return (
    <div className="App">
      <Header
        menuIsOpen={menuIsOpen}
        toggleMenu={() => setMenuIsOpen(!menuIsOpen)}
        closeMenu={closeMenu}
      />

      <Menu
        menuIsOpen={menuIsOpen}
        closeMenu={closeMenu}
      />

      <main className="App__Content">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route index element={<HomePage />} />

            {pages.map(page => (
              <Route key={page.path} path={page.path}>
                <Route index element={<ProductsPage type={page.type} />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>
            ))}

            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NoResult message="Page not found..." />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};
