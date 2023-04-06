import { accounts } from "./rawData.js";
import { DATE_STRING } from "./config.js";
import userCredentials from "./credentials.js";

export const bankAccounts = [];

const createAccountObject = function (account) {
  return {
    owner: account.owner,
    username: userCredentials.userName(account.owner),
    movements: account.movements,
    interestRate: account.interestRate,
    pin: account.pin,
    movementsDates: account.movementsDates,
    currency: account.currency,
    locale: account.locale,
    loanApproved: false,
  };
};

export const addAccounts = function () {
  accounts.forEach((account) => {
    const acc = createAccountObject(account);
    console.log("Account created!", acc);
    bankAccounts.push(acc);
  });
};

export const requestLoan = function (loan, account) {
  const income = Math.floor(loan);
  account.loanApproved = false;
  if (income > 0 && account.movements.some((mov) => mov >= income * 0.1)) {
    account.movements.push(income);
    account.movementsDates.push(DATE_STRING);
    account.goodForLoans = true;
    account.loanApproved = true;
  }

  return account.loanApproved;
};

export const requestTransfer = function (transfer, currentAcc) {
  // 0) defining amount and receiver
  const amount = transfer.amount;
  const receiver = bankAccounts.find(
    (acc) => acc.username === transfer.transferTo
  );
  // 1) check if transfer is valid
  if (
    amount > 0 &&
    receiver &&
    currentAcc.balance >= amount &&
    receiver?.username !== currentAcc.username
  ) {
    // 2) transfering money
    currentAcc.movements.push(-amount);
    receiver.movements.push(amount);

    // 3) add transfer date
    currentAcc.movementsDates.push(DATE_STRING);
    receiver.movementsDates.push(DATE_STRING);

    return true;
  }
  return false;
};

addAccounts();
