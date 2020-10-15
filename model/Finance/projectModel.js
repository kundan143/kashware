const {getConnection} = require("typeorm");

const Projects = require("../../classModel/projectClass").Projects;

const projectList = async ()=>{
    try{
            let data = await getConnection()
            .getRepository(Projects)
            .createQueryBuilder("project")
            .where("status = 1")
            .select(["project.id as id", "project.title as title"])
            .getRawMany();

            return data;
    }catch(error){
        throw error
    }
}

module.exports = {
    projectList
}