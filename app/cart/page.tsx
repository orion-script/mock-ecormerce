"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const router = useRouter(); // Initialize router

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="h-12 w-12 object-contain"
                />
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-md"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-md"
                  >
                    +
                  </button>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>

            {/* Checkout Button */}
            <button
              onClick={() => router.push("/checkout")}
              className="w-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors px-5 "
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
