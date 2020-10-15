const { getConnection } = require("typeorm");
const { Roles } = require("../../classModel/rolesClass");
const Holidays = require("../../classModel/holidaysClass").Holidays;
const Branches = require("../../classModel/branchClass").Branches;
const Users = require("../../classModel/usersClass").Users;


const addHolidays = async (clientData)=> {
    try{

        const check_days = await getConnection()
        .getRepository(Holidays)
        .createQueryBuilder("holi")
        .where("holi.status = 1 and holi.holiday_date = :date", {
            date: clientData.holiday_date
        })
        .select()
        .getMany()

        if (check_days.length > 0){
            return "1"
        }

        const data = await getConnection()
        .createQueryBuilder()
        .insert()
         .into(Holidays)
         .values([{
            title: clientData.title,
            //desc: clientData.description,
            holiday_date: clientData.holiday_date,
            branch_id: clientData.branch_id,
            flag: clientData.holiday_type,
            status: 1,
            created_at: Date()
        }])
        .execute();
        return data;
    }catch(error){
        throw error
    }
}

const removeHolidays = async (clientData)=>{
    try{
    //console.log(clientData)
    const data = await getConnection()
        .createQueryBuilder()
        .update(Holidays)
        .set({
            status: 0,
            updated_at: new Date()
        })
        .where("holiday_id = :id",{id: clientData.holiday_id})
        .execute();
       return data 
    }catch(error){
        throw error
    }
}

const updateHoliday = async (clientData1, clientData) => {
    try{
        
        const data = await getConnection()
        .createQueryBuilder()
        .update(Holidays)
        .set({
            title: clientData.title,
            desc: clientData.description,
            holiday_date: clientData.holiday_date,
            branch_id: clientData.branch_id,
            flag: clientData.holiday_type,
            updated_at: new Date()
        })
        .where("holiday_id=:holiday_id and status = 1",{holiday_id:clientData1.holiday_id})
        .execute();
        return data;
        
    }catch(error){
        throw error
    }
}

const locationList = async ()=>{
    try{
        const data = await getConnection()
        .getRepository(Branches)
        .createQueryBuilder("branches")
        .select(["branches.id", "branches.location", "branches.city"])
        .getMany()
        return data
    }catch(error){
        throw error;
    }
}

const empTypeList = async ()=>{
    try{
        let data = await getConnection()
        .getRepository(Roles)
        .createQueryBuilder("roles")
        .select(["roles.id", "roles.name"])
        .getMany()
        return data
    }catch(error){
        throw error
    }
}

const reporting_manager = async (clientData)=>{
    try{
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("usr")
        .leftJoin(Roles, "roles", "roles.id = usr.role_id")
        .where("usr.status = 1 and usr.role_id in (3,6) and usr.branch_id = :location", {
            location: clientData.location
        })
        .select([
            "usr.id as user_id",
            "usr.first_name as emp_fname",
            "usr.last_name as emp_lname", 
            "roles.id as role_id", 
            "roles.name as role_name", 
            "usr.emp_id as xelp_id"
        ])
        .getRawMany()

        return data
    }catch(error){
        throw error
    }
}

const incomingHolidays = async (clientdata, clientdata2)=>{
    try{
        let data = await getConnection()
        .getRepository(Holidays)
        .createQueryBuilder("holidays")
        .leftJoin(Branches, "branch", "branch.id = holidays.branch_id")
        .where("holidays.status = 1 and holidays.branch_id = :branch_id and holidays.holiday_date between :startdate and :enddate", {
        startdate: clientdata2.startdate,
        enddate: clientdata2.enddate,
        branch_id: clientdata.branch_id
        })
        .select([])
        .orderBy("holidays.holiday_date", "ASC")
        .getRawMany()  
        return data
    }catch(error){
        throw error
    }
}

module.exports = { 
    reporting_manager,
    addHolidays, 
    removeHolidays, 
    updateHoliday, 
    locationList,
    empTypeList, 
    incomingHolidays
}