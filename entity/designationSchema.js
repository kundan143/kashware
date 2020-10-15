const EntitySchema = require("typeorm").EntitySchema;
const Designations = require("../classModel/designationClass").Designations;

module.exports = new EntitySchema({
  name: "Designations",
  target: Designations,
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
