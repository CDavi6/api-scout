import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FakeStoreNavbarProps {}

const FakeStoreNavbar: FC<FakeStoreNavbarProps> = ({}) => {
  return (
    <>
      <div className="bg-white dark:bg-neutral-800 drop-shadow-xl flex justify-center items-center h-24 space-x-8">
        <Button className="w-[100px] h-[40px] relative active:bg-neutral-400">
          <Link
            href="/api/fakestore"
            className="absolute inset-0 w-full h-full text-white dark:text-black text-center flex items-center justify-center"
          >
            Store
          </Link>
        </Button>
        <Button className="w-[100px] h-[40px] relative active:bg-neutral-400">
          <Link
            href="/api/fakestore/cart"
            className="absolute inset-0 w-full h-full text-white dark:text-black text-center flex items-center justify-center"
          >
            Cart
          </Link>
        </Button>
      </div>
    </>
  );
};

export default FakeStoreNavbar;
