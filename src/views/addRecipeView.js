import View from "./View";

class BookmarksView extends View {
  _mainContainer = document.querySelector(".add-recipe");
  _parentElement = document.querySelector(".add-recipe-inner");
  _overflow = document.querySelector(".overflow");
  _openAddRecipeBtn = document.querySelector(".add-recipe-container");
  _closeAddRecipeBtn = document.querySelector(".add-recipe-cancel");
  _addRecipeErrorContainer = document.querySelector(".add-recipe-error-container");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
  _message = "Your recipe was successfully added :)";

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
    this._addHandlerCloseError();
  }

  _addHandlerShowWindow() {
    this._openAddRecipeBtn.addEventListener(
      "click",
      function () {
        this._mainContainer.classList.remove("hide");
        this._overflow.classList.remove("hide");
      }.bind(this)
    );
  }
  _addHandlerRemoveWindow() {
    this._mainContainer.classList.add("hide");
    this._overflow.classList.add("hide");
  }
  _addHandlerCloseWindow() {
    this._closeAddRecipeBtn.addEventListener(
      "click",
      function () {
        this._mainContainer.classList.add("hide");
        this._overflow.classList.add("hide");
      }.bind(this)
    );
  }
  _addHandlerCloseError() {
    document.querySelector(".add-recipe-again").addEventListener(
      "click",
      function () {
        this._addRecipeErrorContainer.classList.add("hide");
      }.bind(this)
    );
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = [...new FormData(this)];
      const data = Object.fromEntries(formData);
      handler(data);
    });
  }

  renderError(message = this._errorMessage) {
    this._addRecipeErrorContainer.classList.remove("hide");
    const msg = this._addRecipeErrorContainer.querySelector("p");
    msg.textContent = message;
  }

  _generateMarkup() {}
}
export default new BookmarksView();
