const Worksheets = require("../../classModel/worksheetClass").Worksheets;
const Users = require("../../classModel/usersClass").Users;
const Projects = require("../../classModel/projectClass").Projects;
const Attendances = require("../../classModel/attendanceClass").Attendances;
const Teams = require("../../classModel/teamClass").Teams;

const { getConnection } = require("typeorm");

const createProject = async function(clientData){
    try{
        console.log(clientData)
        let data = await getConnection()
         .createQueryBuilder()
         .insert()
         .into(Projects)
         .values([{
            title: clientData.name,
            product_manager_id: clientData.project_manager,
            repo_url: clientData.repo_url,
            dev_url: clientData.deployment_url,
            url: clientData.production_url,
            delivered_on: clientData.delivery_date,
            desc: clientData.description,
            wip: 1,
            status: 1,
            created_at:Date()
         }])
         .execute();
        return data;
        
    }catch(error){
        throw error;
    }
};

const projectList = async ()=>{
    try{
        let data = await getConnection()
        .getRepository(Projects)
        .createQueryBuilder("project")
        .leftJoin(Users, "user", "user.id = project.product_manager_id")
        .select([
            "project.id as projectId",
            "project.title as projectName",
            "user.name as projectManager",
            "project.desc as description"
            ])
        .orderBy("project.id")
        .getRawMany();
        
        return data;
    }catch(error){
        throw error;
    }
};

const team = async (clientData)=>{
    try{
        console.log(clientData)
        
        let data = await getConnection()
            .getRepository(Teams)
            .createQueryBuilder("team")
            .leftJoin(Users, "user", "user.id = team.user_id")
            .where("team.project_id = :projectId",{projectId:clientData.project_id})
            .select(["user.id as empId", "user.name as empName", "team.project_id as projectId"])
            .getRawMany()
        return data;
    }catch(error){
        throw error;
    }
}

const addProjectTeam = async (clientData, clientData1)=>{
    try{
        
        for( let i in clientData.emp)
        {
            console.log(clientData.emp[i])
        
        let data = await getConnection()
         .createQueryBuilder()
         .insert()
         .into(Teams)
         .values([{
            user_id: clientData.emp[i],
            project_id: clientData1.project_id,
            tech_label_id: 4,
            status: 1,
            created_at:Date()
         }])
         .execute();
         console.log(data)
        }

        
        return "Team added!";
    }catch(error){
        throw error
        
    }
}

module.exports = { createProject, projectList, team, addProjectTeam }