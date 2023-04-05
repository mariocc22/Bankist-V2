import Accounts from "../accounts.js";

// Elements
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");

// Acciones que se genera para cuando el usuario se logea
export const logging = function (e) {
  e.preventDefault();
  currentAccount = Accounts.getAccounts().find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log("This is the current account: ", currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    console.log("User Logged in!");
  }

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
};

// Cuando el usuario se logea se dispara la funcion para limitar al usuario de estar mucho tiempo logeado, al llegar a 0 lo saca de su sesion
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120000;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
