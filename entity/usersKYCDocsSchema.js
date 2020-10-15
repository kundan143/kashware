const EntitySchema = require("typeorm").EntitySchema;
const UserKYCDocs = require("../classModel/usersKYCDocsClass").UserKYCDocs;


module.exports = new EntitySchema({
    name: "UserKYCDocs",
    target: UserKYCDocs,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        user_id: {
            primary: true,
            type: "int",
            nullable: false
        },
        adhaar_card: {
            type: "varchar",
            nullable: false
        },
        pan_card: {
            type: "varchar",
            nullable: false
        },
        created_at: {
            type:"timestamp",
            nullable: true
        },
        updated_at:{
            type: "timestamp",
            nullable: true
        },
        marksheet: {
            type: "varchar",
            nullable: true
        },
        adhaar_card_status: {
            type: "tinyint",
            nullable: false
        },
        pan_card_status:{
            type:"tinyint",
            nullable: false
        },
        marksheet_status: {
            type: "tinyint",
            nullable: false
        },
        status: {
            type: "tinyint",
            nullable: false
        }
    }})