import axios, { AxiosError, AxiosResponse } from "axios";

export const getMapboxPlaces = async ({
  inputValue,
}: {
  inputValue?: string;
}) => {
  try {
    return await axios.get(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${inputValue}&access_token=${process.env.MAPBOX_TOKEN}`
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse;
  }
};
