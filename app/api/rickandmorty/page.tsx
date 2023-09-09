"use client";

import { FC } from "react";

import Character from "./Character";
import Location from "./Location";
import Episode from "./Episode";

import { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/mycomponents/Navbar";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const props = {
    id: "",
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {
      name: "",
    },
    location: {
      name: "",
    },
    image: "",
    url: "",
    episode: "",
    created: "",
  };

  const minPage = 1;

  const [CharacterLocationEpisode, setCharacterLocationEpisode] =
    useState("character");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(42);
  const [obj, setObj] = useState([props]);

  useEffect(() => {
    getRickandMorty("character", 1);
  }, []);

  async function getRickandMorty(
    CharacterLocationEpisode: string,
    pageNumber: number
  ) {
    const url = `https://rickandmortyapi.com/api/${CharacterLocationEpisode}/?page=${pageNumber}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("There was an error fetching");
    }

    const result = await res.json();
    setObj(result.results);
  }

  function handleStart() {
    getMaxPage();

    let value = minPage;
    setPage(value);
    getRickandMorty(CharacterLocationEpisode, value);
  }

  function handleEnd() {
    getMaxPage();

    let value = maxPage;
    setPage(value);
    getRickandMorty(CharacterLocationEpisode, value);
  }

  function handleNext() {
    getMaxPage();

    let value = page + 1;

    if (value > maxPage) {
      value = maxPage;
    } else {
      setPage(value);
      getRickandMorty(CharacterLocationEpisode, value);
    }
  }

  function handlePrevious() {
    getMaxPage();

    let value = page - 1;

    if (value < minPage) {
      value = 1;
    } else {
      setPage(value);
      getRickandMorty(CharacterLocationEpisode, value);
    }
  }

  function getMaxPage() {
    if (CharacterLocationEpisode === "character") {
      setMaxPage(42);
    } else if (CharacterLocationEpisode === "location") {
      setMaxPage(7);
    } else if (CharacterLocationEpisode === "episode") {
      setMaxPage(3);
    }
  }

  function getCharacters() {
    setCharacterLocationEpisode("character");
    setPage(1);
    setMaxPage(42);
    getRickandMorty("character", 1);
  }

  function getLocations() {
    setCharacterLocationEpisode("location");
    setPage(1);
    setMaxPage(7);
    getRickandMorty("location", 1);
  }

  function getEpisodes() {
    setCharacterLocationEpisode("episode");
    setPage(1);
    setMaxPage(3);
    getRickandMorty("episode", 1);
  }

  return (
    <>
      <Navbar />
      <h1 className="font-bold text-2xl text-red-600 text-center">
        THIS IS A WORK IN PROGRESS. SOME INFO/FEATURES MAY BE BROKEN AND/OR
        INCORRECT
      </h1>
      <div className="flex justify-center mb-4 shadow-lg h-20 relative space-x-2">
        <button onClick={getCharacters} className="hover:text-blue-600">
          Characters
        </button>
        <h1 className="pt-7 cursor-default">|</h1>
        <button onClick={getLocations} className="hover:text-blue-600">
          Locations
        </button>
        <h1 className="pt-7 cursor-default">|</h1>
        <button onClick={getEpisodes} className="hover:text-blue-600">
          Episodes
        </button>
      </div>

      <div className="flex justify-center mb-4 h-20">
        <button onClick={handleStart}>
          <ChevronDoubleLeftIcon className="w-10 hover:text-blue-600" />
        </button>
        <button onClick={handlePrevious}>
          <ChevronLeftIcon className="w-10 hover:text-blue-600" />
        </button>
        <h1 className=" text-4xl m-4 pt-1">{page}</h1>
        <button onClick={handleNext}>
          <ChevronRightIcon className="w-10 hover:text-blue-600" />
        </button>
        <button onClick={handleEnd}>
          <ChevronDoubleRightIcon className="w-10 hover:text-blue-600" />
        </button>
      </div>

      <div className="flex justify-center my-8 p-8">
        <div className="">
          <>
            {obj.map((p, index) => (
              <div key={index}>
                {CharacterLocationEpisode === "character" ? (
                  <Character {...p} />
                ) : CharacterLocationEpisode === "location" ? (
                  <Location {...p} />
                ) : (
                  <Episode {...p} />
                )}
                <br />
              </div>
            ))}

            <div className="flex justify-center mb-4 h-20">
              <button onClick={handleStart}>
                <ChevronDoubleLeftIcon className="w-10 hover:text-blue-600" />
              </button>
              <button onClick={handlePrevious}>
                <ChevronLeftIcon className="w-10 hover:text-blue-600" />
              </button>
              <h1 className=" text-4xl m-4 pt-1">{page}</h1>
              <button onClick={handleNext}>
                <ChevronRightIcon className="w-10 hover:text-blue-600" />
              </button>
              <button onClick={handleEnd}>
                <ChevronDoubleRightIcon className="w-10 hover:text-blue-600" />
              </button>
            </div>

            <br />

            <h1 className="text-center">
              Made with{" "}
              <a
                className="hover:text-blue-600"
                href="https://rickandmortyapi.com"
              >
                https://rickandmortyapi.com
              </a>
            </h1>
          </>
        </div>
      </div>
    </>
  );
};

export default Page;
