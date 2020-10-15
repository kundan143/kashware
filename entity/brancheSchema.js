const EnitySchema = require("typeorm").EntitySchema;
const Branches = require("../classModel/branchClass").Branches;

        module.exports = new EnitySchema({
            name: "Branches",
            target:Branches,
            columns:{
                id:{
                    primary: true,
                    type: "int",
                    generated: true
                },
                location:{
                    type: "varchar",
                    nullable: false
                },
                city:{
                    type: "varchar",
                    nullable: false
                 },
                address:{
                    type: "varchar",
                    nullable: false
                },
                mobile:{
                    type: "varchar",
                    nullable: false
                },
                created_at:{
                    type: "timestamp",
                    nullable:true
                },
                updated_at:{
                    type: "timestamp",
                    nullable:true 
                },
               
            }

           

        })