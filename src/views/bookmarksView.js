import View from "./View";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks-saved-container");
  _errorMessage = "No bookmarks found!";
}
export default new BookmarksView();
