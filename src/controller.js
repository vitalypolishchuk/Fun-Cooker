import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

console.log("h");

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

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  try {
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    const recipeName = searchView.getSearchInput();
    if (!recipeName) return;

    await model.loadSearchResults(recipeName);
    console.log(model.state.search);
  } catch (err) {
    alert(err);
  }
};

///////////////////////////////
//////////////////////////////
/////////////////////////////
// ===== RECIPE PANEL ===== //
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.renderMessage();
  searchView.addHandlerSearch(controlSearchResults);
};
init();

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
