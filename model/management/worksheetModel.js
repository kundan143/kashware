const Worksheets = require("../../classModel/worksheetClass").Worksheets;
const Users = require("../../classModel/usersClass").Users;
const Projects = require("../../classModel/projectClass").Projects;
const Attendances = require("../../classModel/attendanceClass").Attendances;
const Approvals = require("../../classModel/approvalsClass").Approvals;
const { getConnection, getRepository } = require("typeorm");

const updateWorksheetData = async function(clientData, clientData2) {
  try {
    console.log("updateWorksheetData");
    let data = await getConnection()
      .createQueryBuilder()
      .update(Worksheets)
      .set({
        title: clientData.title,
        desc: clientData.desc,
        date: clientData.date,
        hours_spend: clientData.hours_spend,
        task_type: clientData.task_type,
        stack: clientData.stack,
        priority: clientData.priority,
        status: clientData.status,
        updated_at: Date(), 
        project_id: clientData.project_id
      })
      .where("id = :id", {
        id: clientData2.worksheet_id
      })
      .execute();

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchDataByDateAndProject = async function(clientData, clientData2) {
  try {
    let data = await getRepository(Worksheets)
      .createQueryBuilder("worksheet")
      .leftJoin(Users, "user", "user.id = worksheet.user_id")
      .leftJoin(Projects, "project", "project.id = worksheet.project_id")
      .leftJoin(
        Attendances,
        "atd",
        "atd.user_id = worksheet.user_id AND atd.date = worksheet.date"
      )
      .where(
        "worksheet.project_id = :project_id AND worksheet.date = :date AND worksheet.user_id = :user_id AND worksheet.status =1",
        {
          user_id: clientData.employee_id,
          date: clientData2.date,
          project_id: clientData2.project_id
        }
      )
      .select([
        "worksheet.id as worksheet_id",
        "worksheet.title as worksheet_title",
        "project.title as projectTitle",
        "worksheet.hours_spend as hoursSpend"
      ])
      .getRawMany();

    if (data.length > 0) {
      return data;
    } else {
      return "Data is not found";
    }
  } catch (error) {
    throw error;
  }
};

const fetchAllWorksheet = async function(clientData) {
  try {
    console.log(clientData);
    let data = null
    if (!clientData.user_id){
      console.log("IF")
        data = await getConnection()
        .getRepository(Worksheets)
        .createQueryBuilder("worksheet")
        .leftJoin(Users, "user", "user.id = worksheet.user_id")
        .leftJoin(Projects, "project", "project.id = worksheet.project_id")
        //.leftJoin(Approvals, "appr", "")
        .leftJoin(
          Attendances,
          "atd",
          "atd.user_id = worksheet.user_id AND atd.date = worksheet.date"
        )
        .where(
          "worksheet.status = 1 "
        )
        .select([
          "user.name",
          "worksheet.id",
          "user.designation",
          "worksheet.title",
          "user.city"
        ]).addOrderBy("user.name")
        .getRawMany();
        }else{
          console.log("else")
            data = await getConnection()
        .getRepository(Worksheets)
        .createQueryBuilder("worksheet")
        .leftJoin(Users, "user", "user.id = worksheet.user_id")
        .leftJoin(Projects, "project", "project.id = worksheet.project_id")
        .leftJoin(
          Attendances,
          "atd",
          "atd.user_id = worksheet.user_id AND atd.date = worksheet.date"
        )
        .where(
          "worksheet.status = 1  and worksheet.user_id = :user_id",
          {user_id: clientData.user_id}
        )
        .select([
          "user.name",
          "user.designation"
        ])
        .getRawMany();
        }
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchAllWorksheetByDate = async function(clientData) {
  try {
    console.log("fetchAllWorksheetByDate");
        let  data = await getConnection()
        .getRepository(Worksheets)
        .createQueryBuilder("worksheet")
        .leftJoin(Users, "user", "user.id = worksheet.user_id")
        .leftJoin(Projects, "project", "project.id = worksheet.project_id")
        .leftJoin(
          Attendances,
          "atd",
          "atd.user_id = worksheet.user_id AND atd.date = worksheet.date"
        )
        .where(
          "worksheet.status = 1 AND worksheet.date = :date", {date: clientData.date}
        )
        .select([
          "user.name as employeeName",
          "user.designation as employeeDesignation",
          "worksheet.id as worksheetId",
          "worksheet.title as worksheetTitle",
          "worksheet.desc as worksheetDescription",
          "worksheet.hours_spend as worksheetHourSpend",
          "worksheet.date as worksheetDate",
          "worksheet.task_type as worksheetTaskType",
          "project.title as projectTitle",
          "atd.in_time as inTime",
          "atd.out_time as outTime"
        ])
        .getRawMany();
    return data;
  } catch (error) {
    throw error;
  }
};

const listOfWorksheetByEmployeeType = async function(clientData) {
  try {
  
    let data = await getRepository(Users)
      .createQueryBuilder("user")
      .where(
         "designation = :designation and status = 1",
        {
          designation: clientData.designation
        }
      )
      .select(["user.id", "user.name", "user.email", "user.designation"])
      .getMany();

    if (data.length > 0) {
      return data;
    } else {
      return "Data is not found";
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchDataByDateAndProject,
  updateWorksheetData,
  fetchAllWorksheet,
  fetchAllWorksheetByDate,
  listOfWorksheetByEmployeeType
};
