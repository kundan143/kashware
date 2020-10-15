const EntitySchema = require("typeorm").EntitySchema;
const Worksheets = require("../classModel/worksheetClass").Worksheets;

module.exports = new EntitySchema({
  name: "Worksheets",
  target: Worksheets,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    title: {
      type: "varchar",
      nullable: true
    },
    desc: {
      type: "text",
      nullable: true
    },
    hours_spend: {
      type: "float",
      nullable: true
    },
    date: {
      type: "date",
      nullable: true
    },
    task_type: {
      type: "varchar",
      nullable: true
    },
    stack: {
      type: "varchar",
      nullable: true
    },
    user_id: {
      type: "int",
      nullable: false
    },
    project_id: {
      type: "int",
      nullable: true
    },
    priority: {
      type: "varchar",
      nullable: true
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
