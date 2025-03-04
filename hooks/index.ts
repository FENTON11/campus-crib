import { useCallback, useEffect, useState } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";

export const useCustomFetch = <T>(fn: () => Promise<T>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fn();
      setData(res);
    } catch (error) {
      const err = error as Error;
      Platform.OS === "android"
        ? ToastAndroid.showWithGravity(
            err.message || "Something went wrong. Try again Later",
            ToastAndroid.TOP,
            10
          )
        : Alert.alert(
            "Error",
            err.message || "Something went wrong. Try again Later"
          );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return { loading, data };
};
