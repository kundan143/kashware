const EntitySchema = require("typeorm").EntitySchema;
const Holidays = require("../classModel/holidaysClass").Holidays;

module.exports = new EntitySchema({
    name: "Holidays",
    target: Holidays,
    columns:{
        holiday_id:{
            primary:true,
            type:"bigint",
            generated: true
        },
        title:{
            type:"varchar",
            nullable:true
        },
        desc:{
            type:"text",
            nullable:true
        },
        holiday_date:{
            type:"date",
            nullable:true
        },
        branch_id:{
            type:"int",
            nullable:false
        },
        flag:{
            type:"varchar",
            nullable:false
        },
        status:{
            type:"tinyint",
            nullable:false
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