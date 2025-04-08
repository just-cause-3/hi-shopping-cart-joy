
import { ReactNode } from 'react';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-shop-navy text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 hiShopping. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
