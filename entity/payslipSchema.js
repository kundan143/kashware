const EnitySchema = require("typeorm").EntitySchema;
const Payslips = require("../classModel/payslipClass").Payslips;

        module.exports = new EnitySchema({
            name: "Payslips",
            target:Payslips,
            columns:{
                id:{
                    primary: true,
                    type: "int",
                    generated: true
                },
                user_id:{
                    type: "int",
                    nullable: false
                },
                url:{
                    type: "text",
                    nullable: true
                 },
                month_year:{
                    type: "date",
                    nullable: false
                },
                status:{
                    type: "boolean",
                    defaultValue: 1,
                    nullable: false
                },
                created_at:{
                    type: "timestamp",
                    nullable:true
                },
                updated_at:{
                    type: "timestamp", 
                    nullable:true
                }
            }
        })
        