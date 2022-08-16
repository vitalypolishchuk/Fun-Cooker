///////// DOCUMENT VARIABLES /////////
const root = document.querySelector(":root");
const panelRecipies = document.querySelector(".panel-recipes");
const selectedRecipeContainer = document.querySelector(".selected-recipe");
const btnContainer = document.querySelector(".btn-container");
const nextPageBtn = document.querySelector(".next-page");
const prevPageBtn = document.querySelector(".prev-page");
const addRecipeInput = document.querySelectorAll(".add-recipe-input");
const addRecipe = document.querySelector(".add-recipe");
const addRecipeBtn = document.querySelector(".add-recipe-container");
const addRecipeCancelBtn = document.querySelector(".add-recipe-cancel");
const overflow = document.querySelector(".overflow");

const searchRecipes = async function (recipeName) {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`);
    const data = await response.json();
    if (!response.ok || !data.data.recipes.length) throw new Error("Could not find the recipe!");
    return data.data.recipes;
  } catch (err) {
    alert(err);
  }
};
// searchRecipes("pizza");

const loadRecipe = async function (id) {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    let data = await response.json();
    if (!response.ok) throw new Error(`${data.message} Status: ${response.status}`);
    let recipe = data.data.recipe;
    Object.assign(recipe, { cookingTime: recipe.cooking_time });
    Object.assign(recipe, { sourceUrl: recipe.source_url });
    Object.assign(recipe, { imageUrl: recipe.image_url });
    delete recipe.cooking_time;
    delete recipe.source_url;
    delete recipe.image_url;
    console.log(recipe);
    renderRecipe(recipe);
  } catch (err) {
    alert(err);
  }
};
loadRecipe("5ed6604591c37cdc054bc886");

const renderRecipe = function (recipe) {
  html = `
            <div class="selected-recipe-img-container">
            <img class="selected-recipe-img" src="${recipe.imageUrl}" alt="" />
            <div class="selected-recipe-header"><h4>${recipe.title}</h4></div>
          </div>
          <div class="selected-recipe-options">
            <div class="selected-recipe-options-inner">
              <div class="time-container">
                <span class="icons-small"><i class="fa-solid fa-clock"></i></span>
                <span class="time-text"><span class="bold">${recipe.cookingTime}</span> minutes</span>
              </div>
              <div class="servings-container">
                <span class="icons-small"><i class="fa-solid fa-user-group"></i></span>
                <span class="servings-text"><span class="bold">${recipe.servings}</span> servings</span>
                <span class="icons-small minus"><i class="fa-solid fa-minus"></i></span>
                <span class="icons-small plus"><i class="fa-solid fa-plus"></i></span>
              </div>
              <span class="bookmark-recipe"><i class="fa-solid fa-bookmark icons-small"></i></span>
            </div>
          </div>

          <div class="selected-recipe-ingredients">
            <div class="selected-recipe-ingredients-inner">
              <h5 class="section-header">RECIPE INGREDIENTS</h5>
              <div class="recipe-columns">


              ${recipe.ingredients
                .map((ingredient) => {
                  return `
                <div class="ingredient">
                  <span class="icons-small ingredients-icons"><i class="fa-solid fa-check"></i></span>
                  <span class="ingredient-text">${(ingredient.quantity = ingredient.quantity ?? "")} ${ingredient.unit} ${
                    ingredient.description
                  }</span>
                </div>
                `;
                })
                .join("")}
              </div>
            </div>
          </div>

          <div class="selected-recipe-directions">
            <div class="selected-recipe-directions-inner">
              <h5 class="section-header">HOW TO COOK IT</h5>
              <p class="recipe-designer">
                This recipe was carefully designed and tested by <span class="bold">${recipe.publisher}</span>. Please check out directions at their
                website.
              </p>
              <a href="${recipe.sourceUrl}">
                <button class="btn directions-btn">Directions →</button>
              </a>
            </div>
          </div>
  `;
  selectedRecipeContainer.innerHTML = "";
  selectedRecipeContainer.insertAdjacentHTML("afterbegin", html);
};

///////////////////////////////
//////////////////////////////
/////////////////////////////
// ===== RECIPE PANEL ===== //

const numOfRecipes = panelRecipies.children.length;
let displayPage = 1;

function setRecipesSmallScreen(displayPage = 1) {
  if (!numOfRecipes) {
    panelRecipies.style.height = 0;
    return;
  }
  if (numOfRecipes <= 3) panelRecipies.style.height = 70 * numOfRecipes + "px";
  if (numOfRecipes > 3 && numOfRecipes <= 10) {
    panelRecipies.style.height = 70 * 3 + "px";
    panelRecipies.style.overflowY = "scroll";
  }
  if (numOfRecipes > 10) {
    panelRecipies.style.height = 70 * 3 + "px";
    panelRecipies.style.overflowY = "scroll";
    [...panelRecipies.children].forEach((child, index) => {
      if (index >= displayPage * 10 - 10 && index < displayPage * 10) {
        child.classList.remove("none");
      } else child.classList.add("none");
    });
  }
  if (numOfRecipes > displayPage * 10) {
    btnContainer.classList.remove("none");
    nextPageBtn.classList.remove("none");
  } else nextPageBtn.classList.add("none");
  if (displayPage > 1) prevPageBtn.classList.remove("none");
  else prevPageBtn.classList.add("none");
}
function setRecipesBigScreen(displayPage = 1) {
  if (!numOfRecipes) return;
  if (numOfRecipes <= 10) {
    panelRecipies.style.height = 70 * numOfRecipes + "px";
    panelRecipies.style.overflowY = "hidden";
  }
  if (numOfRecipes > 10) {
    panelRecipies.style.height = 70 * 11 + "px";
    panelRecipies.style.overflowY = "hidden";
    [...panelRecipies.children].forEach((child, index) => {
      if (index >= displayPage * 10 - 10 && index < displayPage * 10) {
        child.classList.remove("none");
      } else child.classList.add("none");
    });
  }
  if (numOfRecipes > displayPage * 10) {
    btnContainer.classList.remove("none");
    nextPageBtn.classList.remove("none");
  } else nextPageBtn.classList.add("none");
  if (displayPage > 1) prevPageBtn.classList.remove("none");
  else prevPageBtn.classList.add("none");
}
function setRecipePanel(displayPage) {
  if (window.innerWidth < 930) setRecipesSmallScreen(displayPage);
  if (window.innerWidth >= 930) setRecipesBigScreen(displayPage);
}
setRecipePanel();

window.addEventListener("resize", function () {
  // display found recipes on screen
  setRecipePanel();
});

nextPageBtn.addEventListener("click", function () {
  displayPage++;
  setRecipePanel(displayPage);
});
prevPageBtn.addEventListener("click", function () {
  displayPage--;
  setRecipePanel(displayPage);
});

// ===== ADD RECIPE ===== //
addRecipeCancelBtn.addEventListener("click", function (e) {
  e.stopImmediatePropagation();
  addRecipe.classList.add("hide");
  overflow.classList.add("hide");
});
addRecipeBtn.addEventListener("click", function (e) {
  e.stopImmediatePropagation();
  addRecipe.classList.remove("hide");
  overflow.classList.remove("hide");
});
