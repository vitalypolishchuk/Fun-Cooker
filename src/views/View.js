export default class View {
  _data;
  _errorMessage = "We couldn't find that recipe. Please try another one!";
  _message = "Start by searching a recipe or an ingredient!";

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    this._clear();

    const loading = document.createElement("div");
    loading.classList.add("lds-ring");
    const loadingChild = document.createElement("div");
    loadingChild.classList.add("lds-ring-inner");
    for (let i = 0; i < 3; i++) {
      loading.appendChild(loadingChild);
    }
    this._parentElement.appendChild(loading);

    if (this._parentElement === document.querySelector(".selected-recipe") && window.innerWidth >= 930) {
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

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <span class="error-icon"><i class="fa-solid fa-triangle-exclamation"></i></span>
              <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class="search-msg">
            <span class="search-msg-icon"><i class="fa-solid fa-face-smile"></i></span>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
