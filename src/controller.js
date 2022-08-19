import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

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
    resultsView.renderSpinner();

    const recipeName = searchView._getSearchInput();
    if (!recipeName) return;

    await model.loadSearchResults(recipeName);
    resultsView._adjustHeight(model.state.search);
    resultsView.render(model.getSearchResultsPage());
    paginationView._generateButtonMarkup(model.state.search);
    paginationView.addHandlerClick(controlPagination);
    searchView._clearSearchInput();
  } catch (err) {
    alert(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  resultsView._adjustHeight(model.state.search);
  paginationView._generateButtonMarkup(model.state.search);
  paginationView.addHandlerClick(controlPagination);
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

// ===== ADD RECIPE ===== //
// addRecipeCancelBtn.addEventListener("click", function (e) {
//   e.stopImmediatePropagation();
//   addRecipe.classList.add("hide");
//   overflow.classList.add("hide");
// });
// addRecipeBtn.addEventListener("click", function (e) {
//   e.stopImmediatePropagation();
//   addRecipe.classList.remove("hide");
//   overflow.classList.remove("hide");
// });
