import { useState, useEffect } from "react";

const isBrowser = typeof window !== "undefined";

//GETTING STORED VALUE
export const getStorageValue = (key, defaultValue) => {
  try {
    const saved = window.localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue;
  } catch (error) {
    console.error(`Error parsing JSON from local storage for key '${key}': ${error}`);
    return defaultValue;
  }
}


export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });
  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const clearLocalStorage = () => {
  if (!isBrowser) {
    return;
  }
  window.localStorage.clear();
  window.location.href = "/dashboard";
};
