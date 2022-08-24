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

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup); // convert a string into real DOM node object
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      if (!newEl.isEqualNode(curElements[i]) && newEl.firstChild?.nodeValue !== null) {
        if (newEl.firstChild?.nodeValue.trim() !== "") {
          curElements[i].textContent = newEl.textContent;
        }
      }
      if (!newEl.isEqualNode(curElements[i])) {
        Array.from(newEl.attributes).forEach((attr) => {
          curElements[i].setAttribute(attr.name, attr.value);
        });
      }
    });
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

    if (this._parentElement === document.querySelector(".selected-recipe") && window.innerWidth >= 950) {
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

  _adjustHeight(children, bookmarks = false) {
    if (window.innerWidth >= 950) this._adjustHeightBigScreen(children, bookmarks);
    else this._adjustHeightSmallScreen(children, bookmarks);

    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth >= 950) this._adjustHeightBigScreen(children, bookmarks);
        else this._adjustHeightSmallScreen(children, bookmarks);
      }.bind(this)
    );
  }

  _adjustHeightBigScreen(children, bookmarks) {
    this._parentElement.style.overflowY = "hidden";
    if (!bookmarks) this._parentElement.style.height = 1000 + "px";
    else {
      if (!children.length) {
        this._parentElement.style.height = 310 + "px";
      }
      if (children.length > 0 && children.length <= 3) {
        this._parentElement.style.height = 70 * children.length + "px";
      }
      if (children.length > 3) {
        this._parentElement.style.height = 70 * 4 + "px";
        this._parentElement.style.overflowY = "scroll";
      }
    }
  }

  _adjustHeightSmallScreen(children, bookmarks) {
    const numOfRecipes = children.length;
    if (!numOfRecipes) {
      this._parentElement.style.height = 210 + "px";
    }
    if (!bookmarks) {
      if (numOfRecipes > 0 && numOfRecipes <= 3) this._parentElement.style.height = 70 * numOfRecipes + "px";
    } else {
      if (numOfRecipes > 0 && numOfRecipes <= 3) this._parentElement.style.height = 210 + "px";
    }
    if (numOfRecipes > 3) {
      this._parentElement.style.height = 70 * 3 + "px";
      this._parentElement.style.overflowY = "scroll";
    }
  }
}
