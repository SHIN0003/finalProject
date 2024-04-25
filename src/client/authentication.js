const users = pouchDB('users');

function registerUser(username, password) {
  return users.put({
    _id: username,
    password: password
  });
}

function getUser(username) {
  return users.get(username);
}

function getCredentials() {
  return users.allDocs({ include_docs: true })
    .then(result => {
      return result.rows.map(row => row.doc);
    });
}

export { registerUser, getUser };