const userCredentials = {
  setUser(username, pin) {
    const user = {
      username: username,
      pin: pin,
    };
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.clear();
  },

  userName(owner) {
    return owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  },

  checkIfUserExist(credentials, bankAccounts) {
    const userFound = bankAccounts.find(
      (user) => credentials[0] === user.username
    );

    // check if there's a user
    if (!userFound) return;

    // check if the pin is correct
    return userFound.pin === +credentials[1] ? userFound : null;
  },
  getcurrentUserAccount(bankAccounts) {
    const currentUser = this.getUser();
    const userAccount = bankAccounts.find(
      (user) => currentUser.username === user.username
    );
    return userAccount ? userAccount : null;
  },
};

export default userCredentials;
