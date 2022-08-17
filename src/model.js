import * as config from "./config.js";
import * as helpers from "./helpers.js";

export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  try {
    const data = await helpers.getJSON(`${config.API_URL}/${id}`);
    state.recipe = data.data.recipe;
    Object.assign(state.recipe, { cookingTime: state.recipe.cooking_time });
    Object.assign(state.recipe, { sourceUrl: state.recipe.source_url });
    Object.assign(state.recipe, { imageUrl: state.recipe.image_url });
    delete state.recipe.cooking_time;
    delete state.recipe.source_url;
    delete state.recipe.image_url;
  } catch (err) {
    throw new Error(err);
  }
};
