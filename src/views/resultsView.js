import View from "./View.js";
import * as config from "../config.js";

class resultsView extends View {
  _parentElement = document.querySelector(".panel-recipes");
  _errorMessage = "No recipies found!";
  _message = "";

  _adjustHeight(recipesData) {
    if (window.innerWidth >= 930) this._adjustHeightBigScreen(recipesData);
    else this._adjustHeightSmallScreen(recipesData);

    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth >= 930) this._adjustHeightBigScreen(recipesData);
        else this._adjustHeightSmallScreen(recipesData);
      }.bind(this)
    );
  }

  _adjustHeightBigScreen(recipesData) {
    this._parentElement.style.overflowY = "hidden";
    this._parentElement.style.height = 1000 + "px";
  }

  _adjustHeightSmallScreen(recipesData) {
    const numOfRecipes = recipesData.results.length;
    if (!numOfRecipes) {
      this._parentElement.style.minHeight = 210 + "px";
    }

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
    const id = window.location.hash.slice(1);

    return `
          <a class="new" href="#${recipe.id}">
            <div class="recipe-container ${recipe.id === id ? "selected-recipe-active" : ""}">
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
