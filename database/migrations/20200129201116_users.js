exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("username", 10)
      .notNullable()
      .unique()
      .index();

    users.string("password", 10).notNullable();
    users.string("department", 10).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
