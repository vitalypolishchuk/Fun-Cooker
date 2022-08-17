class RecipeView {
  #parentElement = document.querySelector(".selected-recipe");
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  renderSpinner() {
    const loading = document.createElement("div");
    loading.classList.add("lds-ring");
    const loadingChild = document.createElement("div");
    loadingChild.classList.add("lds-ring-inner");
    for (let i = 0; i < 3; i++) {
      loading.appendChild(loadingChild);
    }
    this.#parentElement.appendChild(loading);

    if (this.#parentElement === document.querySelector(".selected-recipe") && window.innerWidth >= 930) {
      loading.style.width = 250 + "px";
      loading.style.height = 250 + "px";
      [...loading.children].forEach((child) => {
        child.style.width = 200 + "px";
        child.style.height = 200 + "px";
      });
    } else {
      loading.style.width = 80 + "px";
      loading.style.height = 80 + "px";
      [...loading.children].forEach((child) => {
        child.style.width = 64 + "px";
        child.style.height = 64 + "px";
      });
    }
  }

  #generateMarkup() {
    return `
            <div class="selected-recipe-img-container">
            <img class="selected-recipe-img" src="${this.#data.imageUrl}" alt="" />
            <div class="selected-recipe-header"><h4>${this.#data.title}</h4></div>
          </div>
          <div class="selected-recipe-options">
            <div class="selected-recipe-options-inner">
              <div class="time-container">
                <span class="icons-small"><i class="fa-solid fa-clock"></i></span>
                <span class="time-text"><span class="bold">${this.#data.cookingTime}</span> minutes</span>
              </div>
              <div class="servings-container">
                <span class="icons-small servings-icon"><i class="fa-solid fa-user-group"></i></span>
                <span class="servings-text"><span class="bold">${this.#data.servings}</span> servings</span>
                <span class="icons-small minus"><i class="fa-solid fa-minus"></i></span>
                <span class="icons-small plus"><i class="fa-solid fa-plus"></i></span>
              </div>
              <span class="bookmark-recipe"><i class="fa-solid fa-bookmark icons-small"></i></span>
            </div>
          </div>

          <div class="selected-recipe-ingredients">
            <div class="selected-recipe-ingredients-inner">
              <h5 class="section-header">RECIPE INGREDIENTS</h5>
              <div class="recipe-columns">


              ${this.#data.ingredients
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
                  this.#data.publisher
                }</span>. Please check out directions at their
                website.
              </p>
              <a href="${this.#data.sourceUrl}">
                <button class="btn directions-btn">Directions →</button>
              </a>
            </div>
          </div>
  `;
  }
}
export default new RecipeView();
