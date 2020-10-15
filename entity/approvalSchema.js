const EntitySchema = require("typeorm").EntitySchema;
const Approvals = require("../classModel/approvalsClass").Approvals; 

module.exports = new EntitySchema({
    name: " Approvals ",
    target:  Approvals ,
    columns: {
      id: {
        primary: true,
        type: "int",
        generated: true
      },
      model: {
        type: "varchar",
        nullable: true
      },
      desc: {
        type: "varchar",
        nullable: true
      },
      model_id: {
        type: "int",
        nullable: true
      },
      approved_by: {
        type: "int",
        nullable: true
      },
    is_approved: {
      type: "enum",
      nullable: false
    },
      status: {
        type: "tinyint",
        nullable: true
      },
      created_At: {
        type: "timestamp",
        nullable: true
      },
      updated_At: {
        type: "timestamp",
        nullable: true
      }
  }
  });
  