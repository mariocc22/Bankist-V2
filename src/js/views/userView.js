import { TIMER_DURATION } from "../config.js";

class UserView {
  _appView = document.querySelector(".app");
  _timer = document.querySelector(".timer");
  _parentElement = document.querySelector(".nav-user");
  _loanForm = document.querySelector(".form--loan");
  _transferForm = document.querySelector(".form--transfer");
  _closeForm = document.querySelector(".form--close");
  _countdown = "";
  _sort = false;

  addHandlerRender(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();

      const btnSubmit = e.target.closest(".login__btn");
      if (!btnSubmit) return;

      const credentials = [
        this._parentElement.querySelector(".login__input--user").value,
        this._parentElement.querySelector(".login__input--pin").value,
      ];

      this._parentElement.querySelector(".login").reset();

      handler(credentials);
    });
  }

  addHandlerAppView(user) {
    if (!user) return;
    this._appView.style.opacity = 100;
    this._parentElement.querySelector(
      ".welcome"
    ).textContent = `Welcome back, ${user.owner.split(" ")[0]}`;
    if (this._countdown) clearInterval(this._countdown);
    this._countdown = this.startLogOutTimer();
  }

  addHandlerLoan(handler) {
    this._loanForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const loan = +this.querySelector(".form__input--loan-amount").value;
      this.reset();

      clearInterval(this._countdown);
      this._countdown = this.startLogOutTimer();

      handler(loan);
    });
  }

  addHandlerTransfer(handler) {
    this._transferForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const transfer = {
        transferTo: this.querySelector(".form__input--to").value,
        amount: +this.querySelector(".form__input--amount").value,
      };
      this.reset();

      clearInterval(this._countdown);
      this._countdown = this.startLogOutTimer();

      handler(transfer);
    });
  }

  addHandlerSorting(handler) {
    this._appView.addEventListener("click", function (e) {
      if (e.target.closest(".btn--sort")) {
        this._sort = !this._sort;
        console.log("Sorting", this._sort);
        handler(this._sort);
      }
    });
  }

  startLogOutTimer() {
    console.log("In the timer");
    const endTime = Date.now() + TIMER_DURATION * 1000;
    const tick = function () {
      const remainingTime = Math.round((endTime - Date.now()) / 1000);

      if (remainingTime < 0) {
        clearInterval(this._countdown);
        this._parentElement.querySelector(
          ".welcome"
        ).textContent = `Log in to get started`;
        this._appView.style.opacity = 0;
        return;
      }

      const min = String(Math.floor(remainingTime / 60)).padStart(2, "0");
      const sec = String(remainingTime % 60).padStart(2, "0");
      this._timer.textContent = `${min}:${sec}`;
    }.bind(this);

    tick();
    this._countdown = setInterval(tick, 1000);
    return this._countdown;
  }
}

export default new UserView();
