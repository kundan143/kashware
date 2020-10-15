const EntitySchema = require("typeorm").EntitySchema;
const Biometrics = require("../classModel/biometricsClass").Biometrics;

module.exports = new EntitySchema({
    name: "Biometrics",
    target: Biometrics,
    columns: {
        biometric_id:{
            primary: true,
            type:"bigint",
            generated: true
        },
        file_name:{
            type:"varchar",
            nullable: true
        },
        month:{
            // type: "varchar",
            // nullable: false
            type: "enum",
            enum:['January','February','March','April','May','June','July','August','September','October','November','December'],
            nullable: false
        },
        year:{
            type: "int",
            nullable: true
        },
        branch_id:{
            type:"int",
            nullable: true
        },
        status:{
            type:"tinyint",
            nullable:true
        },
        created_at:{
            type:"timestamp",
            nullable: true
        },
        updated_at:{
            type:"timestamp",
            nullable: true
        }
    }
});