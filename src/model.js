import * as config from "./config.js";
import * as helpers from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    name: "",
    results: [],
  },
};
const transformData = function (object) {
  const newObj = Object.assign({}, object);
  if (object.cooking_time) Object.assign(newObj, { cookingTime: object.cooking_time });
  if (object.source_url) Object.assign(newObj, { sourceUrl: object.source_url });
  if (object.image_url) Object.assign(newObj, { imageUrl: object.image_url });
  delete newObj.cooking_time;
  delete newObj.source_url;
  delete newObj.image_url;
  return newObj;
};
export const loadRecipe = async function (id) {
  try {
    const data = await helpers.getJSON(`${config.API_URL}/${id}`);
    state.recipe = transformData(data.data.recipe);
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
  } catch (err) {
    throw new Error(err);
  }
};
