import { useEffect, useState } from "react";
import {
  INTERVAL_INCREMENT,
  INTERVAL_SPEED_IN_MS,
  MAX_VALUE,
} from "../constant";

export default function ProgressBar() {
  const [bar, setBar] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("setInterval running");
      setBar((prevBarValue) => {
        if (prevBarValue >= MAX_VALUE) {
          clearInterval(interval);
          return prevBarValue;
        }
        return prevBarValue + INTERVAL_INCREMENT;
      });
    }, INTERVAL_SPEED_IN_MS);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <div
        style={{ transform: `translateX(${bar - MAX_VALUE}%)` }}
        className="progress"
      ></div>
    </div>
  );
}
