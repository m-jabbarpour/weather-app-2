"use strict";
// Classes
import { CurrentWeather } from "./classes.ts";
// Utilities
import {
  capitalizeEachWord,
  getCurrentWeatherByCity,
  getCurrentWeatherByLocation,
  getIconPath,
  getLocation,
} from "./utilities.ts";

// HTML Elements
const input = document.querySelector("input")!;
const button = document.querySelector("button")!;
const modal = document.querySelector("#modal") as HTMLDivElement;
const backButton = document.querySelector("#back-button")!;
const modalImage = document.querySelector("#modal-img") as HTMLImageElement;
const modalTemperature = document.querySelector("#modal-tmp")!;
const modalDescription = document.querySelector("#modal-description")!;
const modalLocation = document.querySelector("#modal-location")!;
const modalFeelsLike = document.querySelector("#modal-feels-like")!;
const modalHumidity = document.querySelector("#modal-humidity")!;
//-------------------------------------------------------------------//

// Functions
const showModal = (currentWeather: CurrentWeather) => {
  const iconPath = getIconPath(currentWeather.icon);
  modalImage.src = iconPath;
  modalDescription.textContent = capitalizeEachWord(currentWeather.description);
  modalTemperature.textContent = `${currentWeather.temperature}℃`;
  modalFeelsLike.textContent = `${currentWeather.feelsLike}℃`;
  modalHumidity.textContent = `${currentWeather.humidity}%`;
  modalLocation.textContent = `${currentWeather.city}, ${currentWeather.country}`;
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  input.value = "";
};

const closeModal = () => {
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.visibility = "hidden";
  }, 300);
};

const handleInput = async (event: KeyboardEvent) => {
  const value = input.value;
  if (event.key === "Enter" && value) {
    const apiResponse = await getCurrentWeatherByCity(value);
    const currentWeather = new CurrentWeather(apiResponse);
    showModal(currentWeather);
  }
};

const handleButton = async () => {
  let location: { geoLat: string; geoLng: string } | null = null;
  try {
    location = await getLocation();
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
  if (location) {
    const apiResponse = await getCurrentWeatherByLocation(location);
    const currentWeather = new CurrentWeather(apiResponse);
    showModal(currentWeather);
  }
};
//-------------------------------------------------------------------//

//DOM events
input.addEventListener("keydown", handleInput);

button.addEventListener("click", handleButton);

backButton.addEventListener("click", closeModal);
