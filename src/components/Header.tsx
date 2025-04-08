
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Menu, X, Home } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  if (!isAuthenticated) return null;

  return (
    <header className="bg-shop-navy text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span>hiShopping</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-shop-accent transition-colors flex items-center gap-1">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/cart" className="hover:text-shop-accent transition-colors flex items-center gap-1 relative">
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-shop-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Button 
            variant="ghost" 
            className="hover:text-shop-accent transition-colors flex items-center gap-1"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-shop-navy py-4 px-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <button 
              onClick={() => navigateTo('/')}
              className="w-full text-left py-2 hover:bg-blue-900 px-4 rounded flex items-center gap-2"
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            <button 
              onClick={() => navigateTo('/cart')}
              className="w-full text-left py-2 hover:bg-blue-900 px-4 rounded flex items-center gap-2 relative"
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-shop-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={handleLogout}
              className="w-full text-left py-2 hover:bg-blue-900 px-4 rounded flex items-center gap-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
