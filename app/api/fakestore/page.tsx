"use client";

import { FC } from "react";

import React, { useState, useEffect } from "react";
import { StarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Navbar from "@/mycomponents/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [data, setData] = useState<Item[]>([]);
  const [amounts, setAmounts] = useState<number[]>([]);

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
    setAmounts(new Array(result.length).fill(1));
  }

  const updateAmount = (index: number, newAmount: number) => {
    const newAmounts = [...amounts];
    newAmounts[index] = newAmount;
    if (newAmount > 0) {
      setAmounts(newAmounts);
    }
  };

  return (
    <>
      <Navbar />
      <Link href={"/api/fakestore/cart"}>Go to cart</Link>
      {data.map((items, index) => (
        <div key={index}>
          <div className="bg-gray-100 dark:bg-neutral-800 w-64 m-4 rounded-2xl flex flex-col items-center text-center">
            <img
              src={items.image}
              width={200}
              height={200}
              alt="Image of product"
              className="p-4"
            />
            <h1 className="text-black dark:text-white text-lg font-bold p-4">
              {items.title}
            </h1>
            <div>
              {/* <li className="text-black">{items.description}</li> */}

              <p className="text-gray-900 dark:text-gray-400 pb-4">
                {items.category.charAt(0).toUpperCase() +
                  items.category.slice(1)}
              </p>

              <button
                className="flex flex-row bg-purple-800 items-center w-40 h-12 rounded-xl hover:w-48 hover:h-16 transition-all active:w-44 active:h-14 active:bg-gray-600"
                onClick={() => updateAmount(index, 1)}
              >
                <div>
                  <p className="text-white font-bold pl-6 text-sm">
                    Add to cart
                  </p>
                  <p className="text-white font-bold pl-6 text-sm">
                    ${items.price}
                  </p>
                </div>
                <ChevronRightIcon
                  width={32}
                  className="bg-transparent rounded-lg text-white ml-auto mr-2"
                />
              </button>
            </div>
            <div className="flex flex-row space-x-4 pt-4">
              <button
                className=" bg-gray-100  dark:bg-neutral-800 text-neutral-800 dark:text-white font-bold text-2xl w-14 active:bg-gray-200 hover:bg-gray-300 dark:active:bg-neutral-600 dark:hover:bg-neutral-700"
                onClick={() => updateAmount(index, amounts[index] - 1)}
              >
                -
              </button>

              <p className="text-neutral-800 dark:text-white font-bold text-2xl">
                {amounts[index]}
              </p>

              <button
                className=" bg-gray-100 dark:bg-neutral-800 text-neutral-800 dark:text-white font-bold text-2xl w-14 active:bg-gray-200 hover:bg-gray-300 dark:active:bg-neutral-600 dark:hover:bg-neutral-700"
                onClick={() => updateAmount(index, amounts[index] + 1)}
              >
                +
              </button>
            </div>
            <br />
            <br />
          </div>
        </div>
      ))}
    </>
  );
};

export default page;
