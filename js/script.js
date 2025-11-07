import { Constants } from "../constants/constants.js";

const resetButton = document.querySelector("#clear-local-data");
const profileImg = document.querySelector('#profile-image');

resetButton.addEventListener("click", () => {
  const storedData = localStorage.getItem("pexels_photo_data");
  if (storedData) {
    localStorage.removeItem("pexels_photo_data");
  } else {
    alert("Local copy is not available");
  }
});

const fetchImagesFromAPI = async () => {
  const BASE_URL = Constants.BASE_URL;
  const API_KEY = Constants.API_KEY;

  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    const jsonString = JSON.stringify(data);
    localStorage.setItem("pexels_photo_data", jsonString);
  } catch (error) {
    console.log(error);
  }
};

const displayImages = (photos) => {
  if (photos.length > 0) {
    const src = photos[0].src;
    const url = src.original;
    if (url) {
      console.log(url);
      profileImg.src = url; 
    }
  }
};

const fetchImagesFromLocalStorage = () => {
  const storedData = localStorage.getItem("pexels_photo_data");
  localStorage.setItem("copy_pexels_photo_data", storedData);
  let dataObject = null;
  if (storedData) {
    dataObject = JSON.parse(storedData);
    const { prev_page, photos, next_page, per_page, page } = dataObject;
    displayImages(photos);
  }
};

fetchImagesFromLocalStorage();
