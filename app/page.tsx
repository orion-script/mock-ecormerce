"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Shop from "@/components/Shop";

export default function Home() {
  return (
    <div className="w-full h-auto">
      <Navbar />
      <Shop />
    </div>
  );
}
