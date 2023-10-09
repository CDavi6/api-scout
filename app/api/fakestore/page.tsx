"use client";

import { FC } from "react";

import React, { useState, useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Navbar from "@/mycomponents/Navbar";
import FakeStoreNavbar from "@/mycomponents/fakestore/FakeStoreNavbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../../../src/redux/reducers/cart/cartActions";

// Define the type for the item
type Item = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    getStoreItems();
  }, []);

  async function getStoreItems() {
    const url = "https://fakestoreapi.com/products";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const result = await response.json();
    setData(result);
  }

  return (
    <>
      <title>API Scout - Fake Store</title>
      <Navbar />
      <FakeStoreNavbar />
      <div className="bg-white dark:bg-neutral-800">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {data.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-700"
              >
                <div className="aspect-h-3 aspect-w-2 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    <a href={`./fakestore/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-400">
                    {product.description.charAt(0).toUpperCase() +
                      product.description.slice(1)}
                  </p>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-sm italic text-gray-300">
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                    </p>
                    <p className="text-base font-medium text-white">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
