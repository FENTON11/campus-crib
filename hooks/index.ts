import { useCallback, useEffect, useState } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
// Define the type for the image picker asset
type ImagePickerAsset = ImagePicker.ImagePickerAsset;

export const useImagePicker = () => {
  const [images, setImages] = useState<ImagePickerAsset[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages((prevImages) => [...prevImages, result.assets[0]]);
    }
  };
  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return {
    images,
    removeImage,
    pickImage,
  };
};

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
