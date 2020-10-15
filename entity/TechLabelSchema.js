const EntitySchema = require("typeorm").EntitySchema;
const TechLabels = require("../classModel/techLabelsClass").TechLabels;

module.exports = new EntitySchema({
  name: "TechLabels",
  target: TechLabels,
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
    update_at: {
      type: "timestamp",
      nullable: true
    },
    deleted_at: {
      type: "timestamp",
      nullable: true
    }
  }
});
