const {getConnection} = require("typeorm");
const Assets = require("../../classModel/assetsClass").Assets;
const Designations = require("../../classModel/designationClass").Designations;
const Users = require("../../classModel/usersClass").Users;
const Assetsitem = require("../../classModel/assetsItemsClass").AssetsItems;
const Branches = require("../../classModel/branchClass").Branches;
const Roles = require("../../classModel/rolesClass").Roles;
const UserLogs = require("../../classModel/userLogsClass").UserLogs;


const fetchCompleteDetailById = async (clientData)=>{
    try{
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .where("user.status = 1 and user.id = :id",{
            id: clientData.e_id
        })
        .select(["user"])
        .getMany()
        
        const data_logs = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(UserLogs)
        .values([{
            user_id: data[0].id,
            first_name: data[0].first_name, 
            last_name:  data[0].last_name,
            email:  data[0].email,
            xelp_email: data[0].xelp_email,
            reporting_to:  data[0].reporting_to,
            emp_id: data[0].emp_id,
            designation: data[0].designation,
            role_id: data[0].role_id,
            password:  data[0].password,
            phone: data[0].phone,
            mobile: data[0].mobile,
            user_type: data[0].user_type,
            branch_id: data[0].branch_id,
            emer_contact_no: data[0].emer_contact_no,
            emer_contact_name: data[0].emer_contact_name,
            dob: data[0].dob,
            doj: data[0].doj,
            city: data[0].city,
            address: data[0].address,
            p_address: data[0].p_address,
            c_address: data[0].c_address,
            bg: data[0].bg,
            profile_pic: data[0].profile_pic,
            resume_url: data[0].resume_url,
            current_salary: data[0].current_salary,
            email_verified_at: data[0].email_verified_at,
            status: 1,
            dol: data[0].dol,
            resignation_date: data[0].resignation_date,
            appointment_date: data[0].appointment_date,
            other_document: data[0].other_document,
            created_at: data[0].created_at,
            updated_at: data[0].updated_at
        }])
        .execute();
        
        return data
    }catch(error){
        throw error
    }
}

module.exports = {
    fetchCompleteDetailById
}

