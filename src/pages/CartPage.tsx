
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { CartItem, useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, placeOrder } = useCart();
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const handlePlaceOrder = () => {
    setIsOrderDialogOpen(false);
    placeOrder();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/">
              <Button className="bg-shop-accent hover:bg-blue-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-4">
              {cart.map((item) => (
                <CartItemRow 
                  key={item.id} 
                  item={item} 
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsOrderDialogOpen(true)} 
                  className="w-full bg-shop-accent hover:bg-blue-700"
                >
                  Checkout
                </Button>
                
                <div className="mt-4">
                  <Link 
                    to="/" 
                    className="text-shop-navy hover:text-shop-accent text-sm flex justify-center items-center gap-1"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Confirmation Dialog */}
      <AlertDialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to place this order for ${cartTotal.toFixed(2)}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePlaceOrder}>
              Place Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

// Cart Item Component
const CartItemRow = ({ 
  item, 
  updateQuantity, 
  removeFromCart 
}: {
  item: CartItem;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center border border-gray-200 rounded-lg bg-white p-4 gap-4">
      <div className="w-24 h-24 bg-white flex items-center justify-center">
        <Link to={`/product/${item.id}`}>
          <img 
            src={item.image} 
            alt={item.title} 
            className="max-h-full max-w-full object-contain"
          />
        </Link>
      </div>
      
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.id}`} className="hover:text-shop-accent">
          <h3 className="font-medium text-sm sm:text-base line-clamp-2">{item.title}</h3>
        </Link>
        <p className="text-shop-navy font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-gray-300 rounded">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          
          <span className="px-4 py-1">{item.quantity}</span>
          
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <button 
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded"
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartPage;
