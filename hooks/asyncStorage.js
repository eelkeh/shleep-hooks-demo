import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);

  async function getItem(key, initialValue) {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItem(key, initialValue);
  }, [key]);

  const setItem = async (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const clearItem = async () => {
    await AsyncStorage.removeItem(key);
    setStoredValue(null);
  };

  return [storedValue, setItem, clearItem];
}
