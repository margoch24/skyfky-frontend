import axios, { AxiosError, AxiosResponse } from "axios";

export const getMapboxPlaces = async ({
  inputValue,
  longitude,
  latitude,
}: {
  inputValue?: string;
  longitude?: number;
  latitude?: number;
}) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json`;

  if (longitude && latitude) {
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`;
  }

  try {
    return await axios.get(
      `${url}?types=poi&access_token=${process.env.MAPBOX_TOKEN}&language=en`
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse;
  }
};
