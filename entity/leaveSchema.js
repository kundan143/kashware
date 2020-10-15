const EntitySchema = require("typeorm").EntitySchema;
const Leaves = require("../classModel/leaveClass").Leaves;
//const Attendence = require("../classModel/attendenClass").Attendence;

module.exports = new EntitySchema({
  name: "Leaves",
  target: Leaves,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    user_id: {
      type: "int",
      nullable: true
    },
    reason: {
      type: "text",
      nullable: true
    },
    leave_type: {
      type: "varchar",
      nullable: true
    },
    from: {
      type: "date",
      nullable: true
    },
    to: {
      type: "date",
      nullable: true
    },
    is_approved:{
      type: "int",
      nullable:"false"
    },
    status: {
      type: "boolean",
      nullable: true
    },
    created_At: {
      type: "timestamp",
    },
    updated_At: {
      type: "timestamp",
      nullable: true
    }
  }
});