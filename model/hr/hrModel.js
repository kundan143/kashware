const Users = require("../../classModel/usersClass").Users;
const Bank = require("../../classModel/banksClass").Banks;
const Leave = require("../../classModel/leaveClass").Leaves;
const {getConnection,getRepository} = require("typeorm");
const bcrypt = require("bcrypt");

const saveData = async function(xelpData){
    try{
        const password = await bcrypt.hash(xelpData.password, 12)
            .then(function(hashedPassword){
            console.log(hashedPassword)
            return hashedPassword
            })
        
        //console.log("Ankit", password)
        
        const data = await getConnection()
         .createQueryBuilder()
         .insert()
         .into(Users)
         .values([{
             name: xelpData.name,
             email: xelpData.email,
             email_verified_at: Date(),
             password :password,
             role_id:xelpData.role_id,
             phone:xelpData.phone,
             mobile:xelpData.mobile,
             emer_contact_no:xelpData.emer_contact_no,
             emer_contact_name:xelpData.emer_contact_name,
             designation:xelpData.designation,
             dob:xelpData.dob,
             doj:xelpData.doj,
             hire_date:xelpData.hire_date,
             emp_id:xelpData.emp_id,
             resignation_date:xelpData.resigtration,
             city:xelpData.city,
             address:xelpData.address,
             reporting_to:xelpData.reporting_to,
             bg:xelpData.bg,
             profile_pic:xelpData.profile_pic,
             resume_url:xelpData.resume_url,
             branch_id:xelpData.branch_id,
             current_salary:xelpData.current_salary,
             user_type:xelpData.user_type,
             status:xelpData.status,
             remember_token:xelpData.remember_token,
             created_at:Date()
         }])
         .execute();
        return data;
    }catch(error){
        throw error;
    }
};

const updateEmp = async function(xelpData){
    try {
        const data = await getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
            name: xelpData.name,
             email: xelpData.email,
             email_verified_at: Date(),
             password :xelpData.password,
             role_id:xelpData.role_id,
             phone:xelpData.phone,
             mobile:xelpData.mobile,
             emer_contact_no:xelpData.emer_contact_no,
             emer_contact_name:xelpData.emer_contact_name,
             designation:xelpData.designation,
             dob:xelpData.dob,
             doj:xelpData.doj,
             hire_date:xelpData.hire_date,
             emp_id:xelpData.emp_id,
             resignation_date:xelpData.resigtration,
             city:xelpData.city,
             address:xelpData.address,
             reporting_to:xelpData.reporting_to,
             bg:xelpData.bg,
             profile_pic:xelpData.profile_pic,
             resume_url:xelpData.resume_url,
             branch_id:xelpData.branch_id,
             current_salary:xelpData.current_salary,
             user_type:xelpData.user_type,
             status:xelpData.status,
             remember_token:xelpData.remember_token,
        })
        .where("id=:emp_id",{emp_id:xelpData.emp_id})
        .execute();
        return data;
    } catch (error) {
        throw error;
    }
};
const saveBank = async function(xelpData){
    try{
        console.log(xelpData);
        const data = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Bank)
        .values([
            {
                name:"kundan",
                user_id:"80365417",
                account_no:"112",
                ifsc: "aa",
                branch_name:"a",
                created_at:Date(),
            }
        ])
        .execute();
        return data;
    }catch(error){
        throw error;
    }
};
const fetchEmp = async function(xelpData){
    try{
        const data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .where("user.name Like :name", {name: "%" + xelpData.name + "%"})
        .getOne()
        return data;
    }catch(error){
        throw error;
    }
};

const leaveEmp =async function(xelpData){
    try{
        console.log(xelpData);
        const data = await getConnection()
        .getRepository(Leave)
        .createQueryBuilder("leave")
        // .where("leave.user_id Like :user_id", {user_id: "%" +xelpData.user_id + "%"})
        .getOne();
        return data;
    }catch(error){
        throw error;
    }
};
module.exports={
    saveData,
    saveBank,
    fetchEmp,
    leaveEmp,
    updateEmp
};