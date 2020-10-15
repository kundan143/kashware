const EntitySchema = require("typeorm").EntitySchema;
const SysNotifications = require("../classModel/sysNotificationsClass").SysNotifications;

module.exports = new EntitySchema({
    name:"SysNotifications",
    target: SysNotifications,
    columns:{
        notification_id:{
            primary:true,
            type:"int",
            generated:true
        },
        user_id:{
            type:"int",
            nullable:false
        },
        flag:{
            type:"varchar",
            nullable:true
        },
        releted_to:{
            type:"varchar",
            nullable:true
        },
        model_type:{
            type:"varchar",
            nullable:true
        },
        read_at:{
            type:"timestamp",
            nullable:true
        },
        expires_at:{
            type:"date",
            nullable:true
        },
        published:{
            type: "tinyint",
            nullable: true
        },
        posted_by: {
            type: "int",
            nullable: true
        },
        desc:{
            type:"text",
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