const EntitySchema = require("typeorm").EntitySchema;
const LeaveQuotas  = require("../classModel/leaveQuotasClass").LeaveQuotas;

module.exports = new EntitySchema({
    name: "LeaveQuotas",
    target: LeaveQuotas,
    columns:{
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        days: {
            type: "double",
            nullable: false
        },
        leave_type:{
            type: "enum",
            enum: ['sick', 'privilege', 'casual'],
            nullable: true
        },
        emp_type: {
            type: "enum",
            enum: ['employee', 'intern'],
            nullable: true
        },
        year:{
            type: "year",
            nullable: true
        },
        branch_id:{
            type: "int",
            nullable: true
        },
        status:{
            type: "tinyint",
            nullable: false,
            default: '1'
        },
        created_at:{
            type: "timestamp",
            nullable: true
        },
        updated_at:{
            type: "timestamp",
            nullable: true
        }
    }
})