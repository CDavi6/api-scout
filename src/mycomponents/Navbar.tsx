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

import Link from "next/link";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import { FC } from "react";

interface NavbarProps {}

const apiList: { name: string; href: string; description: string }[] = [
  {
    name: "Rick and Morty",
    href: "/rickandmorty",
    description: "Rick and Morty Characters, Locations and Episodes.",
  },
  {
    name: "Fake Store",
    href: "/fakestore",
    description: "Fake ecommerce store.",
  },
  {
    name: "Cat Images",
    href: "/catimages",
    description: "Images of some lovely felines.",
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
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>API List</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {apiList.map((item) => (
                  <Link key={item.name} title={item.name} href={item.href} className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-4 rounded-lg">
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
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Profile
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Navbar;
