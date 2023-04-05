export default class View {
  _account;

  render(account, render = true) {
    if (!account || (Array.isArray(account) && account.length === 0)) return; //TODO ADD RENDER MESSAGE ERROR

    _account = account;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  // TODO
  renderSpinner() {
    console.log("DO THE SPINNER LOADER");
  }

  // TODO
  renderError(message = this._errorMessage) {
    if (!message) console.log("Render Message Error");
  }

  // TODO
  renderMessage(message = this._errorMessage) {
    if (!message) console.log("Render Message Successfully");
  }
}
