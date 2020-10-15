const EntitySchema = require("typeorm").EntitySchema;
const PasswordResets = require("../classModel/passwordResetsClass").PasswordResets;

module.exports = new EntitySchema({
    name: "PasswordResets",
    target: PasswordResets,
    columns:{
        id: {
            primary:true,
            type:"int",
            generated: true
        },
        email:{
            type:"varchar",
            nullable: false
        },
       token: {
           type: "varchar",
           nullable: true
       },
       created_at:{
           type:"timestamp",
           nullable:true
       }
    }
});