import React, { useState, useEffect } from "react";
import DisplayTimer from "./DisplayTimer";

function TimerApp() {
  const [timerName, setTimerName] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeStarted, setTimeStarted] = useState(false);

  useEffect(() => {
    let timerInterval;
    if (timerRunning) {
      setTimeLeft(minutes * 60 + seconds);
      timerInterval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            clearInterval(timerInterval);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [timerRunning, minutes, seconds]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [timeStarted]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !timeStarted) {
      startTimer();
    } else if (event.ctrlKey && event.key === "z") {
      resetTimer();
    }
  };

  const startTimer = () => {
    if (!minutes && !seconds) {
      alert("Please enter a valid time");
      return;
    } else if (minutes && !seconds) {
      setTimeLeft(minutes * 60);
      setTimerRunning(true);
      setTimeStarted(true);
    } else if (!minutes && seconds) {
      setTimeLeft(seconds);
      setTimerRunning(true);
      setTimeStarted(true);
    } else {
      setTimeLeft(minutes * 60 + seconds);
      setTimerRunning(true);
      setTimeStarted(true);
    }
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setTimeLeft(0);
    setTimeStarted(false);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(0);
    setTimerName("");
    setMinutes(0);
    setSeconds(0);
    setTimeStarted(false);
  };

  const timerDisplay = () => {
    const displayMinutes = Math.floor(timeLeft / 60);
    const displaySeconds = timeLeft % 60;
    return `${displayMinutes}:${
      displaySeconds < 10 ? "0" : ""
    }${displaySeconds}`;
  };

  const handleTimerNameChange = (event) => {
    setTimerName(event.target.value);
  };

  const handleMinutesChange = (event) => {
    setMinutes(parseInt(event.target.value));
  };

  const handleSecondsChange = (event) => {
    setSeconds(parseInt(event.target.value));
  };

  return (
    <div className="flex justify-center h-[100vh]">
      {!timerRunning && (
        <div className="w-[70%] flex flex-col justify-center items-center text-white">
          <h1 className="text-2xl font-bold p-4 uppercase ">Set Timer App</h1>
          {/* <label> */}
          <input
            className="text-gray-300 p-2 font-normal w-[70%] rounded-lg bg-transparent border border-gray-500 hover:border-gray-400 duration-100"
            type="text"
            placeholder="Timer Name"
            value={timerName}
            onChange={handleTimerNameChange}
          />
          {/* </label> */}
          <br />
          <div className="flex gap-4 w-[70%]">
            {/* <label> */}
            <input
              className="text-gray-300 p-2 font-normal w-full rounded-lg bg-transparent border border-gray-500 hover:border-gray-400 duration-100"
              type="number"
              placeholder="Minutes"
              min="0"
              value={minutes}
              onChange={handleMinutesChange}
            />
            {/* </label> */}
            {/* <label> */}
            <input
              className="text-gray-300 p-2 font-normal w-[30%] rounded-lg bg-transparent border border-gray-500 hover:border-gray-400 duration-100"
              type="number"
              placeholder="Seconds"
              min="0"
              max="59"
              value={seconds}
              onChange={handleSecondsChange}
            />
            {/* </label> */}
          </div>
          <br />
          <div className="flex gap-4 w-[70%]">
            <button
              className="border border-green-600 py-2 px-4 rounded-l-xl hover:bg-green-800 hover:border-green-800 duration-200 w-full "
              onClick={startTimer}
              onKeyDown={handleKeyDown}
            >
              Start
            </button>
            {/* <button
              className="border border-red-600 py-2 px-4"
              onClick={stopTimer}
            >
              Stop
            </button> */}
            <button
              className="border border-red-600 py-2 px-4 rounded-r-xl hover:bg-red-800 hover:border-red-800 duration-200 w-full "
              onClick={resetTimer}
              // onKeyDown={handleKeyDown}
            >
              Reset
            </button>
          </div>
          <br />
          {/* <div style={{ color: timeLeft === 0 ? "red" : "black" }}>
            {" "}
            {timerDisplay()}
          </div> */}
          <div className="flex flex-col gap-2 w-[70%] text-gray-300">
            <h2>Shortcuts:</h2>
            <p>
              ENTER | &nbsp; to <span className="bg-green-700 px-1">start</span>
            </p>
            <p>
              CTRL + Z | &nbsp; to{" "}
              <span className="bg-red-700 px-1">reset</span>
            </p>
            <p>ESC | &nbsp; to close the timer interface</p>
          </div>
        </div>
      )}

      {timerRunning && (
        <DisplayTimer
          name={timerName}
          displayTimer={timerDisplay()}
          stopTimer={stopTimer}
          timeLeft={timeLeft}
          closeTimer={timeStarted}
        />
      )}
    </div>
  );
}

export default TimerApp;
