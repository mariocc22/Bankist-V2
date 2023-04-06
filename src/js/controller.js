import userView from "../js/views/userView.js";
import balanceView from "./views/balanceView.js";
import movementsView from "./views/movementsView.js";
import summaryView from "./views/summaryView.js";
import userCredentials from "./credentials.js";
import * as model from "../js/model.js";

const updateUI = function (currentUser) {
  console.log("movements", currentUser.movements);
  balanceView.generateMarkup(currentUser);
  movementsView.generateMarkup(currentUser);
  summaryView.generateMarkup(currentUser);
};

const controlTransfer = function (transfer) {
  const currentUser = userCredentials.getcurrentUserAccount(model.bankAccounts);

  // 1) check if the user to transfer exist
  if (!model.requestTransfer(transfer, currentUser)) return;
  updateUI(currentUser);
};

const controlLoans = function (loan) {
  // 1) get current user account
  const currentUser = userCredentials.getcurrentUserAccount(model.bankAccounts);

  // 2) check if the loan was approved, update the UI based on that
  if (!model.requestLoan(loan, currentUser)) return;
  updateUI(currentUser);
};

const controlUserView = function (credentials) {
  // 0) refresh local storage
  userCredentials.removeUser();

  // 1) check if user exist
  const userExist = userCredentials.checkIfUserExist(
    credentials,
    model.bankAccounts
  );

  if (!userExist) return;

  // 2) save current user in Localstorage
  userCredentials.setUser(userExist.username, userExist.pin);

  // 3) render user information and the app
  userView.addHandlerAppView(userExist);
  balanceView.generateMarkup(userExist);
  movementsView.generateMarkup(userExist);
  summaryView.generateMarkup(userExist);
};

const controlSorting = function (sort) {
  // 1) get current user account
  const currentUser = userCredentials.getcurrentUserAccount(model.bankAccounts);
  // 2) sort movements
  movementsView.generateMarkup(currentUser, sort);
};

// Init App
const init = function () {
  userView.addHandlerRender(controlUserView);
  userView.addHandlerLoan(controlLoans);
  userView.addHandlerTransfer(controlTransfer);
  userView.addHandlerSorting(controlSorting);
};

init();
