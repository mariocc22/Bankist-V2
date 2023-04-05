import userView from "../js/views/userView.js";
import * as model from "../js/model.js";

const controlMovements = function () {};
const controlSummary = function () {};
const controlBalance = function () {};
const controlTransactions = function () {};

const controlUserView = function () {
  // 1) get credentials
  const credentials = userView.getUser();
  if (!credentials) return;

  // 2) validate credentials
  const currentUser = model.currentUser(credentials);
  // TODO RENDER ERROR MESSAGE IF....

  // 3) render user information and the app
  userView.addHandlerAppView(currentUser);
};

// Init App
const init = function () {
  userView.addHandlerRender(controlUserView);
};

init();
