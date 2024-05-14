import React from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-black justify-center items-center">
        <div>
          <img src="./src/assets/lets_vote.svg" alt="Introduction" />
        </div>
        <div className=" w-full  text-white">
          <div className="flex flex-col justify-center items-center">
            <div className="text-5xl text-white">Be a Part of Decision</div>
            <div className="text-8xl mt-5 text-blue-500">Vote Today</div>
            <div className="flex space-x-10 mt-5">
              <Link to="/reg">
                <button className="text-white bg-blue-500 w-28 text-xl rounded-md">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="text-white bg-blue-500 w-28 text-xl rounded-md">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
