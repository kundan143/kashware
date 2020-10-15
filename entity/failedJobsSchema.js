const EntitySchema = require("typeorm").EntitySchema;
const FailedJobs = require("../classModel/failedjobsClass").FailedJobs;

module.exports = new EntitySchema({
    name: "FailedJobs",
    target: FailedJobs,
    columns:{
        id:{
            primary:true,
            type:"bigint",
            generated:true
        },
        connection:{
            type:"text",
            nullable:true
        },
        queue:{
            type:"text",
            nullable:true
        },
        payload:{
            type: "text",
            nullable:true
        },
        exception:{
            type:"text",
            nullable:true
        },
        failed_at:{
            type:"timestamp",
            nullable:true
        }
    }
});