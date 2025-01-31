"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate Form
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone))
      newErrors.phone = "Valid 10-digit phone number required.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Valid email is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmCheckout = () => {
    setIsModalOpen(false);
    alert("Order placed successfully! ✅");
    clearCart();
    router.push("/");
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cart Summary */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p>
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-bold mt-4">
                Total: ${total.toFixed(2)}
              </h2>
            </div>

            {/* Checkout Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Place Order
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-70">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Confirm Your Order
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to place this order?
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCheckout}
                className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
