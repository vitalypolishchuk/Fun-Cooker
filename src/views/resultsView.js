import View from "./View.js";
import * as config from "../config.js";

class resultsView extends View {
  _parentElement = document.querySelector(".panel-recipes");
  _errorMessage = "No recipies found!";
  _message = "";

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
