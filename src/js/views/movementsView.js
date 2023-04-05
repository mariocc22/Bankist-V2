import { formatCurrency, formatMovementDate } from "../helpers.js";

class MovementsView {
  _parentElement = document.querySelector(".movements");
  _errorMessage = "No movements to show!";

  generateMarkup(acc, sort = false) {
    this._parentElement.innerHTML = "";

    // 0) Sorting movements (if selected)
    const movs = sort
      ? acc.movements.slice().sort((a, b) => a - b)
      : acc.movements;

    // 1) Adding movements to container
    movs.forEach(
      function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(date, acc.locale);
        const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

        const html = `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${
          i + 1
        } ${type}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formattedMov}</div>
          </div>`;
        this._parentElement.insertAdjacentHTML("afterbegin", html);
      }.bind(this)
    );
  }
}

export default new MovementsView();
