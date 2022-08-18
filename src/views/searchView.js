class SearchView {
  _parentElement = document.querySelector(".input-container");

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _getSearchInput() {
    return this._parentElement.querySelector(".search-input").value;
  }

  _clearSearchInput() {
    this._parentElement.querySelector(".search-input").value = "";
  }
}
export default new SearchView();
