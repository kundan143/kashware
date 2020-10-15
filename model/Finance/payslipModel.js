const Payslips = require("../../classModel/payslipClass").Payslips;
const Users = require("../../classModel/usersClass").Users;
const {getConnection} = require("typeorm");
const moment = require('moment');
 
 //fetch payslip list
 const fetchPayslipList = async function(clientData, clientData2){
     try{
         
         const today = moment();
         let date_ = String(today.format()).slice(0,4)
         if(clientData2.year != '' && clientData2.year != 'null'){
             date_ = `${clientData2.year}`
         }
         
        if(clientData2.month != '' && clientData2.month != 'null'){
            date_ = date_ + `-${clientData2.month}`
        }

        let doc_type = ``
        if (clientData2.type.toLowerCase() == 'pending'){
            doc_type = `and url is null`
            console.log('pending', doc_type)
        }

        if (clientData2.type.toLowerCase() == 'uploaded'){
            doc_type = `and url is not null`
        }

        let data = await getConnection()
        .getRepository(Payslips)
        .createQueryBuilder("payslip")
        .leftJoin(Users, "user","user.id = payslip.user_id")
        .where(`payslip.status = 1 
        and user.status = 1
        and payslip.month_year like '${date_}%'
        and payslip.user_id = ${clientData.emp_id} ${doc_type}`)
        .select([
            "payslip.id as payslipId",
            "payslip.user_id as userId",
            "payslip.url as filename",
            "payslip.month_year as month_year"
        ])
        .getRawMany()

        return data;
}catch(error){
         throw error;
     }
 };

       
 const uploadPayslip = async function(param_data, body_data, file_data){
     try { 

         let data = await getConnection()
         .createQueryBuilder()
         .update(Payslips)
         .set({
            url:file_data.filename,
            status:1,
            created_at: new Date()
         })
         .where("status = 1 and id = :id",{
             id: param_data.payslip_id
         })
         .execute()

         return data;
         
     } catch (error) {
         throw error;
     }
 }

const generate_payslip_record = async (clientData)=>{
    try{
        return "data"
    }catch(error){
        throw error
    }
}

const createMonthlyPayslips = async ()=>{
    try{
        const today = moment();
        
        let users_data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .where("user.status = 1 and user.role_id in (3, 6, 5, 7, 8)")
        .select(["user.id as user_id"])
        .getRawMany();
        
        let insert_data = []
        
        for (i in users_data){
            //console.log(users_data[i].user_id, String(today.format()).slice(0,10))
            insert_data.push({
                user_id: users_data[i].user_id,
                url: null,
                month_year: String(today.format()).slice(0,10),
                status: 1,
                created_at: new Date()
            })
        }
        
        let insertdata = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Payslips)
        .values(insert_data)
        .execute()
        
        return users_data
    }catch(error){
        throw error
    }
}

 module.exports = { 
                fetchPayslipList,
                uploadPayslip,
                createMonthlyPayslips
            };
 