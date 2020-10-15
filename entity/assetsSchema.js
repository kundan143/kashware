const { text } = require("body-parser");

const EntitySchema = require("typeorm").EntitySchema;
const Assets = require("../classModel/assetsClass").Assets;

module.exports = new EntitySchema({
    name:"Assets",
    target: Assets,
    columns:{
        id:{
            primary:true,
            type:"int",
            generated:true
        },
        user_id:{
            type:"varchar",
            nullable:true
        },
        product_id:{
            type:"int",
            nullable:true
        },
        product_name:{
            type:"varchar",
            nullable:true
        },
        assign_by:{
            type:"int",
            nullable:true
        },
        deleted_at:{
            type: "date",
            nullable:true
        },
        status:{
            type:"boolean",
            nullable:true
        },
        created_at:{
            type:"timestamp",
            nullable:true
        },
        
        updated_at:{
            type:"timestamp",
            nullable:true
        },
        reason:{
            type:"text",
            nullable:true
        },
        damage:{
            type:"text",
            nullable:true
        }
    }
});