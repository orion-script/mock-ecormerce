"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart, Product as CartProduct } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define interface for API product (without quantity)
interface APIProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function Shop() {
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<APIProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError(
          `Something went wrong! ${
            error instanceof Error ? error.message : String(error)
          }`
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  // Function to convert APIProduct to CartProduct
  const convertToCartProduct = (product: APIProduct): CartProduct => {
    return {
      ...product,
      quantity: 1,
    };
  };

  // Function to handle adding/removing from cart with toast notification
  const handleCartAction = (product: APIProduct) => {
    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      removeFromCart(product.id);
      toast.warn(`${product.title.slice(0, 20)}... removed from cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      addToCart(convertToCartProduct(product));
      toast.success(`${product.title.slice(0, 20)}... added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">Shop Our Products</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isInCart = cart.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4"
              >
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h2
                  className="text-lg font-semibold mt-2 truncate"
                  title={product.title}
                >
                  {product.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-300">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleCartAction(product)}
                  className={`mt-4 w-full py-2 rounded-lg transition-colors ${
                    isInCart
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                  }`}
                >
                  {isInCart ? "Remove from Cart" : "Add to Cart"}
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
