const {getConnection,getRepository} = require("typeorm");
const Users = require("../../classModel/usersClass").Users;
const Leaves = require("../../classModel/leaveClass").Leaves;
const Roles = require("../../classModel/rolesClass").Roles;
const AnnualLeaves = require("../../classModel/annualLeavesClass").AnnualLeaves;
const LeaveQuotas = require("../../classModel/leaveQuotasClass").LeaveQuotas

const topEmpLeave = async(clientdata, clientdata2)=>{
    try{
        let query = `SELECT usr.first_name, usr.last_name, usr.id, lvs.from, lvs.to, lvs.days, lvs.leave_type
        FROM leaves as lvs
        LEFT JOIN users as usr
        ON usr.id = lvs.user_id
        where lvs.status = 1 and usr.status = 1 and lvs.is_approved = 1
        and usr.branch_id = ${clientdata.location} and ((lvs.from between "${clientdata2.startdate}" and "${clientdata2.enddate}") 
        or (lvs.to between "${clientdata2.startdate}" and "${clientdata2.enddate}") or (lvs.from <= '${clientdata2.startdate}' AND lvs.to >= '${clientdata2.enddate}'));`

        let leaveLeft = await getConnection()
        .query(query)
        .catch(err_msg => {
          console.log(err_msg);
        });

        var data1 = []
    
        for (var i in leaveLeft){ 
         from_ = leaveLeft[i].from.getTime()
         to_ = leaveLeft[i].to.getTime()
         start = new Date(clientdata2.startdate)
         end = new Date(clientdata2.enddate)

         if (start < from_ && end > to_){
          let timeDiff = Math.abs(from_ - to_);
         let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
         data1.push({
          "first_name":leaveLeft[i].first_name,
          "last_name": leaveLeft[i].last_name,
          "user_id": leaveLeft[i].id,
          "from": leaveLeft[i].from,
          "to": leaveLeft[i].to,
          "leave_type": leaveLeft[i].leave_type,
          "days": diffDays+1
        })
         } else if (start < from_ && end < to_){
           let timeDiff = Math.abs(from_ - end);
           let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
           data1.push({
            "first_name":leaveLeft[i].first_name,
            "last_name": leaveLeft[i].last_name,
            "user_id": leaveLeft[i].id,
            "from": leaveLeft[i].from,
            "to": leaveLeft[i].to,
            "leave_type": leaveLeft[i].leave_type,
            "days": diffDays+1
          })
         } else if (start > from_ && end < to_){
          let timeDiff = Math.abs(start - end);
          let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          data1.push({
            "first_name":leaveLeft[i].first_name,
            "last_name": leaveLeft[i].last_name,
            "user_id": leaveLeft[i].id,
            "from": leaveLeft[i].from,
            "to": leaveLeft[i].to,
            "leave_type": leaveLeft[i].leave_type,
            "days": diffDays+1
          })
        } else {
          let timeDiff = Math.abs( to_ - start);
          let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          data1.push({
            "first_name":leaveLeft[i].first_name,
            "last_name": leaveLeft[i].last_name,
            "user_id": leaveLeft[i].id,
            "from": leaveLeft[i].from,
            "to": leaveLeft[i].to,
            "leave_type": leaveLeft[i].leave_type,
            "days": diffDays
          })
        } 
      }

      const data2 = [{
        "first_name": "",
        "last_name": "",
        "user_id": "",
        "leave_type": "",
        "days": 0
    }]
      for (i in data1)
      {
        var k = 0
      for (j in data2){

          if (data1[i].user_id == data2[j].user_id && data1[i].leave_type == data2[j].leave_type){
            data2[j].days = data2[j].days + data1[i].days
            k=1
        }
          }
          if( k == 0){
            data2.push({
              "first_name": data1[i].first_name,
              "last_name": data1[i].last_name,
              "user_id": data1[i].user_id,
              "leave_type": data1[i].leave_type,
              "days": data1[i].days
          })
          }
        }
        return data2
    }catch(error){
        throw error
    }
}

const onLeave =  async (clientdata, clientdata2)=>{
  try{
    let data = await getConnection()
    .getRepository(Leaves)
    .createQueryBuilder("lvs")
    .leftJoin(Users, "usr", "usr.id = lvs.user_id")
    .leftJoin(Roles, "role", "role.id = usr.role_id")
    .where(`
    ((lvs.from BETWEEN '${clientdata2.startdate}' AND '${clientdata2.enddate}') OR 
      (lvs.to BETWEEN '${clientdata2.startdate}' AND '${clientdata2.enddate}') OR (lvs.from <= '${clientdata2.startdate}' AND lvs.to >= '${clientdata2.enddate}')) and 
    lvs.status = 1 and usr.status = 1 and lvs.is_approved = 1 and usr.branch_id = ${clientdata.location}`)
    .select([
      'lvs.id as id',
      'lvs.reason as reason',
      'lvs.leave_type as leave_type',
      'lvs.from as from_',
      'lvs.to as to_',
      'lvs.is_approved as is_approved',
      'lvs.days as days',
      'usr.id as user_id',
      'usr.first_name as first_name',
      'usr.last_name as last_name',
      'role.id as role_id',
      'role.name as role_name'
    ])
    .getRawMany()

    // let query1 = `select usr.id as id, 
    // usr.first_name as first_name, 
    // usr.last_name as last_name, 
    // usr.role_id as role_id,
    // lvs.reason as reason, 
    // lvs.leave_type as leave_type, 
    // lvs.from as from_, 
    // lvs.to as to_, 
    // usr.status, 
    // lvs.status,
    // role.id as role_id, 
    // role.name as role_name,
    // lvs.is_approved as is_approved,
    // from leaves as lvs 
    // join users as usr
    // on usr.id = lvs.user_id
    // join roles as role
    // on role.id = usr.role_id
    // WHERE "2020-09-05" BETWEEN `from` and `to`
    // and usr.status = 1 and lvs.status = 1 and lvs.is_approved = 1 and usr.branch_id = 1;`

    // let data = await getConnection()
    // .query(query1)
    // .catch(err_msg => {
    //   console.log(err_msg);
    // });

      return data
  }catch(error){
    throw error
  }
}

const addAnnualLeavesOnCreateUser = async (clientData, clientData2) => {
  try{
  if (clientData.role_id == '6'){
    var data111 = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(AnnualLeaves)
    .values([{
      user_id: clientData2.emp_id,
      days: "6.5",
      leave_type:"sick",
      year: clientData.joining_date.slice(0,4),
      is_approved: 1,
      status: 1,
      created_at: new Date()
    }])
    .execute()

    var data112 = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(AnnualLeaves)
    .values([{
      user_id: clientData2.emp_id,
      days: "6.5",
      leave_type:"casual",
      year: clientData.joining_date.slice(0,4),
      is_approved: 1,
      status: 1,
      created_at: new Date()
    }])
    .execute()

    var data113 = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(AnnualLeaves)
    .values([{
      user_id: clientData2.emp_id,
      days: "13",
      leave_type:"privilege",
      year: clientData.joining_date.slice(0,4),
      is_approved: 1,
      status: 1,
      created_at: new Date()
    }])
    .execute()
  }
  if(clientData.role_id == '4'){
   var data111 = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(AnnualLeaves)
    .values([{
      user_id: clientData2.emp_id,
      days: "0",
      leave_type:"sick",
      year: clientData.joining_date.slice(0,4),
      is_approved: 1,
      status: 1,
      created_at: new Date()
    }])
    .execute()

    var data112 = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(AnnualLeaves)
    .values([{
      user_id: clientData2.emp_id,
      days: "0",
      leave_type:"casual",
      year: clientData.joining_date.slice(0,4),
      is_approved: 1,
      status: 1,
      created_at: new Date()
    }])
    .execute()

    var data113 = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(AnnualLeaves)
    .values([{
      user_id: clientData2.emp_id,
      days: "6",
      leave_type:"privilege",
      year: clientData.joining_date.slice(0,4),
      is_approved: 1,
      status: 1,
      created_at: new Date()
    }])
    .execute()
  }
    return [data111, data112, data113]
  }catch(error){
    throw error
  }
}

const addLeaveQuotas = async (clientData) => {
  try{
    const checkdata = await getConnection()
    .getRepository(LeaveQuotas)
    .createQueryBuilder("lq")
    .where(`status = 1 and 
    leave_type = :leave_type and 
    year = :year and
    emp_type = :emp_type`,
    {
      year: clientData.year,
      leave_type: clientData.leave_type,
      emp_type: clientData.emp_type
    }  
    )
    .select()
    .getMany()

    if (checkdata.length > 0){
      return ["1", checkdata]
    }

    let data = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(LeaveQuotas)
    .values([{
      days: clientData.days,
      leave_type: clientData.leave_type,
      emp_type: clientData.emp_type,
      year: clientData.year,
      branch_id: clientData.location,
      status: 1,
      created_at: new Date()
    }])
    .execute()
    return data
  }catch(error){
    throw error
  }
}

const editLeaveQuotas = async (clientData2, clientData)=>{
  try{
    const checkdata = await getConnection()
    .getRepository(LeaveQuotas)
    .createQueryBuilder("lq")
    .where(`status = 1 and 
    leave_type = :leave_type and 
    year = :year and
    emp_type = :emp_type`,
    {
      year: clientData.year,
      leave_type: clientData.leave_type,
      emp_type: clientData.emp_type
    }  
    )
    .select()
    .getOne()

    //console.log(checkdata['id'] == clientData2.quotas_id, checkdata.length > 0, checkdata == {})

    if (checkdata.length != {} && checkdata['id'] != clientData2.quotas_id){
      return ["1", checkdata]
    }

    let data = await getConnection()
    .createQueryBuilder()
    .update(LeaveQuotas)
    .set({
      days: clientData.days,
      leave_type: clientData.leave_type,
      emp_type: clientData.emp_type,
      year: clientData.year,
      branch_id: clientData.location,
      updated_at: new Date()
    })
    .where("status = 1 and id = :id",{id: clientData2.quotas_id})
    .execute()

    return data
  }catch(error){
    throw error
  }
}

const deleteLeaveQuotas = async (clientdata)=>{
  try{
    let data = await getConnection()
    .createQueryBuilder()
    .update(LeaveQuotas)
    .set({
      status: 0,
      updated_at: new Date()
    })
    .where("status = 1 and id = :id",{id: clientData2.quotas_id})
    .execute()

    return data
  }catch(error){
    throw error
  }
}


module.exports = {
    topEmpLeave,
    onLeave,
    addAnnualLeavesOnCreateUser,
    addLeaveQuotas,
    editLeaveQuotas,
    deleteLeaveQuotas
}