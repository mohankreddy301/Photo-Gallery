window.addEventListener("DOMContentLoaded", () => {
  let data = localStorage.getItem("selected-image-data");
  if (data) {
    let objectData = JSON.stringify(data);
    displayData(JSON.parse(objectData));
  }
});

const displayData = (photo) => {
  const gallery = document.querySelector(".gallery");
  const { src, photographer, photographer_url, alt } = JSON.parse(photo);
  const { original, large2x, large, medium } = src;
  const innerText = `<img src="${large2x}">
  <p>${photographer}</p>
  <img src="${original}">
  <p>${alt}</p>`;
  gallery.innerHTML = innerText;
};
