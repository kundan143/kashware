const { getConnection } = require("typeorm");
const Holidays = require("../../classModel/holidaysClass").Holidays;
const Branches = require("../../classModel/branchClass").Branches;

const holidaysList = async (clientData)=>{
    try{

        let data = await getConnection()
        .getRepository(Holidays)
        .createQueryBuilder("holidays")
        .leftJoin(Branches, "branch", "branch.id = holidays.branch_id")
        .where("holidays.status = 1 and holidays.holiday_date Like :year and holidays.branch_id = :branch_id", {
        year: "" + clientData.year + "%",
        branch_id: clientData.branch
        })
        .select([
            ])
        .getRawMany()  
        return data
        }
    catch(error){
        throw error
    }
}


module.exports = { holidaysList }