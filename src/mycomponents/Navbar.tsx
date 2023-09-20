"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import Darkmodetoggle from "@/mycomponents/darkmodetoggle";

import Link from "next/link";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import { FC } from "react";
import Image from "next/image";

interface NavbarProps {}

const apiList: { name: string; href: string; description: string }[] = [
  {
    name: "Rick and Morty",
    href: "/api/rickandmorty",
    description: "Rick and Morty Characters, Locations and Episodes.",
  },
  {
    name: "Fake Store",
    href: "/api/fakestore",
    description: "Fake ecommerce store.",
  },
  {
    name: "CATAAS",
    href: "/api/cataas",
    description: "Cat as a service. Images of some lovely felines.",
  },
  {
    name: "Dad Jokes",
    href: "/api/dadjokes",
    description: "Some classic dad jokes.",
  },
];

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <>
      <nav className="flex justify-between w-full sticky top-0 z-10 bg-white dark:bg-neutral-900 drop-shadow-xl">
        <div className="flex flex-row lg:space-x-2 md:space-x-4 sm:space-x-8">
          <div className="w-12 h-12 sm:w-24 sm:h-24 text-center m-1 sm:m-4">
            <Image
              src="https://placehold.co/64x64"
              width={100}
              height={100}
              alt="logo"
              unoptimized
            />
          </div>
          <div className="flex flex-row justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>API List</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {apiList.map((item) => (
                        <Link
                          key={item.name}
                          title={item.name}
                          href={item.href}
                          className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-4 rounded-lg"
                        >
                          <h1 className="font-bold">{item.name}</h1>
                          <br />
                          <h2 className="text-gray-500">{item.description}</h2>
                        </Link>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/profile" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Profile
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex flex-row justify-center self-center mr-1 sm:mr-8">
          <Darkmodetoggle />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
