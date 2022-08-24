import * as config from "./config.js";
import * as helpers from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    name: "",
    results: [],
    page: 1,
  },
  bookmarks: [],
};

const transformData = function (object) {
  const newObj = Object.assign({}, object);
  if (object.cooking_time) Object.assign(newObj, { cookingTime: object.cooking_time });
  if (object.source_url) Object.assign(newObj, { sourceUrl: object.source_url });
  if (object.image_url) Object.assign(newObj, { imageUrl: object.image_url });
  if (object.key) Object.assign(newObj, { key: object.key });
  delete newObj.cooking_time;
  delete newObj.source_url;
  delete newObj.image_url;
  return newObj;
};
export const loadRecipe = async function (id) {
  try {
    const data = await helpers.getJSON(`${config.API_URL}/${id}`);
    state.recipe = transformData(data.data.recipe);
    if (state.bookmarks.some((bookmark) => bookmark.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw new Error(err);
  }
};
export const loadSearchResults = async function (search) {
  try {
    state.search.name = search;
    const data = await helpers.getJSON(`${config.API_URL}?search=${search}`);
    const recipes = data.data.recipes;
    state.search.results = recipes.map((recipe) => transformData(recipe));
    state.search.page = 1;
  } catch (err) {
    throw new Error(err);
  }
};
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * config.NUM_RECIPES_PER_PAGE;
  const end = page * config.NUM_RECIPES_PER_PAGE;
  return state.search.results.slice(start, end);
};
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    if (ing.quantity) {
      ing.quantity = (newServings * ing.quantity) / state.recipe.servings;
    }
  });
  state.recipe.servings = newServings;
};
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};
export const removeBookmark = function (id) {
  const bookmarkId = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  state.bookmarks.splice(bookmarkId, 1);
  state.recipe.bookmarked = false;
  persistBookmarks();
};
const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        let [quantity, unit, description] = ing[1].split(",");
        if (isNaN(quantity) === true) throw new Error();
        quantity = quantity.replaceAll(" ", "");
        unit = unit.replaceAll(" ", "");
        description = description.trim();
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.imageUrl,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    let data = await helpers.sendJSON(`${config.API_URL}?key=${config.API_KEY}`, recipe);
    state.recipe = transformData(data.data.recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
