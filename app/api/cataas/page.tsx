"use client";

import { FC } from "react";
import Image from "next/image";
import { useState } from "react";

import Navbar from "@/mycomponents/Navbar";

import { Button } from "@/components/ui/button";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [cat, setCat] = useState("");

  async function getCatImage() {
    setCat("");
    const url = "https://cataas.com/c";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("There was an error, please try again.");
    }

    console.log(response);
    setCat(response.url);
  }

  return (
    <>
      <Navbar />
      <h1>Cat Image!</h1>
      <Button
        onClick={() => {
          getCatImage();
        }}
      >
        Get new cat!
      </Button>
      <img src={cat} alt="" />
    </>
  );
};

export default Page;
