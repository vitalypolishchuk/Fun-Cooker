///////// DOCUMENT VARIABLES /////////
const btnContainer = document.querySelector(".btn-container");
const nextPageBtn = document.querySelector(".next-page");

// ===== RECIPE PANEL ===== //
const panelRecipies = document.querySelector(".panel-recipes");

const numOfRecipes = panelRecipies.children.length;
let displayPage = 1;

function setRecipesSmallScreen(displayPage = 1) {
  console.log(numOfRecipes);
  if (!numOfRecipes) panelRecipies.style.height = 0;
  if (numOfRecipes <= 3) panelRecipies.style.height = 70 * numOfRecipes + "px";
  if (numOfRecipes > 3 && numOfRecipes <= 10) {
    panelRecipies.style.height = 70 * 3 + "px";
    panelRecipies.style.overflowY = "scroll";
  }
  if (numOfRecipes > 10) {
    panelRecipies.style.height = 70 * 3 + "px";
    panelRecipies.style.overflowY = "scroll";
    [...panelRecipies.children].forEach((child, index) => {
      if (index >= displayPage * 10 - 10 && index <= displayPage * 9) {
        child.classList.remove("none");
      } else child.classList.add("none");
    });
  }
  if (numOfRecipes > displayPage * 10) btnContainer.classList.remove("none");
}
function setRecipesBigScreen(displayPage = 1) {
  if (numOfRecipes <= 10) {
    panelRecipies.style.height = 70 * numOfRecipes + "px";
    panelRecipies.style.overflowY = "hidden";
  }
  if (numOfRecipes > 10) {
    panelRecipies.style.height = 70 * 11 + "px";
    panelRecipies.style.overflowY = "hidden";
    [...panelRecipies.children].forEach((child, index) => {
      if (index > displayPage * 9 || index < displayPage * 10 - 10) child.classList.add("none");
      else child.classList.remove("none");
    });
  }
  if (numOfRecipes > displayPage * 10) btnContainer.classList.remove("none");
}
function setRecipePanel(displayPage) {
  if (window.innerWidth < 930) setRecipesSmallScreen(displayPage);
  if (window.innerWidth >= 930) setRecipesBigScreen(displayPage);
}
setRecipePanel();

window.addEventListener("resize", function () {
  // display found recipes on screen
  setRecipePanel();
});

nextPageBtn.addEventListener("click", function () {
  displayPage++;
  setRecipePanel(displayPage);
});
