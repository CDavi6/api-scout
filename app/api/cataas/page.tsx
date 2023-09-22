"use client";

import { FC } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

import Navbar from "@/mycomponents/Navbar";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [cat, setCat] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCatImage();
  }, []);

  async function getCatImage() {
    setCat("");
    setIsLoading(true);

    const url = "https://cataas.com/cat?width=512&height=512";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("There was an error, please try again.");
    }

    console.log(response);
    setCat(response.url);
    setIsLoading(false);
  }

  return (
    <>
      <title>API Scout - CATAAS</title>
      <Navbar />
      <div className="flex flex-col justify-center items-center space-y-8">
        <h1 className="font-bold text-2xl">Cat As A Service</h1>
        <Button
          onClick={() => {
            getCatImage();
          }}
          className="w-32 hover:w-36 hover:h-14 transition-all active:w-32 active:h-10"
        >
          Get new cat!
        </Button>
        <div>
          {isLoading && <Skeleton className="w-[512px] h-[512px] rounded-lg" />}
          {!isLoading && <img src={cat} alt="" className="rounded-lg" />}
        </div>
        <h1 className="text-center">
          Made with{" "}
          <a className="hover:text-blue-600" href="https://cataas.com">
            https://cataas.com
          </a>
        </h1>
      </div>
    </>
  );
};

export default Page;
