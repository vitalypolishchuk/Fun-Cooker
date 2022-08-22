import View from "./View";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks-saved-container");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
  _message = "";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(recipe) {
    const id = window.location.hash.slice(1);

    return `
          <a class="new" href="#${recipe.id}">
            <div class="recipe-container recipe-container-bookmarks ${recipe.id === id ? "fill-1" : ""}">
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
  addHandlerRenderBookmarks(handler) {
    document.querySelector(".nav").addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest(".bookmarks-recipe-container");
        if (!btn) return;
        this._parentElement.classList.toggle("hide");
        handler();
      }.bind(this)
    );
  }
}
export default new BookmarksView();
