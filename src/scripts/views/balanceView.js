// Seleccionando la cantidad de dinero disponible de la cuenta
const labelBalance = document.querySelector(".balance__value");

// Crea una propiedad de "balance" a la cuenta sumando todos los movimientos que tiene y la manda a llamar en cuanto se logea el usuario
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); //este 0 se refiere al valor inicial del acumulador "acc"
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// Para mostrar la fecha actual de inicio de sesion del usuario
// Lo manda a llamar  cuando el usuario se logea
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};
// labelDate es el elemento html y se agrega el texto
labelDate.textContent = new Intl.DateTimeFormat(
  currentAccount.locale,
  options
).format(now);
