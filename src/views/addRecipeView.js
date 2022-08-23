import { Handler } from "leaflet";
import View from "./View";

class BookmarksView extends View {
  _parentElement = document.querySelector(".add-recipe");
  _overflow = document.querySelector(".overflow");
  _openAddRecipeBtn = document.querySelector(".add-recipe-container");
  _closeAddRecipeBtn = document.querySelector(".add-recipe-cancel");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
  _message = "";

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  _addHandlerShowWindow() {
    this._openAddRecipeBtn.addEventListener(
      "click",
      function () {
        this._parentElement.classList.remove("hide");
        this._overflow.classList.remove("hide");
      }.bind(this)
    );
  }
  _addHandlerCloseWindow() {
    this._closeAddRecipeBtn.addEventListener(
      "click",
      function () {
        this._parentElement.classList.add("hide");
        this._overflow.classList.add("hide");
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

  _generateMarkup() {}
}
export default new BookmarksView();
