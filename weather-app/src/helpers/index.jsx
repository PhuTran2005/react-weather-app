export const changeStandardDateTime = (input) => {
  const date = new Date(input.replace(" ", "T")); // Chuyển thành ISO format

  const options = {
    year: "numeric",
    month: "long", // 👉 "June" thay vì "06"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formatted = date.toLocaleString("en-US", options);

  return formatted;
  // 👉 Output: "June 13, 2025, 06:50"
};
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Dọn sự kiện khi component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
