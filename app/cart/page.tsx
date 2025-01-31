"use client";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 gap-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md gap-4"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-contain"
                    />
                    <div className="flex flex-col flex-1">
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                      <p className="font-bold">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-md disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-md"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg w-full md:w-auto"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>

              {/* Checkout Button */}
              <button
                onClick={() => router.push("/checkout")}
                className="mt-4 w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
