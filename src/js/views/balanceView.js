import { formatCurrency, currentDate } from "../helpers.js";

class BalanceView {
  _parentElement = document.querySelector(".balance");
  _errorMessage = "Out of Money!";

  generateMarkup(acc) {
    // 1) Render current date
    this._parentElement.querySelector(".date").textContent = currentDate(acc);

    // 2) Render total balance
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    this._parentElement.querySelector(".balance__value").textContent =
      formatCurrency(acc.balance, acc.locale, acc.currency);
  }
}

export default new BalanceView();
