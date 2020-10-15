const EntitySchema = require("typeorm").EntitySchema;
const AnnouncementUsers = require("../classModel/announcementUsersClass").AnnouncementUsers;

module.exports = new EntitySchema({
    name: "AnnouncementUsers",
    target: AnnouncementUsers,
    columns:{
        announcement_user_id:{
            primary:true,
            type:"bigint",
            generated:true
        },
        user_id:{
            type:"bigint",
            nullable:true
        },
        announcement_id:{
            type: "bigint",
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