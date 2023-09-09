import { FC } from "react";

interface EpisodeProps {
  name?: string;
  episode?: string;
  air_date?: string;
  id?: string;
}

const Episode: FC<EpisodeProps> = (props) => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-neutral-800 shadow-lg p-8 rounded-lg w-[370px]">
        <div className="flex flex-col justify-center items-center rounded-lg">
          <h1 className="font-bold text-lg">{props.name}</h1>

          <hr className="h-4 invisible" />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-gray-600/50 dark:text-gray-400/50">Episode</p>
          <div className="flex justify-start">
            &nbsp;
            <h1>{props.episode}</h1>
          </div>

          <hr className="h-4 invisible" />

          <p className="text-gray-600/50 dark:text-gray-400/50">Air Date</p>
          <div className="flex justify-start">
            {/* <QuestionMarkCircleIcon width={24} /> */}
            &nbsp;
            <h1>{props.air_date}</h1>
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

export default Episode;
