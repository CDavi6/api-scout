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
import Image from "next/image";

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
  amount: number;
};

interface RootState {
  cart: {
    items: Item[];
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
            <div className="flex flex-col bg-white dark:bg-neutral-800 w-full">
              <div className="flex flex-row my-2">
                {/* Image Div */}
                <div className="bg-neutral-100 dark:bg-neutral-700 w-20 h-20 rounded-sm flex justify-center border-2">
                  <img
                    src={data[i].image}
                    alt=""
                    className="p-1 aspect-square rounded-lg mix-blend-multiply"
                  />
                </div>

                {/* Title and category */}
                <div className="pl-2 flex flex-col justify-center space-y-2">
                  <div className="font-bold text-xs">
                    <h1>{data[i].title}</h1>
                  </div>
                  <div className="text-neutral-400 text-xs">
                    <p>{data[i].category}</p>
                  </div>
                </div>

                {/* Counter */}
                
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
      <div className="center w-[350px] md:w-[700px] lg:w-[900px]">
        {showCart()}
      </div>
    </>
  );
};

export default Page;
