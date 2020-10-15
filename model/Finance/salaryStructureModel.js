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

const deactivateSalaryStructureById = async (data_body)=>{
    try{
        const data = await getConnection()
        .createQueryBuilder()
        .update(SalaryStructures)
        .set({
            status: 0,
            updated_at: new Date()
        })
        .where("status = 1 and user_id = :ss_id",{ss_id: data_body.emp_id})
        .execute();
        return "data"
    }catch(error){
        throw error
    }
}

const saveSalaryStructure = async (data_body, data_param)=>{
    try{
        let deactivate_ss = await deactivateSalaryStructureById(data_param)
        
        let data = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(SalaryStructures)
        .values([{
            user_id: data_param.emp_id,
            earnings: JSON.stringify(data_body.earnings),
            employer_contribution: JSON.stringify(data_body.employer_contribution),
            deduction: JSON.stringify(data_body.deduction),
            ctc: data_body.ctc,
            month_total: data_body.net_per_month_in_hand,
            year_total: data_body.net_per_year_in_hand,
            status: "1",
            created_at: new Date()
        }])
        .execute();
        
        return data
    }catch(error){
        throw error
    }
}

const getSalaryStructreById = async (data_param)=>{
    try{
        
        let data = await getConnection()
        .getRepository(SalaryStructures)
        .createQueryBuilder("salarystructure")
        .leftJoin(Users, "user", "user.id = salarystructure.user_id")
        .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
        .leftJoin(roles, "role", "role.id = user.role_id")
        .where("salarystructure.status = 1 and user.status = 1 and salarystructure.user_id = :id",{
            id: data_param.emp_id
        })
        .select([
            "user.id as user_id",
            "user.first_name as first_name",
            "user.last_name as last_name",
            "brnch.location as location",
            "role.name as role_name",
            "salarystructure.ctc as emp_ctc",
            "salarystructure.earnings as earnings",
            "salarystructure.employer_contribution as employer_contribution",
            "salarystructure.deduction as deduction",
            "salarystructure.month_total as net_per_month_in_hand",
            "salarystructure.year_total as net_per_month_in_hand",
            "salarystructure.created_at as salary_structure_date"
        ])
        .getRawMany()
        
        return data
        
    }catch(error){
        throw error
    }
}

module.exports = {
    saveSalaryStructure,
    getSalaryStructreById
}