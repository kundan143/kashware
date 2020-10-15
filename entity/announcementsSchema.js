const EntitySchema = require("typeorm").EntitySchema;
const Announcements = require("../classModel/announcementsClass").Announcements;

module.exports = new EntitySchema({
    name: "Announcements",
    target: Announcements,
    columns:{
        announcement_id:{
            primary:true,
            type:"bigint",
            generated:true
        },
        branch_id:{
            type:"int",
            nullable:true
        },
        employee_type:{
            type: "enum",
            enum: ['Intern', 'Full Time', 'All'],
            nullable: false
        },
        announcement_by:{
            type: "bigint",
            nullable: true
        },
        title:{
            type: "varchar",
            nullable: true
        },
        description: {
            type: "text",
            nullable: true
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