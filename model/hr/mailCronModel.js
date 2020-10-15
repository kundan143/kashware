const {getConnection} = require("typeorm");
const Users = require("../../classModel/usersClass").Users;
const Bank = require("../../classModel/banksClass").Banks;
const Leave = require("../../classModel/leaveClass").Leaves;
const Projects = require("../../classModel/projectClass").Projects;
const Teams = require("../../classModel/teamClass").Teams;
const Branches = require("../../classModel/branchClass").Branches;
const UserKYCDocs = require("../../classModel/usersKYCDocsClass").UserKYCDocs; 
const roles = require("../../classModel/rolesClass").Roles;
const Designations = require("../../classModel/designationClass").Designations;


const checkAppointmentStatus = async (clientData)=>{
    try{
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .where("user.status = 1 and DATEDIFF(CURDATE(), created_at) >= 10 and appointment_date is null and role_id = 6")
        .select([
            "user.id as user_id",
            "user.emp_id as emp_id",
            "user.email as email",
            "user.first_name as first_name",
            "user.last_name as last_name"
        ])
        .getRawMany()

        return data
    }catch(error){
        throw error
    }
}

module.exports = {
    checkAppointmentStatus
}