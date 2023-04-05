import { accounts } from "./rawData.js";

export const bankAccounts = [];

export const createAccountObject = function (account) {
  console.log("Account received!", account);
  return {
    owner: account.owner,
    username: userName(account.owner),
    movements: account.movements,
    interestRate: account.interestRate,
    pin: account.pin,
    movementsDates: account.movementsDates,
    currency: account.currency,
    locale: account.locale,
  };
};

function addAccounts() {
  accounts.forEach((account) => {
    const acc = createAccountObject(account);
    bankAccounts.push(acc);
  });
}

const userName = function (owner) {
  return owner
    .toLowerCase()
    .split(" ")
    .map((name) => name[0])
    .join("");
};

export const currentUser = function (credentials) {
  const userFound = bankAccounts.find(
    (user) => credentials[0] === user.username
  );
  // check if there's a user
  if (!userFound) return;

  // check if the pin is correct
  return userFound.pin === +credentials[1] ? userFound : null;
};

// Adding raw data to the array
addAccounts();
