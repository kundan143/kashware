const EntitySchema = require("typeorm").EntitySchema;
const ReportingManagers = require("../classModel/reportingManagerClass").ReportingManagers;

module.exports = new EntitySchema({
    name: "ReportingManagers",
    target: ReportingManagers,
    columns:{
        id:{
            primary:true,
            type:"int",
            generated:true
        },
        user_id:{
            type:"int",
            nullable:true
        },
        manager_id:{
            type: "int",
            nullable:true
        },
        status:{
            type:"tinyint",
            nullable:true
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