const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipe_container = document.querySelector(".recipe-container");
const recipe_details_content = document.querySelector(
  ".recipe-details-content"
);
const recipe_closeBtn = document.querySelector(".recipe-closeBtn");

// function to get recipes
async function fetchRecipe(query) {
  recipe_container.innerHTML = `<h2>Featching Recipes.......</h2>`;
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();
  // console.log(response);

  recipe_container.innerHTML = "";
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
      <img src="${meal.strMealThumb}" >
      <h3>${meal.strMeal}</h3>
      <p>${meal.strArea} <span> Dish</span></p>
      <p>${meal.strCategory}</p>
    `;

    const button = document.createElement("button");

    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    // show the popup
    button.addEventListener("click", function () {
      openRecipePopup(meal);
    });

    recipe_container.appendChild(recipeDiv);
  });
}

// function to fetch ingredients ans measurement
function fetchIngredents(meal) {
  let ingredientList = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];

    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientList;
}

// recipe popup function
function openRecipePopup(meal) {
  recipe_details_content.innerHTML = `
    <h2 class="recipe-name">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredents(meal)}</ul>

    <div class="recipe-instructions">
      <h3>Instructions: </h3>
      <p>${meal.strInstructions}</p>
  </div>
  `;

  recipe_details_content.parentElement.style.display = "block";
}

// close button in popup page
recipe_closeBtn.addEventListener("click", function () {
  recipe_details_content.parentElement.style.display = "none";
});

// search recipe
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const searchInput = searchBox.value.trim();

  if (!searchInput) {
    recipe_container.innerHTML = `<h2>Type the recipe in the search box.</h2>`;
    return;
  }
  fetchRecipe(searchInput);
});
