const {getConnection} = require("typeorm");
const Techlabels = require("../../classModel/techLabelsClass").TechLabels;
const Techlabelusers = require("../../classModel/techLabelsusersClass").TechLabelUsers;
const Users = require("../../classModel/usersClass").Users;

const techExperienceTechWise = async(clientData)=>{
    try {
        console.log("techExperience", clientData);
        const data = await getConnection()
        .getRepository(Techlabelusers)
        .createQueryBuilder("techlabelusers")
        .leftJoin(Users,"user", "user.id = techlabelusers.user_id")
        .leftJoin(Techlabels,"techlabel","techlabel.id = techlabelusers.tech_label_id")
        .where("techlabel.name = :name",{name:clientData.name})
        .select([
            "user.first_name as fname",
            "user.last_name as lname",
            "techlabel.name as Language",
            "techlabelusers.experience as Total_Experience",
            "user.branch_id as location"
        ])
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
}
const techExperienceBranchWise = async(clientData, clientData2)=>{
    try {
        console.log("techExperience", clientData, clientData2);
        if (clientData2.skill == 'null' && clientData2.duration == 'null')
        {
            const data = await getConnection()
            .getRepository(Techlabelusers) 
            .createQueryBuilder("techlabelusers")
            .leftJoin(Users,"user", "user.id = techlabelusers.user_id")
            .leftJoin(Techlabels,"techlabel","techlabel.id = techlabelusers.tech_label_id")
            .where("user.branch_id = :branch_id",{branch_id: clientData.branch_id})
            .select([
                "user.first_name as fname",
                "user.last_name as lname",
                "techlabel.name as Language",
                "techlabelusers.experience as Total_Experience",
                "user.branch_id as location"
            ])
            .getRawMany()
            return data;
        }
        if (clientData2.skill != 'null' && clientData2.duration == 'null'){
            console.log("hey")
            const data = await getConnection()
            .getRepository(Techlabelusers) 
            .createQueryBuilder("tlu")
            .leftJoin(Users,"user", "user.id = tlu.user_id")
            .leftJoin(Techlabels,"techlabel","techlabel.id = tlu.tech_label_id")
            .where(
                `tlu.status = 1 and 
                user.branch_id = :branch_id and 
                techlabel.status = 1 and 
                techlabel.id = :techid`,
                {branch_id: clientData.branch_id, techid: clientData2.skill})
            .select([
                "user.first_name as fname",
                "user.last_name as lname",
                "techlabel.name as Language",
                "tlu.experience as Total_Experience",
                "user.branch_id as location"
            ])
            .getRawMany()
            return data;
        }
        if (clientData2.skill != 'null' && clientData2.duration != 'null'){
            console.log("hey")
            const data = await getConnection()
            .getRepository(Techlabelusers) 
            .createQueryBuilder("tlu")
            .leftJoin(Users,"user", "user.id = tlu.user_id")
            .leftJoin(Techlabels,"techlabel","techlabel.id = tlu.tech_label_id")
            .where(
                `tlu.status = 1 and 
                user.branch_id = :branch_id and 
                techlabel.status = 1 and 
                techlabel.id = :techid and
                tlu.experience >= :duration`,                
                {
                    branch_id: clientData.branch_id, 
                    techid: clientData2.skill,
                    duration: clientData2.duration
                })
            .select([
                "user.first_name as fname",
                "user.last_name as lname",
                "techlabel.name as Language",
                "tlu.experience as Total_Experience",
                "user.branch_id as location"
            ])
            .getRawMany()
            return data;
        }
        if (clientData2.skill == 'null' && clientData2.duration != 'null'){
            console.log("hey")
            const data = await getConnection()
            .getRepository(Techlabelusers) 
            .createQueryBuilder("tlu")
            .leftJoin(Users,"user", "user.id = tlu.user_id")
            .leftJoin(Techlabels,"techlabel","techlabel.id = tlu.tech_label_id")
            .where(
                `tlu.status = 1 and 
                user.branch_id = :branch_id and 
                techlabel.status = 1 and 
                tlu.experience >= :duration`,
                {branch_id: clientData.branch_id, duration: clientData2.duration})
            .select([
                "user.first_name as fname",
                "user.last_name as lname",
                "techlabel.name as Language",
                "tlu.experience as Total_Experience",
                "user.branch_id as location"
            ])
            .getRawMany()
            return data;
        }
    } catch (error) {
        throw error;
    }
} 
const techExperienceAll = async(clientData)=>{
    try {
        console.log("techExperience", clientData);
        const data = await getConnection()
        .getRepository(Techlabelusers)
        .createQueryBuilder("techlabelusers")
        .leftJoin(Users,"user", "user.id = techlabelusers.user_id")
        .leftJoin(Techlabels,"techlabel","techlabel.id = techlabelusers.tech_label_id")
        .select([
            "user.first_name as fname",
            "user.last_name as lname",
            "techlabel.name as Language",
            "techlabelusers.experience as Total_Experience",
            "user.branch_id as location"
        ])
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
}

const techList = async ()=>{
    try{
        const data = await getConnection()
        .getRepository(Techlabels)
        .createQueryBuilder("tl")
        .select(["tl.id","tl.name"])
        .getMany()

        return data
    }catch(error){
        throw error
    }
}
const techExperienceCountBranchWise = async (clientData)=>{
    try{
        let query2 = `SELECT  tl.name as name, tlu.tech_label_id as Tech_label_Id, count(tl.name) as value 
        FROM intranet.tech_label_users as tlu
        LEFT JOIN intranet.tech_labels as tl
        on tl.id = tlu.tech_label_id
        LEFT JOIN intranet.users as usr
        on usr.id = tlu.user_id
        where usr.branch_id= ${clientData.branch_id}
        group by Tech_label_Id;`;
        let data = await getConnection()
        .query(query2)
        .catch(err_msg => {
          console.log(err_msg);
        });

      
        // const data = await getConnection()
        // .getRepository(Techlabelusers)
        // .createQueryBuilder("tlu")
        // .leftJoin(Techlabels,"tl","tlu.tech_label_id = tl.id")
        // .leftJoin(Users,"user","user.id = tlu.user_id")
        // .where("user.branch_id = :branch_id",{branch_id: clientData.branch_id})
        // .select([
        //     "tl.name as Name",
        //     "tlu.tech_label_id as Tech_label_Id",
        //     "SUM(tl.name)", "tl.name"
        // ])
        // .groupBy("tlu.tech_label_id")
        // .getRawMany()
        return data;
    }catch(error){
        throw error
    }
}

const techExperienceCountCountWise = async (clientData)=>{
    try{
        let query2 = `SELECT  tl.name as Tech_Name, tlu.tech_label_id as Tech_label_Id, count(tl.name) as Employee_Count 
        FROM intranet.tech_label_users as tlu
        LEFT JOIN intranet.tech_labels as tl
        on tl.id = tlu.tech_label_id
        LEFT JOIN intranet.users as usr
        on usr.id = tlu.user_id
        where tlu.experience BETWEEN ${clientData.experience-1} AND ${clientData.experience}
        group by Tech_label_Id;`;
        let data = await getConnection()
        .query(query2)
        .catch(err_msg => {
          console.log(err_msg);
        });

        // const data = await getConnection()
        // .getRepository(Techlabelusers)
        // .createQueryBuilder("tlu")
        // .leftJoin(Techlabels,"tl","tlu.tech_label_id = tl.id")
        // .leftJoin(Users,"user","user.id = tlu.user_id")
        // .where("user.branch_id = :branch_id",{branch_id: clientData.branch_id})
        // .select([
        //     "tl.name as Name",
        //     "tlu.tech_label_id as Tech_label_Id",
        //     "SUM(tl.name)", "tl.name"
        // ])
        // .groupBy("tlu.tech_label_id")
        // .getRawMany()
        return data;
    }catch(error){
        throw error
    }
}
module.exports = {
    techExperienceTechWise,
    techExperienceBranchWise,
    techExperienceAll,
    techList,
    techExperienceCountBranchWise,
    techExperienceCountCountWise
}