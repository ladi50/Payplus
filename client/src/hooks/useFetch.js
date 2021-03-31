import { useCallback } from "react";

export const useFetch = () => {
  const fetchHandler = useCallback(async (url, args) => {
    try {
      const response = await fetch(process.env.REACT_APP_FETCH_URL + url, { ...args });

      if (!response.ok) throw new Error("Fetch failed!");

      const res = await response.json();

      return res;
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { fetchHandler };
};
