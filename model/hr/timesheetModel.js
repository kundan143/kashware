const {getConnection,getRepository} = require("typeorm");
const Users = require("../../classModel/usersClass").Users;

const topEmp = async (clientdata, clientdata1)=>{
    try{
        let query = `
        SELECT usr.first_name, usr.last_name, usr.emp_id as xelp_id, sum(hours_spend) as total_hours
        FROM worksheets as wk
        LEFT JOIN users as usr
        ON usr.id = wk.user_id
        WHERE usr.branch_id = ${clientdata.location} and date between "${clientdata1.startdate}"  and "${clientdata1.enddate}"
        GROUP BY xelp_id;
        `;

        let data = await getConnection()
        .query(query)
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