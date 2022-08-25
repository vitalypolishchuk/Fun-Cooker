import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import View from "./views/View.js";

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
    bookmarksView.update(model.state.bookmarks);
    recipeView.addHandlerUpdateServings(controlServings);
  } catch (err) {
    console.log(err);
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

const controlAddRecipe = async function (newRecipe) {
  try {
    if (newRecipe.title.length < 3) return addRecipeView.renderError("Title should be more than 3 characters");
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    renderBookmarks();
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // window.location.hash = model.state.recipe.id;
    addRecipeView.removeValues();
    addRecipeView._addHandlerRemoveWindow();
  } catch (err) {
    addRecipeView.renderError("Wrong ingredient format! Make sure you follow the format: Quantity, Unit, Description");
  }
};

// ===== RECIPE PANEL ===== //
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.renderMessage();
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  bookmarksView.addHandlerRenderBookmarks(renderBookmarks);
  bookmarksView.addHandlerRender(renderBookmarks);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
