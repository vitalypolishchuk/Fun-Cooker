import View from "./View";

class RecipeView extends View {
  _parentElement = document.querySelector(".selected-recipe");

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => window.addEventListener(ev, handler)); // when the hash changes, the hash becomes the id of a recipe
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.querySelector(".servings-container").addEventListener("click", function (e) {
      const btn = e.target.closest(".servings-btn");
      if (!btn) return;
      if (+btn.dataset.updateTo > 0) handler(+btn.dataset.updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".fa-bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
          <div class="selected-recipe-img-container">
            <img class="selected-recipe-img" src="${this._data.imageUrl}" alt="" />
            <div class="selected-recipe-header"><h4>${this._data.title.slice(0, 56)}</h4></div>
          </div>
          <div class="selected-recipe-options">
            <div class="selected-recipe-options-inner">
              <div class="time-container">
                <span class="icons-small"><i class="fa-solid fa-clock"></i></span>
                <span class="time-text"><span class="bold">${this._data.cookingTime}</span> minutes</span>
              </div>
              <div class="servings-container">
                <span class="icons-small servings-icon"><i class="fa-solid fa-user-group"></i></span>
                <span class="servings-text"><span class="bold">${this._data.servings}</span> servings</span>
                <span class="icons-small servings-btn minus" data-update-to="${this._data.servings - 1}"><i class="fa-solid fa-minus"></i></span>
                <span class="icons-small servings-btn plus" data-update-to="${this._data.servings + 1}"><i class="fa-solid fa-plus"></i></span>
              </div>
              <span class="bookmark-recipe"><i class="fa-solid fa-bookmark icons-small ${this._data.bookmarked ? "fill" : ""}"></i></span>
            </div>
          </div>

          <div class="selected-recipe-ingredients">
            <div class="selected-recipe-ingredients-inner">
              <h5 class="section-header">RECIPE INGREDIENTS</h5>
              <div class="recipe-columns">


              ${this._data.ingredients
                .map((ingredient) => {
                  return `
                <div class="ingredient">
                  <span class="icons-small ingredients-icons"><i class="fa-solid fa-check"></i></span>
                  <span class="ingredient-text">${(ingredient.quantity = ingredient.quantity ?? "")} ${ingredient.unit} ${
                    ingredient.description
                  }</span>
                </div>
                `;
                })
                .join("")}
              </div>
            </div>
          </div>

          <div class="selected-recipe-directions">
            <div class="selected-recipe-directions-inner">
              <h5 class="section-header">HOW TO COOK IT</h5>
              <p class="recipe-designer">
                This recipe was carefully designed and tested by <span class="bold">${
                  this._data.publisher
                }</span>. Please check out directions at their
                website.
              </p>
              <a href="${this._data.sourceUrl}">
                <button class="btn directions-btn">Directions →</button>
              </a>
            </div>
          </div>
  `;
  }
}
export default new RecipeView();
