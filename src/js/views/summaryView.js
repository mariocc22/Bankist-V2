import { formatCurrency, formatMovementDate } from "../helpers.js";

class SummaryView {
  _parentElement = document.querySelector(".summary");

  generateMarkup(acc) {
    // 1) entries
    const incomes = acc.movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    this._parentElement.querySelector(".summary__value--in").textContent =
      formatCurrency(incomes, acc.locale, acc.currency);

    // 2) exits
    const out = acc.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    this._parentElement.querySelector(".summary__value--out").textContent =
      formatCurrency(Math.abs(out), acc.locale, acc.currency);

    // 3) interests
    const interest = acc.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * acc.interestRate) / 100)
      .filter((int) => {
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
    this._parentElement.querySelector(".summary__value--interest").textContent =
      formatCurrency(interest, acc.locale, acc.currency);
  }
}

export default new SummaryView();
