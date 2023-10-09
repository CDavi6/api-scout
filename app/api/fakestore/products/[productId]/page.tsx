"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useDispatch } from "react-redux";
import Navbar from "@/mycomponents/Navbar";
import FakeStoreNavbar from "@/mycomponents/fakestore/FakeStoreNavbar";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../../../../../src/redux/reducers/cart/cartActions";

interface Item {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export default function Page() {
  const dispatch = useDispatch();
  const [data, setData] = useState<Item>();
  const params = useParams();

  const { toast } = useToast();

  //   const [selectedColor, setSelectedColor] = useState(Item.colors[0]);

  async function getStoreItems() {
    const url = `https://fakestoreapi.com/products/${params.productId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const result = await response.json();
    setData(result);
  }

  useEffect(() => {
    getStoreItems();
  }, []);

  const addCart = (
    id: number,
    title: string,
    category: string,
    price: number,
    image: string,
    amount: number
  ) => {
    dispatch(addToCart(id, title, category, price, image, amount));

    toast({
      title: "Added to cart!",
      description: `Successfully added ${amount} ${title} to cart.`,
      action: (
        <ToastAction altText="View Cart">
          {" "}
          <Link href={"/api/fakestore/cart"}>Go to cart</Link>
        </ToastAction>
      ),
    });
  };

  return (
    <>
      <Navbar />
      <FakeStoreNavbar />
      <div className="bg-white dark:bg-neutral-800">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <img src={data?.image} alt="" />

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data?.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
                  ${data?.price}
                </p>
              </div>
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <p className="text-gray-400">{data?.description}</p>

                <form className="mt-6">
                  <div className="sm:flex-col1 mt-10 flex">
                    <button
                      type="button"
                      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white dark:text-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-neutral-800 sm:w-full"
                      onClick={() => {
                        addCart(
                          data?.id ?? 0,
                          data?.title ?? "",
                          data?.category ?? "",
                          parseFloat(data?.price ?? ""),
                          data?.image ?? "",
                          1
                        );
                      }}
                    >
                      Add to cart
                    </button>

                    <button
                      type="button"
                      className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      <HeartIcon
                        className="h-6 w-6 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Add to favorites</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
