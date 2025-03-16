import { useEffect, useRef, useState } from "react";

export default function CountDownTimer() {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
  });

  const [isRunning, setisRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleChange = (e, field) => {
    const value = parseInt(e.target.value, 10) || 0;

    const copyTime = { ...time };
    copyTime[field] = value;
    copyTime.minute += Math.floor(copyTime.second / 60);
    copyTime.second = copyTime.second % 60;

    copyTime.hour += Math.floor(copyTime.minute / 60);
    copyTime.minute = copyTime.minute % 60;
    setTime(copyTime);
  };

  const handleStart = () => {
    if (
      time.hour.length === 0 &&
      time.minute.length === 0 &&
      time.second.length === 0
    ) {
      console.log("returned");
      return;
    }
    setisRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setisRunning(false);
    setTime({ hour: "", minute: "", second: "" });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const copyPrevTime = { ...prevTime };
          copyPrevTime.second--;
          if (copyPrevTime.second < 0) {
            copyPrevTime.minute--;
            copyPrevTime.second = 59;
            if (copyPrevTime.minute < 0) {
              copyPrevTime.hour--;
              copyPrevTime.minute = 59;
              if (copyPrevTime.hour < 0) {
                clearInterval(intervalRef.current);
                return { hour: "", second: "", minute: "" };
              }
            }
          }

          return copyPrevTime;
        });
      }, 1000);
      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [isRunning]);

  return (
    <div className="container">
      <div className="input-container">
        <input
          disabled={isRunning}
          value={time.hour}
          onChange={(e) => handleChange(e, "hour")}
          type="text"
          placeholder="HH"
        />{" "}
        :
        <input
          disabled={isRunning}
          value={time.minute}
          onChange={(e) => handleChange(e, "minute")}
          type="text"
          placeholder="MM"
        />{" "}
        :
        <input
          disabled={isRunning}
          value={time.second}
          onChange={(e) => handleChange(e, "second")}
          type="text"
          placeholder="SS"
        />
      </div>
      <div className="btn-container">
        <button onClick={handleStart}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
