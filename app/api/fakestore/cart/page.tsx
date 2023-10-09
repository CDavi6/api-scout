"use client";

import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Navbar from "@/mycomponents/Navbar";
import FakeStoreNavbar from "@/mycomponents/fakestore/FakeStoreNavbar";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "@/redux/reducers/cart/cartActions";
import Image from "next/image";

interface pageProps {}

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

const Page: FC<pageProps> = ({}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector((state: RootState) => state.cart.price);

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

  const calculateTotal = (subtotal: number, discount: boolean) => {
    let total = subtotal;

    if (discount) {
      const discountAmount = calculateDiscount(subtotal);
      total -= discountAmount;
    }

    const taxAmount = calculateTax(subtotal);
    total += taxAmount;

    const shippingCost = 5;
    total += shippingCost;

    return Math.round(total * 100) / 100;
  };

  //#endregion

  //#region add, remove and clear cart

  const addCart = (id: number, amount: number, price: number) => {
    dispatch(addToCart(id, amount, price));
  };

  const removeCart = (id: number, amount: number) => {
    dispatch(removeFromCart(id, amount));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  //#endregion

  return (
    <>
      <Navbar />
      <FakeStoreNavbar />
      <div className="bg-white dark:bg-neutral-900 h-full">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {cartItems.map((product) => (
                  <div key={product.id}>
                    {product.amount > 0 && (
                      <li key={product.id} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <div className="text-sm">
                                  <a
                                    href={`products/${product.id}`}
                                    className="font-medium text-gray-700 hover:text-gray-800 dark:text-white dark:hover:text-gray-400"
                                  >
                                    {product.title}
                                  </a>
                                </div>
                              </div>
                              <div className="flex text-sm mt-1">
                                <p className="text-gray-500 dark:text-gray-400">
                                  {`${
                                    product.category.charAt(0).toUpperCase() +
                                    product.category.slice(1)
                                  } | Qty. ${product.amount}`}
                                </p>
                              </div>
                              <br />
                              <p className="text-sm font-bold text-gray-900 dark:text-white">
                                ${product.price}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-row">
                            <CheckIcon
                              className="h-5 w-5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                            &nbsp; &nbsp;
                            <h1 className="text-black dark:text-white">
                              In Stock
                            </h1>
                          </div>
                        </div>
                        <XMarkIcon
                          className="w-5 h-5 cursor-pointer hover:text-gray-600"
                          onClick={() => {
                            removeCart(product.id, product.amount);
                          }}
                        />
                      </li>
                    )}
                  </div>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 dark:bg-neutral-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900 dark:text-white"
              >
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-white">
                    Subtotal
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${Math.round(subtotal * 100) / 100}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="flex items-center text-sm text-gray-600 dark:text-white">
                    <span>Shipping estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    $5.00
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="flex text-sm text-gray-600 dark:text-white">
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${calculateTax(subtotal)}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    Order total
                  </p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    ${calculateTotal(subtotal, false)}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col">
                <button
                  type="submit"
                  className="mb-2 w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-neutral-800"
                >
                  Checkout
                </button>
                <Link
                  href="/api/fakestore"
                  className="w-full rounded-md border border-transparent bg-gray-600 px-4 py-3 text-center font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-neutral-800"
                >
                  Continue Shopping
                </Link>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
