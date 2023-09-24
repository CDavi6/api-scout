"use client";

import { FC } from "react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/mycomponents/Navbar";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../../../../src/redux/reducers/cartStuff/cartActions";

interface PageProps {}

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

interface RootState {
  cart: {
    items: {
      [x: string]: number;
      id: number;
      amount: number;
    };
  };
}

const Page: FC<PageProps> = ({}) => {
  const dispatch = useDispatch();

  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    // does this once on page load
    getStoreItems();
    showCart();
  }, []);

  async function getStoreItems() {
    // fetch api data
    const url = "https://fakestoreapi.com/products";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const result = await response.json();
    setData(result);
  }

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const clear = () => {
    dispatch(clearCart());
  };

  const remove = (id: number, amount: number) => {
    dispatch(removeFromCart(id, amount));
  };

  const showCart = () => {
    const dataIds = new Set(data.map((item) => item.id)); // Create a Set of data ids
    const matchingElements = [];

    for (let i = 0; i < cartItems.length; i++) {
      if (dataIds.has(cartItems[i].id)) {
        if (cartItems[i].amount > 0) {
          matchingElements.push(
            <div>
              <div className="bg-gray-100 dark:bg-neutral-800 m-4 rounded-2xl flex flex-col items-center text-center w-48 h-96 justify-center align-middle">
                <img
                  src={data[i].image}
                  width={128}
                  height={128}
                  alt="Image of product"
                  className="p-4 mix-blend-multiply"
                />
                <h1 className="text-black dark:text-white font-bold p-2 text-sm">
                  {data[i].title}
                </h1>
                <div>
                  <p className="text-gray-900 dark:text-gray-400 pb-4 text-8">
                    {data[i].category.charAt(0).toUpperCase() +
                      data[i].category.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-black dark:text-white font-bold p-2 text-sm">
                    {cartItems[i].amount}
                  </p>
                </div>
                <div className="flex flex-row justify-around space-x-4">
                  <Button
                    className="bg-red-500 hover:bg-red-400 active:bg-neutral-600 w-20"
                    onClick={() => {
                      remove(cartItems[i].id, 1);
                    }}
                  >
                    Remove 1
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-400 active:bg-neutral-600 w-20"
                    onClick={() => {
                      remove(cartItems[i].id, cartItems[i].amount);
                    }}
                  >
                    Remove All
                  </Button>
                </div>
              </div>
            </div>
          );
        }
      } else {
        return (
          <>
            <h1>Cart is empty!</h1>
          </>
        );
      }
    }

    return matchingElements;
  };

  return (
    <>
      <title>API Scout - Cart</title>
      <Navbar />
      <h1>Cart</h1>
      <Button
        onClick={() => {
          clear();
        }}
      >
        Clear Cart
      </Button>
      <br />
      <br />
      {showCart()}
    </>
  );
};

export default Page;
