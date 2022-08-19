import View from "./View.js";
import * as config from "../config.js";

class resultsView extends View {
  _parentElement = document.querySelector(".panel-recipes");
  _errorMessage = "No recipies found!";
  _message = "";

  _adjustHeight(recipesData) {
    const viewWidth = window.innerWidth;
    if (viewWidth >= 930) this._adjustHeightBigScreen(recipesData);
    else this._adjustHeightSmallScreen(recipesData);
  }

  _adjustHeightBigScreen(recipesData) {
    const numOfRecipes = recipesData.results.length;
    if (numOfRecipes <= 10) {
      this._parentElement.style.height = 70 * numOfRecipes + "px";
      this._parentElement.style.overflowY = "hidden";
    }
    if (numOfRecipes > 10) {
      this._parentElement.style.height = 70 * (config.NUM_RECIPES_PER_PAGE + 1) + "px";
      this._parentElement.style.overflowY = "hidden";
    }
  }

  _adjustHeightSmallScreen(recipesData) {
    const numOfRecipes = recipesData.results.length;

    if (numOfRecipes <= 3) this._parentElement.style.height = 70 * numOfRecipes + "px";
    if (numOfRecipes > 3) {
      this._parentElement.style.height = 70 * 3 + "px";
      this._parentElement.style.overflowY = "scroll";
    }
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(recipe) {
    return `
          <a class="new" href="#${recipe.id}">
            <div class="recipe-container">
              <div class="recipe-container-lift">
                <span class="recipe-img-container"><img class="recipe-img" src="${recipe.imageUrl}" alt="" /></span>
                <div class="recipe-text-container">
                  <h6 class="recipe-name">${recipe.title}</h6>
                  <p class="recipe-place">${recipe.publisher}</p>
                </div>
              </div>
            </div></a>
    `;
  }
}

export default new resultsView();
