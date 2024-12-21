import { useEffect, useState } from "react";
// khoảng chờ để người dùng gõ phím 
export const useDebounce = (value, delay) => {
  const [valueDebounce, setValueDebounce] = useState("");
  useEffect(() => {
    const handle = setTimeout(() => {
      setValueDebounce(value);
    }, [delay]);
    return () => {
      clearTimeout(handle);
    };
  }, [delay, value]);
  return valueDebounce;
};
