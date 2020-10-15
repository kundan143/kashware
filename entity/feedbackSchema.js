const EntitySchema = require("typeorm").EntitySchema;
const Feedback = require("../classModel/feedbackClass").Feedback;

module.exports = new EntitySchema({
    name: "Feedback",
    target: Feedback,
    columns:{
        id:{
            primary:true,
            type:"bigint",
            generated: true
        },
        title:{
            type:"varchar",
            nullable:false
        },
        desc:{
            type:"text",
            nullable:false
        },
        feedback_by:{
            type:"int",
            nullable:false
        },
        worksheet_id:{
            type:"int",
            nullable:false
        },
        rating:{
            type:"int",
            nullable:false
        },
        is_accepted:{
            type:"tinyint",
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