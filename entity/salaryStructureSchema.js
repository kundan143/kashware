const EntitySchema = require("typeorm").EntitySchema;
const SalaryStructures = require("../classModel/salaryStructureClass").SalaryStructures;

module.exports = new EntitySchema({
  name: "SalaryStructures",
  target: SalaryStructures,
  columns: {
    salary_structure_id: {
      primary: true,
      type: "bigint",
      generated: true
    },
    user_id: {
      type: "bigint",
      nullable: false
    },
    earnings: {
      type: "json",
      nullable: true
    },
    employer_contribution: {
      type: "json",
      nullable: true
    },
    deduction: {
      type: "json",
      nullable: true
    },
    ctc: {
      type: "double",
      nullable: false
    },
    month_total: {
      type: "double",
      nullable: false
    },
    year_total: {
      type: "double",
      nullable: false
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
