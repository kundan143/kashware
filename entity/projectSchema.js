const EntitySchema = require("typeorm").EntitySchema;
const Projects = require("../classModel/projectClass").Projects;

module.exports = new EntitySchema({
  name: "Projects",
  target: Projects,
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
    url: {
      type: "text",
      nullable: true
    },
    dev_url: {
      type: "text",
      nullable: true
    },
    repo_url: {
      type: "text",
      nullable: true
    },
    about: {
      type: "text",
      nullable: true
    },
    delivered_on: {
      type: "timestamp",
      nullable: true
    },
    lead_by: {
      type: "int",
      nullable: true
    },
    product_manager_id: {
      type: "int",
      nullable: true
    },
    wip: {
      type: "boolean",
      nullable: true
    },
    created_by: {
      type: "int",
      nullable: true
    },
    status: {
      type: "boolean"
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
