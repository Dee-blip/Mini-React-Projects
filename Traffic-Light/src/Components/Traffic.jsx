import { useState, useEffect } from "react";
import Signal from "./Signal";

export default function Traffic({ lights = ["green", "yellow", "red"] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActive((prevActive) => {
        return (prevActive + 1) % lights.length;
      });
    }, 1000);
    // #best practice to ensure only one interval runs at a time and gets cleared when
    // the component unmounts
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, []);

  return (
    <>
      {lights.map((color, index) => {
        return <Signal key={index} isActive={active === index} color={color} />;
      })}
    </>
  );
}

// #if we dont use effect here - it will  create a new interval on every ender. Since react
// re-renders components whenever stage changes, this will lead to multilple intervals running
// .
