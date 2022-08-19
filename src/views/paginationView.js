import View from "./View";
import * as config from "../config.js";

class paginationView extends View {
  _generateButtonMarkup(recipeData) {
    const html = `
          <div class="btn-container">
            <button class="btn prev-page none" data-goto="${recipeData.page - 1}">Previous</button>
            <button class="btn next-page none" data-goto="${recipeData.page + 1}">Next</button>
          </div>
    `;
    document.querySelector(".panel-recipes").insertAdjacentHTML("beforeend", html);

    this._adjustButtonMarkup(recipeData);
  }

  _adjustButtonMarkup(recipeData) {
    const nextPageBtn = document.querySelector(".next-page");
    const prevPageBtn = document.querySelector(".prev-page");
    const curPage = recipeData.page;
    const numPages = Math.ceil(recipeData.results.length / config.NUM_RECIPES_PER_PAGE);

    if (numPages === curPage && curPage === 1) {
      nextPageBtn.classList.add("none");
      prevPageBtn.classList.add("none");
    }
    if (numPages > curPage && curPage === 1) {
      nextPageBtn.classList.remove("none");
      prevPageBtn.classList.add("none");
    }
    if (numPages === curPage && curPage > 1) {
      nextPageBtn.classList.add("none");
      prevPageBtn.classList.remove("none");
    }
    if (numPages > curPage && curPage > 1) {
      nextPageBtn.classList.remove("none");
      prevPageBtn.classList.remove("none");
    }
  }

  addHandlerClick(handler) {
    document.querySelector(".btn-container").addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}
export default new paginationView();
