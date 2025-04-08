
import { Product } from "../contexts/CartContext";

const BASE_URL = 'https://fakestoreapi.com';

export const API = {
  // Product APIs
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error(`Failed to fetch products in ${category}`);
    return response.json();
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
    return response.json();
  },

  // Category APIs
  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  }
};
