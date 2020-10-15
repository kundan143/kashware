const EntitySchema = require("typeorm").EntitySchema;
const Banks = require("../classModel/banksClass").Banks;

module.exports = new EntitySchema({
    name: "Banks",
    target: Banks,
    columns:{
        id:{
            primary:true,
            type:"int",
            generated:true
        },
        name:{
            type:"varchar",
            nullable:false
        },
        user_id:{
            type:"int",
            nullable:false
        },
        account_no:{
            type: "varchar",
            nullable:true
        },
        ifsc:{
            type:"varchar",
            nullable:true
        },
        branch_name:{
            type:"varchar",
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