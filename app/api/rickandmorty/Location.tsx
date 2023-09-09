import { FC } from "react";

import {
  GlobeAltIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

interface LocationProps {
  name?: string;
  dimension?: string;
  type?: string;
  id?: string;
}

const Location: FC<LocationProps> = (props) => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-neutral-800 shadow-lg p-8 rounded-lg w-[370px]">
        <div className="flex flex-col justify-center items-center rounded-lg">
          <h1 className="font-bold text-lg">{props.name}</h1>

          <hr className="h-4 invisible" />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-gray-600/50 dark:text-gray-400/50">Dimension</p>
          <div className="flex justify-start">
            <GlobeAltIcon width={24} />
            &nbsp;
            <h1>{props.dimension}</h1>
          </div>

          <hr className="h-4 invisible" />

          <p className="text-gray-600/50 dark:text-gray-400/50">Type</p>
          <div className="flex justify-start">
            <QuestionMarkCircleIcon width={24} />
            &nbsp;
            <h1>{props.type}</h1>
          </div>

          <hr className="h-4 invisible" />

          <p className="text-gray-600/50 dark:text-gray-400/50">Id</p>
          <div className="flex justify-start">
            &nbsp;
            <h1>{props.id}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
