import React from "react";
import Feature from "./Feature";

const Intro = () => {
  return (
    <>
      <div class="flex">
        <div>
          <img src="./src/assets/intro.svg" alt="Introduction"></img>
        </div>
        <div className="h-[688px] w-full bg-black font-white">
          <div className="flex justify-center space-x-28 font-bold text-xl mt-10">
            <button className="text-white bg-blue-500 w-28 text-xl rounded-md">
              Login
            </button>
            <button className="text-white">More</button>
            <button className="text-white">Contact</button>
          </div>
          <div className="flex flex-col justify-center items-center mt-40">
            <div className="text-5xl text-white">Be a Part of decision</div>
            <div className="text-8xl mt-5 text-blue-500">Vote Today</div>
            <div className="flex space-x-10 mt-5">
              <button className="text-white bg-blue-500 w-28 text-xl rounded-md">
                Register
              </button>
              <button className="text-white bg-blue-500 w-32 text-xl rounded-md">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
      <Feature />
    </>
  );
};

export default Intro;
