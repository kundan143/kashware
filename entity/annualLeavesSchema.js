const EntitySchema = require("typeorm").EntitySchema;
const AnnualLeaves = require("../classModel/annualLeavesClass").AnnualLeaves;

module.exports = new EntitySchema({
    name: "AnnualLeaves",
    target: AnnualLeaves,
    columns:{
        annual_leave_id:{
            primary:true,
            type:"int",
            generated:true
        },
        user_id:{
            type:"int",
            nullable:false
        },
        days:{
            type: "int",
            nullable:true
        },
        leave_type:{
            type:"varchar",
            nullable:true
        },
        year:{
            type:"int",
            nullable:true
        },
        is_approved:{
            type:"boolean",
            nullable:"true"
        },
        status:{
            type:"boolean",
            nullable:"true"
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