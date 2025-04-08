
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API } from '../services/api';
import { Product, useCart } from '../contexts/CartContext';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await API.getProductById(parseInt(id));
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-full md:w-1/2 h-80" />
            <div className="w-full md:w-1/2 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full md:w-1/2" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xl text-red-500">Product not found</p>
          <Link to="/" className="text-blue-500 mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-shop-navy hover:text-shop-accent flex items-center gap-1">
            <ArrowLeft size={16} />
            <span>Back to Products</span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-sm flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-80 object-contain"
            />
          </div>
          
          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-2xl font-bold text-shop-navy mb-4">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.round(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            
            <div className="mb-2">
              <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
                {product.category}
              </span>
            </div>
            
            <div className="my-6">
              <h2 className="font-medium mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              className="mt-4 bg-shop-accent hover:bg-blue-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
