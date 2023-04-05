// los movements seran valors positivos y negativos si son entradas o salidas respectivamente y se guardan en un array como propiedad del objecto account, al igual que el array de fechas de cuando se realizaron dichos movimientos

// Contenedor papa de los movimientos
const containerMovements = document.querySelector(".movements");

// Funcion para mostrar los movimientos y agregarlos al contenedor papa
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  // metes todos los movs de la cuenta en una constante (sorteados)
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
