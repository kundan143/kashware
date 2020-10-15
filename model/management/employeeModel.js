const Worksheets = require("../../classModel/worksheetClass").Worksheets;
const Users = require("../../classModel/usersClass").Users;
const Projects = require("../../classModel/projectClass").Projects;
const Attendances = require("../../classModel/attendanceClass").Attendances;
const roles = require("../../classModel/rolesClass").Roles;
const { getConnection, getRepository } = require("typeorm");
const Branches = require("../../classModel/branchClass").Branches;
const Designations = require("../../classModel/designationClass").Designations;

const fetchEmployeeList = async function(clientData) {
  try {
    let data = await getConnection()
      .getRepository(Users)
      .createQueryBuilder("user")
      .leftJoin(roles, "roles", "roles.id = user.role_id")
      .leftJoin(Users, "usr", "usr.id = user.reporting_to")
      .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
      .leftJoin(Designations, "design", "design.id = user.designation")
      .where("user.status = 1")
      .select([
        "user.id as user_id",
        "user.first_name as first_name",
        "user.last_name as last_name",
        "design.name as designation",
        "user.bg as blood_group",
        "user.user_type as emp__type",
        "roles.id as role_id",
        "roles.name as role_name",
        "user.user_type as emp__type",
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
        "brnch.city as location"
      ])
      .addOrderBy("user.first_name")
      .getRawMany();
  

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchEmployeeDetail = async function(clientData) {
  try {
    console.log(clientData.employee_id);
    let data = await getConnection()
      .getRepository(Users)
      .createQueryBuilder("user")
      .where("user.status = 1 AND user.id = :id", {
        id: clientData.employee_id
      })
      .select(["user"])
      .getOne();

    return data;
  } catch (error) {
    throw error;
  } 
};


const loginEmployee = async function(clientData) {
  try {
    
    let data = await getConnection()
      .getRepository(Users)
      .createQueryBuilder("user")
      .leftJoin(roles, "role", "role.id = user.role_id")
      .where("user.status = 1 AND (user.xelp_email = :email) || (user.email = :email and user.role_id = 4)", {
        email: clientData.email
      })
      .select([
        "user.id as userId",
        "user.email as email", 
        "user.password as password",
        "user.role_id as role_id",
        "role.name as role_name",
        "user.first_name as first_name",
        "user.last_name as last_name",
        "user.profile_pic as profile_pic",
        "user.xelp_email as xelp_email",
        "user.emp_id as xelp_id"
        ])
      .getRawOne();
      
    if (data != null) {
      return data;
    } else {
      console.log("Invalid user");
      data = { email: "gg" };
      return {email: "no email", password: "57dvd"};
    }
  } catch (error) {
    throw error;
  }
};

const searchEmployee = async (clientData)=>{
  try{
    console.log("searchEmployee")
    let data = await getConnection()
    .getRepository(Users)
    .createQueryBuilder("user")
    .leftJoin(roles, "roles", "roles.id = user.role_id")
    .leftJoin(Users, "usr", "usr.id = user.reporting_to")
    .leftJoin(Branches, "branch", "branch.id = user.branch_id")
    .leftJoin(Designations, "design", "design.id = user.designation")
    .where("user.status = 1 and user.branch_id = :branch_id", {branch_id:clientData.branch_id})
    .select([
      "user.id as user_id",
      "user.first_name as first_name",
      "user.last_name as last_name",
      "design.name as designation",
      "user.bg as blood_group",
      "roles.id as role_id",
      "roles.name as role_name",
      "user.user_type as emp__type",
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
      "branch.city as location"
      ])
    .getRawMany();
    
    return data;
  }catch(err){
    throw err
  }
}

const searchEmployeeByName = async (name)=>{
  try{
    let name1 = name.name.split(" ")
    if(name['name'] == ''){
        let data = await getConnection()
    .getRepository(Users)
    .createQueryBuilder("user")
    .leftJoin(Branches, "branch", "branch.id = user.branch_id")
    .leftJoin(roles, "roles", "roles.id = user.role_id")
    .leftJoin(Users, "usr", "usr.id = user.reporting_to")
    .leftJoin(Designations, "design", "design.id = user.designation")
    .where("user.status = 1 and user.role_id in (3, 4, 6)")
    .select([
      "user.id as user_id",
      "user.first_name as first_name",
      "user.last_name as last_name",
      "design.name as designation",
      "roles.id as role_id",
      "roles.name as role_name",
      "user.user_type as emp__type",
      "user.emp_id as emp_id",
      "user.email as user_email",
      "user.xelp_email as xelp_email",
      "user.phone as contact_no",
      "user.mobile as mobile",
      "usr.first_name as reporting_manager_fname",
      "usr.last_name as reporting_manager_lname",
      "branch.city as location",
      "user.status as status"
      ])
    .getRawMany();
    return data
    }else{
          let data = await getConnection()
    .getRepository(Users)
    .createQueryBuilder("user")
    .leftJoin(Branches, "branch", "branch.id = user.branch_id")
    .leftJoin(roles, "roles", "roles.id = user.role_id")
    .leftJoin(Users, "usr", "usr.id = user.reporting_to")
    .leftJoin(Designations, "design", "design.id = user.designation")
    .where("user.status = 1 and (user.first_name Like :name1 or user.last_name Like :name1) and user.role_id in (3, 4, 6)", {
        name1: "" + name1[0] + "%"
      })
    .select([
      "user.id as user_id",
      "user.first_name as first_name",
      "user.last_name as last_name",
      "design.name as designation",
      "roles.id as role_id",
      "roles.name as role_name",
      "user.user_type as emp__type",
      "user.emp_id as emp_id",
      "user.email as user_email",
      "user.xelp_email as xelp_email",
      "user.phone as contact_no",
      "user.mobile as mobile",
      "usr.first_name as reporting_manager_fname",
      "usr.last_name as reporting_manager_lname",
      "branch.city as location",
      "user.status as status"
      ])
    .getRawMany();
    return data    
    }
  }catch(error){
    throw error
  }
};

const searchEmployeeByRole = async (roleid)=>{
  try{
        let data = await getConnection()
    .getRepository(Users)
    .createQueryBuilder("user")
    .leftJoin(Branches, "branch", "branch.id = user.branch_id")
    .leftJoin(roles, "roles", "roles.id = user.role_id")
    .leftJoin(Users, "usr", "usr.id = user.reporting_to")
    .leftJoin(Designations, "design", "design.id = user.designation")
    .where("user.role_id = :roleid and user.status = 1", {
        roleid: roleid 
      })
    .select([
      "user.id as user_id",
      "user.first_name as first_name",
      "user.last_name as last_name",
      "design.name as designation",
      "user.bg as blood_group",
      "roles.id as role_id",
      "roles.name as role_name",
      "user.user_type as emp__type",
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
      "branch.city as location"
      ])
    .getRawMany();
    return data
  }catch(error){
    throw error
  }
};

module.exports = { 
  fetchEmployeeList, 
  fetchEmployeeDetail, 
  loginEmployee, 
  searchEmployee,
  searchEmployeeByName,
  searchEmployeeByRole
};
