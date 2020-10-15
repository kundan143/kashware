const EntitySchema = require("typeorm").EntitySchema;
const Roles = require("../classModel/rolesClass").Roles;

module.exports = new EntitySchema({
  name: "Roles",
  target: Roles,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar",
      nullable: false
    },
    status: {
      type: "boolean",
      nullable: true
    },
    created_at: {
      type: "timestamp",
      nullable: true
    },
    updated_at: {
      type: "timestamp",
      nullable: true
    }
  }
});
