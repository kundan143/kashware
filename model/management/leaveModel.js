const Worksheet = require("../../classModel/worksheetClass").Worksheet;
const Approvals = require("../../classModel/worksheetClass").Approvals;
const Users = require("../../classModel/usersClass").Users;
const Roles = require("../../classModel/rolesClass").Roles;
const Projects = require("../../classModel/projectClass").Projects;
const Attendances = require("../../classModel/attendanceClass").Attendances;
const Leaves = require("../../classModel/leaveClass").Leaves;
const { getConnection, getRepository } = require("typeorm");

const leaveApplicationList = async function(clientData) {
  try {
    console.log("leaveApplicationList")
    let data = await getConnection()
      .getRepository(Leaves)
      .createQueryBuilder("leaves")
      .leftJoin(Users, "user", "user.id = leaves.user_id")
      .leftJoin(Roles, "role", "role.id = user.role_id")
      //.leftJoin(Approvals, "approval", "approval.id = leaves.approved_by")
      .select([
        "user.id as userId",
        "user.name as name",
        "leaves.reason as reason",
        "user.role_id as roleId",
        "role.name as roleName",
        "leaves.from as startDate",
        "leaves.to as endDate"
      ])
      .getRawMany();

    return data;
  } catch (error) {
    throw error;
  }
};

const leaveApproval = async (clientData)=>{
  try{
    return "data"
  }catch(error){
    throw error
  }
}

module.exports = { leaveApplicationList,  leaveApproval};
