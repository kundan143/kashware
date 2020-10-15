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
const Worksheets = require("../../classModel/worksheetClass").Worksheets;
var fs = require('fs');

const timesheet_of_project = async (data_body)=>{
    try{
        let proj = ``
        for(i in data_body.projects){
            proj = proj + `${data_body.projects[i]},`
        }
        
        // let data = await getConnection()
        // .getRepository(Worksheets)
        // .createQueryBuilder("worksheet")
        // .leftJoin(Users, "user", "user.id = worksheet.user_id")
        // .leftJoin(Projects, "pro", "pro.id = worksheet.project_id")
        // .where(`
        // worksheet.status = 1 and worksheet.project_id in (${proj.slice(0, proj.length-1)})
        // `)
        // // .select([
        // //     'worksheet.id as timesheet_id',
        // //     'user.first_name as user_fname',
        // //     'user.last_name as user_lname',
        // //     'worksheet.project_id as project_id',
        // //     'pro.title as project_name',
        // //     'worksheet.hours_spend as work_hours'
        // //     ])
        // .select("SUM(worksheet.hours_spend)")
        // .groupBy("worksheet.user_id", "worksheet.project_id")
        // .getRawMany()
        
        let query1 = `select 
        wk.user_id, 
        wk.project_id, 
        sum(wk.hours_spend) as totalHours, 
        usr.first_name, 
        usr.last_name , 
        usr.emp_id as xelpId,
        pro.title as project_name,
        brnch.location as location
        from worksheets as wk
        inner join users as usr
        on usr.id = wk.user_id
        inner join projects as pro
        on pro.id = wk.project_id
        inner join branches as brnch
        on brnch.id  = usr.branch_id
        where wk.project_id in (${proj.slice(0, proj.length-1)})  and usr.status = 1
        and wk.date between "${data_body.date_from}" and "${data_body.date_to}"
        group by wk.user_id, wk.project_id;`
        
        let data_query = await getConnection()
        .query(query1)
        .catch(err_msg => {
          console.log(err_msg);
        });
        
        
        return data_query
    }catch(error){
        throw error
    }
}

const getProjectsName = async (data_body)=>{
    try{
        let proj = ``
        for(i in data_body.projects){
            proj = proj + `${data_body.projects[i]},`
        }
        
        let data = await getConnection()
        .getRepository(Projects)
        .createQueryBuilder("project")
        .where(`status = 1 and id in (${proj.slice(0, proj.length-1)})`)
        .select(["project.id as id", "project.title as title"])
        .getRawMany()
        
        let data_user = await getConnection()
        .getRepository(Worksheets)
        .createQueryBuilder("worksheet")
        .leftJoin(Users, "user", "user.id = worksheet.user_id")
        .where(`worksheet.status = 1 and user.status = 1 
        and worksheet.date between "${data_body.date_from}" and "${data_body.date_to}"
        and worksheet.project_id in (${proj.slice(0, proj.length-1)})`)
        .select("user_id")
        .distinct(true) 
        .getRawMany()
        
        return {"project_data": data, "project_user": data_user}
    }catch(error){
        throw error
    }
}



const writeGenerateFile = async (project_data, project_name, body_data)=>{
    try{
        let writeStream = fs.createWriteStream("project_report.xls");
        let date_gr = "Start Date"+"\t"+body_data.date_from+"\t"+"End Date"+"\t"+body_data.date_to+"\n\n\n";
        writeStream.write(date_gr);
        let header="xelpId"+"\t"+"firstname"+"\t"+"lastname"+"\t"+"location"+"\t"+"projects"+"\t";
        
        for (i in project_name.project_data){
            header +=  project_name.project_data[i].title +"\t"
        }
        header += "\n"
        writeStream.write(header);
        
        let project_data1 = project_data
        for (k in project_name.project_user){
            let c_flag = 0
            let userdetail
            for (i in project_data){
                if(project_name.project_user[k].user_id == project_data[i].user_id && c_flag == 0){
                c_flag = 1
                userdetail = project_data[i].xelpId+"\t"+project_data[i].first_name+"\t"+project_data[i].last_name+"\t"+project_data[i].location+"\t"+"total hours"+"\t";
                for (p in project_name.project_data){ 
                    let pro = " - "
                for (j in project_data1){
                    if(project_data[i].user_id == project_data1[j].user_id && project_name.project_data[p].title == project_data1[j].project_name){ 
                        pro = project_data1[j].totalHours
                    }
                }
                userdetail += pro + "\t"
            }
            }
            
        }
        userdetail += "\n";
        writeStream.write(userdetail)
        }
        
        writeStream.close();
        return project_data
    }catch(error){
        throw error
    }
}

const generateReport = async (data_body)=>{
    try{
        let timesheetofproject = await timesheet_of_project(data_body)
        let projectname = await getProjectsName(data_body)
        let wgr = await writeGenerateFile(timesheetofproject, projectname, data_body)
        
        return wgr
    }catch(error){
        throw error
    }
}

module.exports = {
    generateReport
}