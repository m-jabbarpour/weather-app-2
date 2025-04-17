// constants
import { appId, weatherIconsMapping } from "./constants";
// types
import { OpenWeatherMapCurrentResponse, WeatherIconCode } from "./types";

export const getIconPath = (iconCode: WeatherIconCode) => {
  const iconName = weatherIconsMapping[iconCode];
  return `/weather-icons/${iconName}.svg`;
};

export const capitalizeEachWord = (str: string) => {
  const words = str.split(" ");
  const capitalizedWords = words.map(
    (word) => word[0].toUpperCase() + word.substring(1)
  );
  return capitalizedWords.join(" ");
};

export const getCurrentWeatherByCity = async (city: string) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`
  );
  const currentWeather: OpenWeatherMapCurrentResponse = await res.json();
  return currentWeather;
};

export const getCurrentWeatherByLocation = async ({
  geoLat,
  geoLng,
}: {
  geoLat: string;
  geoLng: string;
}) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLng}&appid=${appId}&units=metric`
  );
  const data: OpenWeatherMapCurrentResponse = await res.json();
  return data;
};

export const getLocation = (): Promise<{ geoLat: string; geoLng: string }> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not available!"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const geoLat = pos.coords.latitude.toFixed(5);
        const geoLng = pos.coords.longitude.toFixed(5);
        resolve({ geoLat, geoLng });
      },
      (err) => {
        let errorMessage: string;
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case err.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }
        reject(new Error(errorMessage));
      }
    );
  });
