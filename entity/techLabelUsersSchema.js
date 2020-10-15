const EntitySchema = require("typeorm").EntitySchema;
const TechLabelUsers = require("../classModel/techLabelsusersClass").TechLabelUsers;

module.exports = new EntitySchema({
    name: "TechLabelUsers",
    target: TechLabelUsers,
    columns:{
        id:{
            primary:true,
            type:"bigint",
            generated:true
        },
        tech_label_id:{
            type:"int",
            nullable:true
        },
        user_id:{
            type:"int",
            nullable:true
        },
        level:{
            type: "int",
            nullable:true
        },
        experience:{
            type:"int",
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