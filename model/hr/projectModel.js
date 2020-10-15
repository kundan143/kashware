const {getConnection,getRepository} = require("typeorm");
const Teams = require("../../classModel/teamClass").Teams;
var credentials = require("../../helper/credentials")
require('dotenv').config()

const assignDefaultProject = async (user_id, location_id)=>{
    try{

        if (user_id == null && location_id == null){
            return
        }
        
        let valuess = []
        let de_pro

        if(location_id.toString() == "1"){
            de_pro = credentials[process.env.NODE_ENV].DEFAULT_PROJECT_BANGALORE
            de_pro = de_pro.slice(1, de_pro.length-1).split(",")
        }

        if(location_id.toString() == "2"){
            de_pro = credentials[process.env.NODE_ENV].DEFAULT_PROJECT_KOLKATA
            de_pro = de_pro.slice(1, de_pro.length-1).split(",")
        }

        if(location_id.toString() == "3"){
            de_pro = credentials[process.env.NODE_ENV].DEFAULT_PROJECT_MUMBAI
            de_pro = de_pro.slice(1, de_pro.length-1).split(",")
        }
        if (de_pro == ''){
            return 
        }
        
        for (i in de_pro){
            valuess.push({
                user_id:user_id.toString(),
                project_id: de_pro[i],
                status:1,
                created_at:new Date()
            }) 
        }
        
        if (valuess.length > 0){
            let data1 = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Teams)
            .values(valuess)       
            .execute()
        }
            

        return "project Added!!"
    }catch(error){
        throw error
    }
}

module.exports = {
    assignDefaultProject
}