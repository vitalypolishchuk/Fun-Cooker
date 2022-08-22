import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

const bookmarksContainer = document.querySelector(".bookmarks-saved-container");

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  try {
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    recipeView.render(model.state.recipe);
    recipeView.addHandlerUpdateServings(controlServings);
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
    resultsView._adjustHeight(model.state.search.results);
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
  resultsView._adjustHeight(model.state.search.results);
  paginationView._generateButtonMarkup(model.state.search);
  paginationView.addHandlerClick(controlPagination);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
  renderBookmarks();
};
const renderBookmarks = function () {
  bookmarksView._adjustHeight(model.state.bookmarks, true);
  bookmarksView.render(model.state.bookmarks);
};

// ===== RECIPE PANEL ===== //
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.renderMessage();
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  bookmarksView.addHandlerRenderBookmarks(renderBookmarks);
};
init();

const addRecipeCancelBtn = document.querySelector(".add-recipe-cancel");
const addRecipeBtn = document.querySelector(".add-recipe-container");
const addRecipe = document.querySelector(".add-recipe");
const overflow = document.querySelector(".overflow");
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
