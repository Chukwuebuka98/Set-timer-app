import React from "react";
import "../App.css";
import { MdOutlineClose } from "react-icons/md";
import { useEffect } from "react";

const DisplayTimer = (props) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      props.stopTimer();
    }
  };
  return (
    <div className="bg-[#212121] w-full h-[100vh] flex flex-col text-white relative group ">
      {props.timeLeft !== 0 && (
        <div className="w-full h-full text-white p-8 flex flex-col items-center relative justify-evenly lg:justify-between">
          <h2 className="font-bold text-4xl md:text-7xl ">{props.name}</h2>
          <p className="lg:absolute font-semibold text-[5rem] sm:[10rem]  md:text-[20rem] lg:text-[30rem] top-0">
            {props.displayTimer}
          </p>
          {/* <p>Time</p> */}
        </div>
      )}

      <button
        className="absolute right-0 top-0 hover:text-slate-200 p-8 hidden group-hover:flex"
        onClick={props.stopTimer}
        onKeyDown={handleKeyDown}
      >
        <MdOutlineClose />
      </button>

      {!props.timeLeft && (
        <div className="w-full p-6 flex justify-center h-[100vh] items-center">
          <h2 className="text-[red] font-bold text-[4rem] sm:[5rem]  md:text-[10rem] lg:text-[15rem] animate-blink uppercase">
            Time Up!
          </h2>
        </div>
      )}
    </div>
  );
};

export default DisplayTimer;
