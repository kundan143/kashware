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
const SalaryStructures = require("../../classModel/salaryStructureClass").SalaryStructures;


const fetchEmployeeDetailById = async function(clientData){
  try {
    
    let data = await getConnection()
    .getRepository(Users)
    .createQueryBuilder("user")
    .leftJoin(roles, "roles", "roles.id = user.role_id")
    .leftJoin(Users, "usr", "usr.id = user.reporting_to")
    .leftJoin(Branches, "branch", "branch.id = user.branch_id")
    .leftJoin(Designations, "design", "design.id = user.designation")
    .leftJoin(UserKYCDocs, "ukyc", "ukyc.user_id = user.id")
    .where("user.status = 1 and user.id = :id", {
    id: clientData.emp_id
    })
    .select([
        "user.id as user_id",
        "user.first_name as first_name",
        "user.last_name as last_name",
        "design.name as designation",
        "user.user_type as emp__type",
        "user.bg as blood_group",
        "roles.id as role_id",
        "roles.name as role_name",
        "user.emp_id as emp_id",
        "user.email as user_email",
        "user.xelp_email as xelp_email",
        "user.phone as contact_no",
        "user.c_address as current_address",
        "user.p_address as permanent_address",
        "user.phone as phone",
        "user.mobile as mobile",
        "usr.first_name as reporting_manager_fname",
        "usr.last_name as reporting_manager_lname",
        "branch.city as location",
        "branch.id as branch_id",
        "usr.id as reporting_manager_id",
        "design.id as design_id",
        "user.resume_url as resume",
        "user.doj as dateOfJoining",
        "user.dol as dateOfReleasing"
    ])
    .getRawMany();
    
    let ss = await getConnection()
    .getRepository(SalaryStructures)
    .createQueryBuilder("sss")
    .where(`sss.status = 1 and sss.user_id = ${clientData.emp_id}`)
    .select(["sss.ctc as emp_ctc", "sss.created_at as salary_structure_date"])
    .getRawOne()

    if(ss == undefined){
      ss = null
    }
    
    data[0]['salary_structure'] = ss
    
    return data;
  } catch (error) {
    throw error
  }
}

const empList = async (clientData)=>{
  try{
    let location = ``;
    if (clientData.branch_id != 'all'){
      location = `and branch_id = ${clientData.branch_id}`
    }
    
    let data = await getConnection()
    .getRepository(Users)
    .createQueryBuilder("usr")
    .where(`status = 1 ${location}`)
    .andWhere(`usr.role_id not in (1, 2, 5, 7, 8, 9, 10)`)
    .select(["usr.id as id", "usr.first_name as first_name", "usr.last_name as last_name"])
    .getRawMany()

    return data
  }catch(error){
    throw error
  }
}

const userProject = async (clientData)=>{
  try{
    let data = await getConnection()
    .getRepository(Teams)
    .createQueryBuilder("team")
    .leftJoin(Projects, "pro", "pro.id = team.project_id")
    .where("team.status = 1  and pro.status = 1 and team.user_id = :id",{
      id: clientData.emp_id
    })
    .select(["pro.title as project_name"])
    .getRawMany()

    return data
  }catch(error){
    throw error
  }
}

const uploadResumeById = async (clientData, clientData2)=>{
  try{

    let data = await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({
        resume_url: clientData2.filename,
        updated_at: new Date()
    })
    .where("status = 1 and id = :user_id",{
        user_id: clientData.emp_id
    })
    .execute()

    return data
  }catch(error){
  throw error
  }
}

module.exports = { 
  fetchEmployeeDetailById,
  empList,
  userProject,
  uploadResumeById
};


