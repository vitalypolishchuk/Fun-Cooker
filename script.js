///////// DOCUMENT VARIABLES /////////
// ===== nav ===== //
const panelRecipies = document.querySelector(".panel-recipes");

const numOfRecipes = panelRecipies.children.length;

function setRecipesSmallScreen(displayPage = 1) {
  console.log("small");
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
      console.log(displayPage * 9);
      if (index >= displayPage * 10 - 10 && index <= displayPage * 9) {
        console.log(index);
        child.classList.remove("none");
      } else child.classList.add("none");
    });
  }
}
function setRecipesBigScreen(displayPage = 1) {
  console.log("big");
  if (numOfRecipes <= 10) {
    panelRecipies.style.height = 70 * numOfRecipes + "px";
    panelRecipies.style.overflowY = "visble";
  }
  if (numOfRecipes > 10) {
    panelRecipies.style.height = 70 * 3 + "px";
    panelRecipies.style.overflowY = "visble";
    [...panelRecipies.children].forEach((child, index) => {
      if (index > displayPage * 9 || index < displayPage * 10 - 10) child.classList.add("none");
    });
  }
}
if (window.innerWidth < 930) setRecipesSmallScreen();
if (window.innerWidth >= 930) setRecipesBigScreen();

window.addEventListener("resize", function () {
  // display found recipes on screen
  if (this.screen.width < 930) setRecipesSmallScreen();
  if (this.screen.width >= 930) setRecipesBigScreen();
});
