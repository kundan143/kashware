const EntitySchema = require("typeorm").EntitySchema;
const Attendances = require("../classModel/attendanceClass").Attendances;

module.exports = new EntitySchema({
  name: "Attendances",
  target: Attendances,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    user_id: {
      type: "int",
      nullable: false
    },
    date: {
      type: "date",
      nullable: true
    },
    in_time: {
      type: "time",
      nullable: true
    },
    out_time: {
      type: "time",
      nullable: true
    },
    shift: {
      type:"varchar",
      nullable: true
    },
    first_half: {
      type:"varchar",
      nullable: true
    },
    second_half: {
      type:"varchar",
      nullable: true
    },
    late_in: {
      type:"varchar",
      nullable: true
    },
    early_out: {
      type:"varchar",
      nullable: true
    },
    work_hrs: {
      type:"double",
      nullable: true
    },
    ot: {
      type:"time",
      nullable: true
    },
    status: {
      type: "tinyint",
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
