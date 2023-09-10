"use client";

import { FC, useState, useEffect } from "react";
import {
  FingerPrintIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface CharacterProps {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
  episode: string;
  url: string;
  created: string;
}

function getStatus(props: CharacterProps) {
  if (props.status === "Alive") {
    return (
      <div className="flex justify-start">
        <CheckCircleIcon width={24} className="text-green-600" />
        &nbsp;
        <p>{props.status}</p>
      </div>
    );
  } else if (props.status === "Dead") {
    return (
      <div className="flex justify-start">
        <XCircleIcon width={24} className="text-red-600" />
        &nbsp;
        <p>{props.status}</p>
      </div>
    );
  } else {
    return (
      <div className="flex justify-start">
        <QuestionMarkCircleIcon width={24} className="text-gray-600" />
        &nbsp;
        <p>{props.status}</p>
      </div>
    );
  }
}

function getGender(props: CharacterProps) {
  if (props.gender === "Male") {
    return (
      <div className="flex justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-gender-male"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
          />
        </svg>
        &nbsp;
        <p>{props.gender}</p>
      </div>
    );
  } else if (props.gender === "Female") {
    return (
      <div className="flex justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-gender-female"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
          />
        </svg>
        &nbsp;
        <p>{props.gender}</p>
      </div>
    );
  } else {
    return (
      <div className="flex justify-start">
        <QuestionMarkCircleIcon width={24} className="text-gray-600" />
        &nbsp;
        <p>{props.gender}</p>
      </div>
    );
  }
}

function getEpisode(props: CharacterProps) {
  const link = props.episode[0];
  const episodeNumber = link.replace(/\D/g, "");

  return (
    <p>Episode {episodeNumber}</p>
  )
}

// const delay = (ms: number | undefined) =>
//   new Promise((res) => setTimeout(res, ms));

const Character: FC<CharacterProps> = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <div
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        className="bg-gray-100 dark:bg-neutral-800 shadow-lg p-8 rounded-lg w-[364px] transition-all transition-slowest ease md:hover:w-[740px] sm:hover:w-[400px] flex flex-row h-[648px]"
      >
        {isHovering ? (
          <>
            <div className="flex flex-col justify-center items-center rounded-lg">
              <h1 className="font-bold text-lg">{props.name}</h1>

              <hr className="h-4 invisible" />

              <img
                src={props.image}
                alt={props.name}
                className="mt-96 w-full"
              />
            </div>

            <div className="w-full ml-8 flex flex-col items-center justify-center">
              {/* Alive or Dead? */}
              <p className="text-gray-600/50 dark:text-gray-400/50">Status</p>
              {getStatus(props)}

              <hr className="h-4 invisible" />

              {/* Species */}
              <p className="text-gray-600/50 dark:text-gray-400/50">Species</p>
              <div className="flex justify-start">
                <FingerPrintIcon width={24} />
                &nbsp;
                <h1>{props.species}</h1>
              </div>

              <hr className="h-4 invisible" />

              {/* Origin */}
              <p className="text-gray-600/50 dark:text-gray-400/50">Origin</p>
              <div className="flex justify-start">
                <GlobeAltIcon width={24} />
                &nbsp;
                <h1>{props.origin?.name}</h1>
              </div>

              <hr className="h-4 invisible" />

              <p className="text-gray-600/50 dark:text-gray-400/50">First appearance</p>
              <div className="flex justify-start">
                <QuestionMarkCircleIcon width={24} />
                &nbsp;
                {props.episode[0] ? <h1>{getEpisode(props)}</h1> : <h1>N/A</h1>}
              </div>

              <hr className="h-4 invisible" />

              {/* Last Known Location */}
              <p className="text-gray-600/50 dark:text-gray-400/50">Last known location</p>
              <div className="flex justify-start">
                <InformationCircleIcon width={24} />
                &nbsp;
                <h1>{props.location?.name}</h1>
              </div>

              <hr className="h-4 invisible" />

              <p className="text-gray-600/50 dark:text-gray-400/50">Gender</p>
              {getGender(props)}

              <hr className="h-4 invisible" />

              {props.type && (
                <>
                  <p className="text-gray-600/50 dark:text-gray-400/50">Type</p>
                  <div>{props.type}</div>

                  <hr className="h-4 invisible" />
                </>
              )}

              <p className="text-gray-600/50 dark:text-gray-400/50">Id</p>
              <div>{props.id}</div>
            </div>
          </>
        ) : (
          <div className="">
            <h1 className="font-bold text-lg">{props.name}</h1>

            {/* Alive or Dead? */}
            <p className="text-gray-600/50 dark:text-gray-400/50">Status</p>
            {getStatus(props)}

            <hr className="h-4 invisible" />

            {/* Species */}
            <p className="text-gray-600/50 dark:text-gray-400/50">Species</p>
            <div className="flex justify-start">
              <FingerPrintIcon width={24} />
              &nbsp;
              <h1>{props.species}</h1>
            </div>

            <hr className="h-4 invisible" />

            {/* Origin */}
            <p className="text-gray-600/50 dark:text-gray-400/50">Origin</p>
            <div className="flex justify-start">
              <GlobeAltIcon width={24} />
              &nbsp;
              <h1>{props.origin?.name}</h1>
            </div>

            <hr className="h-4 invisible" />

            {/* Last Known Location */}
            <p className="text-gray-600/50 dark:text-gray-400/50">Last known location</p>
            <div className="flex justify-start">
              <InformationCircleIcon width={24} />
              &nbsp;
              <h1>{props.location?.name}</h1>
            </div>

            <hr className="h-4 invisible" />

            <img src={props.image} alt={props.name} />
          </div>
        )}
      </div>
    </>
  );
};

export default Character;
