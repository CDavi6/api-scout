"use client";

import { FC } from "react";

import React, { useState, useEffect } from "react";
import { StarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Navbar from "@/mycomponents/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../../../src/redux/reducers/cartStuff/cartActions";

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
  const dispatch = useDispatch();

  const [data, setData] = useState<Item[]>([]);
  const [amounts, setAmounts] = useState<number[]>([]);

  const { toast } = useToast();

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

  const addCart = (
    item: string,
    amount: number,
    price: number,
    index: number,
    id: number
  ) => {
    dispatch(addToCart(id, amount, price));
    console.log(id);

    toast({
      title: "Added to cart!",
      description: `Successfully added ${amount} ${item} to cart.`,
      action: (
        <ToastAction altText="View Cart">
          {" "}
          <Link href={"/api/fakestore/cart"}>Go to cart</Link>
        </ToastAction>
      ),
    });

    updateAmount(index, 1);
  };

  const updateAmount = (index: number, newAmount: number) => {
    const newAmounts = [...amounts];
    newAmounts[index] = newAmount;
    if (newAmount > 0) {
      setAmounts(newAmounts);
    }
  };

  return (
    <>
      <title>API Scout - Fake Store</title>
      <Navbar />
      <Link href="./fakestore/cart">Go to Cart</Link>
      {data.map((items, index) => (
        <div key={index} className="flex">
          <div className="bg-gray-100 dark:bg-neutral-800 m-4 rounded-2xl flex flex-col items-center text-center w-48 align-middle justify-evenly">
            <img
              src={items.image}
              width={128}
              height={128}
              alt="Image of product"
              className="p-4 mix-blend-multiply"
            />
            <h1 className="text-black dark:text-white font-bold p-2 text-sm">
              {items.title}
            </h1>
            <div>
              {/* <li className="text-black">{items.description}</li> */}

              <p className="text-gray-900 dark:text-gray-400 pb-4 text-8">
                {items.category.charAt(0).toUpperCase() +
                  items.category.slice(1)}
              </p>

              <Button
                className="flex flex-row w-36 h-8 rounded-xl hover:bg-gray-700 active:bg-gray-600"
                onClick={() => {
                  addCart(items.title, amounts[index], items.price, index, items.id);
                }}
              >
                <div>
                  <p className="text-white font-bold pl-6 text-xs">
                    Add to cart
                  </p>
                </div>
                <ChevronRightIcon
                  width={16}
                  className="bg-transparent rounded-lg text-white ml-auto mr-2"
                />
              </Button>
            </div>
            <div className="flex flex-row space-x-4 pt-4">
              <Button
                className=" bg-gray-100  dark:bg-neutral-800 text-neutral-800 dark:text-white font-bold text-2xl w-14 active:bg-gray-200 hover:bg-gray-300 dark:active:bg-neutral-600 dark:hover:bg-neutral-700"
                onClick={() => updateAmount(index, amounts[index] - 1)}
              >
                -
              </Button>

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
          </div>
          <div className="flex flex-col w-full h-96 justify-around bg-gray-100 dark:bg-neutral-800 rounded-2xl m-4">
            <div className="text-center font-bold text-sm md:text-xl lg:text-2xl">
              <h1>{items.description}</h1>
            </div>
            <div className="flex justify-center items-center">
              <StarIcon width={48} className="text-yellow-600" />
              &nbsp;
              <p className="font-bold text-xl">{items.rating.rate}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Page;
