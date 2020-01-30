const db = require("../../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter);
}

// async function add(user) {
//   const [id] = await db("users").insert(user);
//   return findById(id);
// }

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}
