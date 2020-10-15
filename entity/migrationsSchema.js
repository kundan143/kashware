const EntitySchema = require("typeorm").EntitySchema;
const Migrations = require("../classModel/migrationsClass").Migrations;

module.exports = new EntitySchema({
    name: "Migrations",
    target: Migrations,
    columns:{
        id:{
            primary:true,
            type:"int",
            generated:true
        },
        migration:{
            type:"varchar",
            nullable:true
        },
        batch:{
            type: "int",
            nullable: true
        }
    
    }
});