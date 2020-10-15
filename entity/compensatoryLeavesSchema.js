const EntitySchema = require("typeorm").EntitySchema;
const CompensatoryLeaves = require("../classModel/compensatoryLeavesClass").CompensatoryLeaves;

module.exports = new EntitySchema({
    name: "CompensatoryLeaves",
    target: CompensatoryLeaves,
    columns:{
        compensatory_leave_id:{
            primary:true,
            type:"int",
            generated:true
        },
        user_id:{
            type:"int",
            nullable:true
        },
        days:{
            type: "int",
            nullable: true
        },
        allocated_by:{
            type: "int",
            nullable: true
        },
        year:{
            type: "int",
            nullable:true
        },
        desc:{
            type:"varchar",
            nullable:true
        },
        is_approved:{
            type:"boolean",
            nullable:true
        },
        status:{
            type: "boolean",
            nullable: true
        },
       created_at:{
           type:"timestamp",
           nullable:true
       },
       updated_at:{
           type:"timestamp",
           nullable:true
       }
    }
});