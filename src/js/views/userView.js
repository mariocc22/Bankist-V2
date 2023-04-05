class UserView {
  _appView = document.querySelector(".app");
  _parentElement = document.querySelector(".nav-user");
  _userlabel = "User";
  _errorMessage = "User not found! Try again";
  _message = "Welcome Back, ";

  getUser() {
    const credentials = [
      this._parentElement.querySelector(".login__input--user").value,
      this._parentElement.querySelector(".login__input--pin").value,
    ];
    this._parentElement.querySelector(".login").reset();
    return credentials;
  }

  addHandlerRender(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();

      const btnSubmit = e.target.closest(".login__btn");
      if (!btnSubmit) return;

      handler();
    });
  }

  addHandlerAppView(user) {
    if (!user) return;
    this._appView.style.opacity = 100;
    this._parentElement.querySelector(
      ".welcome"
    ).textContent = `Welcome back, ${user.owner.split(" ")[0]}`;
  }
}

export default new UserView();
