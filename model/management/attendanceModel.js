const Worksheets = require("../../classModel/worksheetClass").Worksheets;
const Users = require("../../classModel/usersClass").Users;
const Projects = require("../../classModel/projectClass").Projects;
const Attendances = require("../../classModel/attendanceClass").Attendances;
const Leaves = require("../../classModel/leaveClass").Leaves;
const { getConnection } = require("typeorm");

const fetchAttendance = async function(clientData, clientData1) {
  try {
    
    let mnth = parseInt(clientData1.month) + 01;
    let startDate = `${clientData1.year}-${clientData1.month}-01`;
    let endDate = null
    if (clientData1.month == 12){
       endDate = `${clientData1.year}-12-31`;
    }else{
      endDate = `${clientData1.year}-0${mnth}-01`;
    }
    let query1 = `SELECT usr.id as userId, usr.email, atd.in_time as inTime, atd.out_time as outTime 
    FROM intranet.attendances as atd LEFT JOIN intranet.users as usr 
    ON usr.id = atd.user_id 
    where usr.id = "${clientData.employee_id}" 
    and in_time between "${startDate}" and "${endDate}"  
     ORDER BY atd.in_time`;


    let data = await getConnection()
      .query(query1)
      .catch(err_msg => {
        console.log(err_msg);
      });


    for (var i in data) {
      let dif = data[i]["inTime"] - data[i]["outTime"];

      let minutes = Math.abs(dif / 60000 / 60);
      data[i]["totalHours"] = minutes;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchAttendanceAllEmployeeByDay = async function(
  clientData,
  clientData1
) {
  try {
    console.log(clientData, clientData1);
    console.log(typeof clientData1.date);
    let data = await getConnection()
      .getRepository(Attendances)
      .createQueryBuilder("atd")
      .leftJoin(Users, "usr", "usr.id = atd.user_id")
      .where("atd.in_time = :in_time", { in_time: clientData1.date })
      .select([
        "usr.id as userId",
        "usr.name as username",
        "atd.in_time",
        "atd.out_time"
      ])
      .getRawMany();
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchAttendanceByUserIdWithDate = async function(
  clientData,
  clientData1
) {
  try {
    
    console.log(clientData1.date);

    let data = await getConnection()
      .getRepository(Attendances)
      .createQueryBuilder("atd")
      .where("atd.in_time Like :in_time", {
        in_time: "%" + clientData1.date + "%"
      })
      .select()
      .getOne();
    console.log(data);

    let dif = data.out_time - data.in_time;

    console.log(Math.abs(new Date(data.out_time) - new Date(data.in_time)));
    var minutes = Math.abs(dif / 60000 / 60);

    return { data: data, difference: minutes };
  } catch (error) {
    throw error;
  }
};

const fetchAttendanceAllEmployeeByMonth = async (
  clientData,
  clientData1,
  clientData2
) => {
  console.log(clientData, clientData1)
  try {
    let date1 = clientData1.year + "-" + clientData1.month;

    let data = await getConnection()
      .getRepository(Attendances)
      .createQueryBuilder("atd")
      .leftJoin(Users, "usr", "usr.id = atd.user_id")
      .where("atd.in_time Like :in_time", {
        in_time: "%" + date1 + "%"
      })
      .select([
        "atd.id as id",
        "atd.user_id as userId",
        "usr.name as name",
        "usr.email as email",
        "atd.in_time as inTime",
        "atd.out_time as outTime"
      ])
      .getRawMany();

    for (var i in data) {
      let dif = data[i]["inTime"] - data[i]["outTime"];
      console.log(dif);

      let minutes = Math.abs(dif / 60000 / 60);
      console.log(minutes);
      data[i]["totalHours"] = minutes;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const addAttendance = async (clientData)=>{
  try{
      const data = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Attendances)
        .values([
            {
                user_id:69,
                date: new Date(),
                in_time:  "2020-04-21 00:00:00",
                out_time:  "2020-04-21 05:30:00",
                status: 1,
                created_at:new Date(),
            }
        ])
        .execute();
        return data;
  }catch(error){
    throw error
  }
};

const fetchManagerAttendanceCurrentDay = async (clientData, clientData1)=>{
  try{
       console.log(clientData1.date.slice(0, 7), clientData.manager_id);
       
       let date = clientData1.date.slice(0, 7);
       
    let leaveLeft = await getConnection()
      .getRepository(Leaves)
      .createQueryBuilder("leave")
      .where(
        "leave.user_id = 2 and leave.is_approved = 1 and (leave.from Like :from or leave.to Like :to)", 
        {
          userId: clientData.manager_id,
          from: "%" + date + "%",
          to: "%" + date + "%"
        }
        )
      .select(["leave.id", "leave.from", "leave.to"])
      .getMany();
      
  //  console.log(leaveLeft)  
    var leave_left = 0
    
    for (var i in leaveLeft){
      if(leaveLeft[i].to.slice(0,7) == leaveLeft[i].from.slice(0,7) && parseInt(leaveLeft[i].to.slice(8,10)) >= parseInt(leaveLeft[i].from.slice(8,10))){
        leave_left +=  Math.abs(parseInt(leaveLeft[i].to.slice(8,10)) - parseInt(leaveLeft[i].from.slice(8,10)))
      }else if (leaveLeft[i].from.slice(0, 4) ==  leaveLeft[i].from.slice(0, 4)){
        if ( parseInt(leaveLeft[i].to.slice(5,7)) == date.slice(5,7) && parseInt(leaveLeft[i].to.slice(5,7)) >= parseInt(leaveLeft[i].from.slice(5,7))){
          console.log("this")
        leave_left += parseInt(leaveLeft[i].to.slice(8,10)) - 0
        }
        if ( parseInt(leaveLeft[i].from.slice(5,7)) == date.slice(5,7) && parseInt(leaveLeft[i].to.slice(5,7)) <= parseInt(leaveLeft[i].from.slice(5,7))){
        leave_left += 30 - parseInt(leaveLeft[i].from.slice(8,10))
        }
        if ( parseInt(leaveLeft[i].to.slice(5,7)) == date.slice(5,7) && parseInt(leaveLeft[i].to.slice(5,7)) <= parseInt(leaveLeft[i].from.slice(5,7))){
          console.log("this")
        leave_left += parseInt(leaveLeft[i].to.slice(8,10)) - 0
        }
        if ( parseInt(leaveLeft[i].from.slice(5,7)) == date.slice(5,7) && parseInt(leaveLeft[i].to.slice(5,7)) >= parseInt(leaveLeft[i].from.slice(5,7))){
        leave_left += 30 - parseInt(leaveLeft[i].from.slice(8,10))
        }
      }else if (leaveLeft[i].from.slice(0, 4) !==  leaveLeft[i].from.slice(0, 4)){
        console.log("niuvhdiru")
        if (parseInt(leaveLeft[i].from.slice(5,7)) == date.slice(5,7) &&  parseInt(leaveLeft[i].to.slice(5,7)) <= parseInt(leaveLeft[i].from.slice(5,7))){
        leave_left += parseInt(leaveLeft[i].to.slice(8,10)) - 0
        }
        if (parseInt(leaveLeft[i].from.slice(5,7)) == date.slice(5,7) &&  parseInt(leaveLeft[i].to.slice(5,7)) >= parseInt(leaveLeft[i].from.slice(5,7))){
        leave_left += 30 - parseInt(leaveLeft[i].from.slice(8,10))
        }
      }
    }
    

    let data = await getConnection()
      .getRepository(Attendances)
      .createQueryBuilder("atd")
      .where("atd.in_time Like :in_time and atd.user_id = :userId", {
        in_time: "%" + clientData1.date + "%", 
        userId: clientData.manager_id
      })
      .select([
        "atd.in_time",
        "atd.out_time"
        ])
      .getOne();
    //console.log(data);

    let dif = data.out_time - data.in_time;

    //console.log(Math.abs(new Date(data.out_time) - new Date(data.in_time)));
    var minutes = Math.abs(dif / 60000 / 60);

    return { attendance: data, tookLeave: leave_left, HoursSpend: minutes };
    //return "data"
  }catch(error){
    throw error
  }
}
 
module.exports = {
  fetchManagerAttendanceCurrentDay,
  fetchAttendance,
  fetchAttendanceAllEmployeeByDay,
  fetchAttendanceByUserIdWithDate,
  fetchAttendanceAllEmployeeByMonth,
  addAttendance
};
