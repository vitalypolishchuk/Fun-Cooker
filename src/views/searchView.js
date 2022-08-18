class SearchView {
  #parentElement = document.querySelector(".input-container");

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  getSearchInput() {
    return this.#parentElement.querySelector(".search-input").value;
  }
}
export default new SearchView();
