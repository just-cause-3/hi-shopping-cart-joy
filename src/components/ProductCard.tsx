
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Product, useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail
    e.stopPropagation(); // Stop event propagation
    addToCart(product);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`} className="h-full flex flex-col">
        <div className="h-52 overflow-hidden relative bg-white p-4 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="h-full object-contain"
          />
        </div>
        <CardContent className="py-4 flex-1">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1">{product.title}</h3>
          <p className="font-bold text-lg text-shop-navy">${product.price.toFixed(2)}</p>
          <div className="mt-2">
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
              {product.category}
            </span>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-shop-accent hover:bg-blue-700"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
