export default new (class Accounts {
  _accounts;

  createAccount(account) {
    const newAccount = {
      owner: account.name,
      username: this.createUsername(account.name),
      movements: account.movements,
      interestRate: account.rate, // %
      pin: account.pin,

      movementsDates: account.movDates,
      currency: account.currency,
      locale: account.locale, // de-DE
    };

    this._accounts.push(newAccount);
  }

  getAccounts() {
    return this._accounts;
  }

  createUsername(name) {
    return name
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  }
})();

// export let currentAccount;

// CREAR NOMBRE DE USUARIOS
// toma el nombre de la cuenta y toma la inicial del First Name y Last Name y lo junta, e.g. Mario Cesena = mc
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

// FORMATO PARA CREAR UN ACCOUNT
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

// LAS ACCOUNTS SE GUARDARAN EN UN ARRAY
// const accounts = [account1, account2];

// variables para indicar la cuenta actual/activa
// este objeto se utiliza bastante para mostrar, definir muchas cosas, en especial para realizar, depositos, transferencias y mostrar todo el UI
// let currentAccount;
