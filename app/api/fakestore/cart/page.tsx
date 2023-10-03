"use client";

import { FC } from "react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/mycomponents/Navbar";
import FakeStoreNavbar from "@/mycomponents/fakestore/FakeStoreNavbar";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../../../../src/redux/reducers/cart/cartActions";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";

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
    total: number;
    price: number;
  };
}

const Page: FC<PageProps> = ({}) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector((state: RootState) => state.cart.price);

  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    // does this once on page load
    getStoreItems();
    showItems();
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

  //#region calculate prices

  const calculateDiscount = (subtotal: number) => {
    const discountPercentage = 20; // 20% discount
    const discountedAmount = (subtotal * discountPercentage) / 100;
    return Math.round(discountedAmount * 100) / 100;
  };

  const calculateTax = (subtotal: number) => {
    const taxPercentage = 4; // 4% tax
    const taxableAmount = subtotal - calculateDiscount(subtotal);
    const taxAmount = (taxableAmount * taxPercentage) / 100;
    // return parseFloat(taxAmount.toFixed(2));
    return Math.round(taxAmount * 100) / 100;
  };

  const calculateTotal = (subtotal: number) => {
    const discountAmount = calculateDiscount(subtotal);
    const taxAmount = calculateTax(subtotal);
    const total = subtotal - discountAmount + taxAmount;
    // return parseFloat(total.toFixed(2));
    return Math.round(total * 100) / 100;
  };

  //#endregion

  //#region add, remove and clear cart

  const addCart = (id: number, amount: number, price: number) => {
    dispatch(addToCart(id, amount, price));
  };

  const removeCart = (id: number, amount: number, price: number) => {
    dispatch(removeFromCart(id, amount));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  //#endregion

  function hasSpecificElements(elements: any, ...targetTags: any) {
    for (const element of elements) {
      for (const targetTag of targetTags) {
        if (element.type === targetTag) {
          return true;
        }
      }
    }

    return false;
  }

  const showItems = () => {
    const dataIds = new Set(data.map((item) => item.id)); // Create a Set of data ids
    const matchingElements = [];

    // Check if all items in the cart have an amount of 0
    const isCartEmpty = cartItems.every((item) => item.amount === 0);

    if (isCartEmpty) {
      // Display "Cart Empty" if all items have an amount of 0
      matchingElements.push(
        <div className="text-center">
          <p>Cart Is Empty!</p>
        </div>
      );
    } else {
      // Render the items in the cart with non-zero amounts
      for (let i = 0; i < cartItems.length; i++) {
        if (dataIds.has(cartItems[i].id)) {
          if (cartItems[i].amount > 0) {
            matchingElements.push(
              <div className="flex flex-row my-2">
                {/* Image */}
                <div className="bg-neutral-100 dark:bg-neutral-700 w-20 h-20 rounded-sm flex justify-center border-2 dark:border-neutral-700">
                  <img
                    src={data[i].image}
                    alt=""
                    className="p-1 aspect-square rounded-lg mix-blend-multiply"
                  />
                </div>

                {/* Title and category */}
                <div className="pl-2 flex flex-col flex-grow justify-center space-y-2">
                  <div className="font-bold text-xs">
                    <h1>{data[i].title}</h1>
                  </div>
                  <div className="text-neutral-400 text-xs">
                    <p>{data[i].category}</p>
                  </div>
                </div>

                {/* Counter */}
                <div className="flex items-center">
                  <div className="border-2 flex items-center w-32 justify-evenly rounded-lg h-10 dark:border-neutral-700">
                    <Button
                      className="bg-white dark:bg-[#121212] h-8 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 active:bg-neutral-400 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
                      onClick={() => {
                        removeCart(data[i].id, 1, data[i].price);
                      }}
                    >
                      -
                    </Button>

                    <p className="px-2">{cartItems[i].amount}</p>

                    <Button
                      className="bg-white dark:bg-[#121212] h-8 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 active:bg-neutral-400 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
                      onClick={() => {
                        addCart(data[i].id, 1, data[i].price);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex justify-center items-center ml-4 w-20">
                  <h1 className="font-bold">${data[i].price}</h1>
                </div>

                {/* Remove from cart */}
                <div className="flex items-center ml-4 mr-4">
                  <Button
                    className="bg-transparent"
                    onClick={() => {
                      removeCart(
                        data[i].id,
                        cartItems[i].amount,
                        data[i].price
                      );
                    }}
                  >
                    <Trash2Icon className="text-neutral-700" />
                  </Button>
                </div>
              </div>
            );
          }
        }
      }
    }

    return matchingElements;
  };

  return (
    <>
      <title>API Scout - Cart</title>
      <Navbar />
      <FakeStoreNavbar />
      <Button
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        Clear Cart
      </Button>
      <h1 className="text-center font-bold text-2xl">Your Cart</h1>
      <div className="flex justify-center">
        <div className="w-[350px] md:w-[700px] lg:w-[900px]">
          <hr />
          <hr />
          <div
            className={`flex flex-col h-[300px] ${
              hasSpecificElements(showItems(), "p")
                ? "overflow-hidden"
                : "overflow-y-scroll"
            }`}
          >
            {showItems()}
          </div>
          <hr />
          <br />
          {/* Promocode */}
          <div className="py-2 space-y-2">
            <div className="flex flex-row space-x-1 border-2 p-1 rounded-lg dark:border-neutral-700">
              <input
                type="text"
                placeholder="Promocode"
                className="w-full outline-none rounded-lg bg-transparent"
              />
              <Button className="active:bg-neutral-600">Apply</Button>
            </div>
            <p className="text-neutral-400">20% off discount</p>
          </div>
          <hr />
          <hr />
          <br />
          <br />
          {/* Final price */}
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <h1>Subtotal</h1>
              <p>${Math.round(subtotal * 100) / 100}</p>
            </div>
            <div className="flex flex-row justify-between text-neutral-400">
              <h1>Discount</h1>
              <p>(20%) - ${calculateDiscount(subtotal)}</p>
            </div>
            <div className="flex flex-row justify-between text-neutral-400">
              <h1>Tax</h1>
              <p>+ ${calculateTax(subtotal)}</p>
            </div>
            <br />
            <hr />
            <br />
            <div className="flex flex-row justify-between">
              <h1>Total</h1>
              <p className="font-bold">${calculateTotal(subtotal)}</p>
            </div>
          </div>
          <br />
          {/* Checkout or continue shopping */}
          <div className="flex flex-col space-y-2">
            <Button className="active:bg-neutral-600">
              Proceed to Checkout
            </Button>
            <Button className="bg-white hover:bg-neutral-300 active:bg-neutral-600 active:text-white text-black border-2">
              <Link href={"/api/fakestore"}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
