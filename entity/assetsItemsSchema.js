const EntitySchema = require("typeorm").EntitySchema;
const AssetsItems = require("../classModel/assetsItemsClass").AssetsItems;

module.exports = new EntitySchema({
    name:"AssetsItems",
    target: AssetsItems,
    columns:{
        id:{
            primary:true,
            type:"int",
            generated:true
        },
        name:{
            type:"varchar",
            nullable:true
        },
        version:{
            type:"varchar",
            nullable:true
        },
        model:{
            type:"int",
            nullable:true
        },
        branch_id:{
            type:"int",
            nullable: true
        },
        item_type:{
            type:"varchar",
            nullable:true
        },
        purchase_date:{
            type: "date",
            nullable: true
        },
        documents:{
            type:"json",
            nullable: true
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
        expire_date:{
            type:"date",
            nullable: true
        },
        usage_type:{
            type:"enum",
            enum:['Employee','Office'],
            nullable: true
        },
        description:{
            type: "text",
            nullable: true
        }
    }
});