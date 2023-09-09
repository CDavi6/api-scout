import React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Darkmodetoggle from "@/mycomponents/darkmodetoggle";
import Navbar from "@/mycomponents/Navbar";


export default function page() {
  return (
    <>
      <Navbar />
      <Darkmodetoggle />
    </>
  );
}
