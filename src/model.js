export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    let data = await response.json();
    if (!response.ok) throw new Error(`${data.message} Status: ${response.status}`);
    state.recipe = data.data.recipe;
    Object.assign(state.recipe, { cookingTime: state.recipe.cooking_time });
    Object.assign(state.recipe, { sourceUrl: state.recipe.source_url });
    Object.assign(state.recipe, { imageUrl: state.recipe.image_url });
    delete state.recipe.cooking_time;
    delete state.recipe.source_url;
    delete state.recipe.image_url;
  } catch (err) {
    alert(err);
  }
};
