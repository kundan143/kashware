const EntitySchema = require("typeorm").EntitySchema;
const UserLogs = require("../classModel/userLogsClass").UserLogs;

module.exports = new EntitySchema({
  name: "user_logs",
  target: UserLogs,
  columns: {
    id: {
      primary: true,
      type: "bigint",
      generated: true
    },
    user_id: {
      type: "bigint",
      nullable: false
    },
    first_name: {
      type: "varchar",
      nullable: false
    },
    last_name: {
      type: "varchar",
      nullable: false
    },
    email: {
      type: "varchar",
      nullable: false
    },
    xelp_email: {
      type: "varchar",
      nullable: true
    },
    email_verified_at: {
      type: "timestamp",
      nullable: true
    },
    password: {
      type: "varchar",
      nullable: false
    },
    role_id: {
      type: "int",
      nullable: true
    },
    phone: {
      type: "varchar",
      nullable: true
    },
    mobile: {
      type: "varchar",
      nullable: true
    },
    emer_contact_no: {
      type: "varchar",
      nullable: true
    },
    emer_contact_name: {
      type: "varchar",
      nullable: true
    },
    designation: {
      type: "int",
      nullable: true
    },
    dob: {
      type: "date",
      nullable: true
    },
    doj: {
      type: "date",
      nullable: true
    },
    dol: {
      type: "date",
      nullable: true
    },
    p_address: {
      type: "text",
      nullable: true
    },
    emp_id: {
      type: "varchar",
      nullable: false
    },
    c_address: {
      type: "text",
      nullable: true
    },
    city: {
      type: "varchar",
      nullable: true
    },
    address: {
      type: "text",
      nullable: true
    },
    reporting_to: {
      type: "int",
      nullable: true
    },
    bg: {
      type: "varchar",
      nullable: true
    },
    profile_pic: {
      type: "text",
      nullable: true
    },
    resume_url: {
      type: "text",
      nullable: true
    },
    branch_id: {
      type: "varchar",
      nullable: true
    },
    current_salary: {
      type: "int",
      nullable: true
    },
    user_type: {
      type: "enum",
      enum: ['reporting_manager', 'intern', 'employee'],
      nullable: true
    },
    status: {
      type: "tinyint",
      nullable: true
    },
    // remember_token: {
    //   type: "varchar",
    //   nullable: true
    // },
    created_at: {
      type: "timestamp",
      nullable: true
    },
    updated_at: {
      type: "timestamp",
      nullable: true
    },
    resignation_date :{
      type: "date",
      nullable: true
    },
    appointment_date :{
      type: "date",
      nullable: true
    },
    other_document :{
      type: "json",
      nullable: true
    },
  }
});
