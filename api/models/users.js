const db = require("../../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByDepartment
};

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db("users").select("id", "username", "department");
}

function findBy(filter) {
  return (
    db("users")
      // .select("id", "username", "password")
      .where(filter)
  );
}

function findById(id) {
  return db("users")
    .select("id", "username", "department")
    .where({ id })
    .first();
}

function findByDepartment(department) {
  return db("users").where({ department });
}
