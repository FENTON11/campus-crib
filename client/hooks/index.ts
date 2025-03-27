import { useCallback, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import {
  Country,
  State,
  City,
  ICountry,
  IState,
  ICity,
} from "country-state-city";
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

export const useCustomFetch = <T>(
  fn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fn();
      setData(res);
    } catch (error) {
      const err = error as Error;
      Platform.OS === "web"
        ? alert(err.message || "Something went wrong. Try again later")
        : Alert.alert(
            "Error",
            err.message || "Something went wrong. Try again later"
          );
    } finally {
      setLoading(false);
    }
  }, [...dependencies]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { loading, data, refetch: getData };
};

interface StateType {
  isoCode: string;
  name: string;
  countryCode: string;
}

interface CityType {
  name: string;
  stateCode: string;
  countryCode: string;
}

interface LocationHook {
  countries: ICountry[];
  getCountryByCode: (countryCode: string) => ICountry | undefined;
  getStateByCode: (countryCode: string, stateCode: string) => StateType | null;
  getCountryStates: (countryCode: string) => IState[];
  getCityByName: (
    countryCode: string,
    stateCode: string,
    name: string
  ) => CityType | null;
  getStatesCities: (countryCode: string, stateCode: string) => ICity[];
}

export const useLocation = (): LocationHook => {
  const getCountryByCode = useCallback(
    (countryCode: string): ICountry | undefined => {
      return Country.getAllCountries().find(
        (country) => country.isoCode === countryCode
      );
    },
    []
  );

  const getStateByCode = useCallback(
    (countryCode: string, stateCode: string): StateType | null => {
      const state = State.getAllStates().find(
        (state) =>
          state.isoCode === stateCode && state.countryCode === countryCode
      );
      if (!state) return null;
      return state;
    },
    []
  );

  const getCityByName = useCallback(
    (countryCode: string, stateCode: string, name: string): CityType | null => {
      const city = City.getAllCities().find(
        (city) =>
          city.countryCode === countryCode &&
          city.stateCode === stateCode &&
          city.name === name
      );
      if (!city) return null;
      return city;
    },
    []
  );

  const getCountryStates = useCallback((countryCode: string): StateType[] => {
    return State.getAllStates().filter(
      (state) => state.countryCode === countryCode
    );
  }, []);

  const getStatesCities = useCallback(
    (countryCode: string, stateCode: string): CityType[] => {
      return City.getAllCities().filter(
        (item) =>
          item.countryCode === countryCode && item.stateCode === stateCode
      );
    },
    []
  );

  return {
    countries: Country.getAllCountries(),
    getCountryByCode,
    getStateByCode,
    getCountryStates,
    getCityByName,
    getStatesCities,
  };
};
export const useNetworkState = () => {
  const [networkState, setNetworkState] = useState<NetInfoState | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkState(state);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return networkState;
};
