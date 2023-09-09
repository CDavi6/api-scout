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
    href: "/fakestore",
    description: "Fake ecommerce store.",
  },
  {
    name: "CATAAS",
    href: "/api/cataas",
    description: "Cat as a service. Images of some lovely felines.",
  },
  {
    name: "Dad Jokes",
    href: "/dadjokes",
    description: "Some classic dad jokes.",
  },
];

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <>
      <nav className="flex justify-between w-full">
        <div className="flex flex-row space-x-8">
          <div className="w-24 h-24 text-center mt-4 ml-4">
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
        <div className="flex flex-row justify-center self-center mr-8">
          <Darkmodetoggle />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
