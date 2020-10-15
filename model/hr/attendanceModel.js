const {getConnection,getRepository} = require("typeorm");
const { compare } = require("bcrypt");
const Users = require("../../classModel/usersClass").Users;
const Attendances = require("../../classModel/attendanceClass").Attendances;

const topEmp = async (clientdata)=>{
    try{
        let query2 = `SELECT atd.xelp_id, SEC_TO_TIME( SUM(time_to_sec(atd.work_hrs))) As timeSum, usr.first_name, usr.last_name
        FROM intranet.attendances as atd
        LEFT JOIN intranet.users as usr
        ON usr.emp_id = atd.xelp_id 
        WHERE usr.branch_id = ${clientdata.params.location} and date between "${clientdata.query.startdate}"  and "${clientdata.query.enddate}"
        GROUP BY atd.xelp_id
        order by timesum desc limit 5;`;

        let data = await getConnection()
        .query(query2)
        .catch(err_msg => {
          console.log(err_msg);
        });

        return data
    }catch(error){
        throw error
    }
}

module.exports = {
    topEmp
}