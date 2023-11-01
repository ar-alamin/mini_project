const searchForm = document.querySelector("form");
const imgContainer = document.querySelector(".img-container");
const searchInput = document.querySelector(".input-box");
const lodemoreBtn = document.querySelector(".loadmoreBtn");
console.log(lodemoreBtn);

let page = 1;

// fecth images using unsplash API
const fetchImages = async (query, pageNo) => {
  try {
    if (pageNo === 1) {
      imgContainer.innerHTML = "";
    }

    const accessKey = "tKg-dy1-K2e-06BqXuFsFZJxL4igzvVRuZBmMz8QZbg";
    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      data.results.forEach((photo) => {
        // creating img div
        const imgElement = document.createElement("div");
        imgElement.classList.add("imgDiv");
        imgElement.innerHTML = `
        <img src="${photo.urls.regular}"/>
    `;

        // creating overlay
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        // creating overlay text
        const overlayText = document.createElement("h3");
        overlayText.innerText = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);
        imgElement.appendChild(overlayElement);
        imgContainer.appendChild(imgElement);
      });

      if (data.total_pages === pageNo) {
        lodemoreBtn.style.display = "none";
      } else {
        lodemoreBtn.style.display = "block";
      }
    } else {
      imgContainer.innerHTML = `
        <h2>No image found!<h2>
    `;
    }
  } catch (error) {
    imgContainer.innerHTML = `
        <h2>Faild to fetch images. Please try agin later.<h2>
    `;
  }
};

// adding event listener to search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();

  if (inputText !== "") {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imgContainer.innerHTML = `
        <h2>Please enter a search query.<h2>
    `;
  }
});

// lode more button click
lodemoreBtn.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});
