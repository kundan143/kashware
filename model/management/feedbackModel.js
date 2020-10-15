const Feedback = require("../../classModel/feedbackClass").Feedback;
const Users = require("../../classModel/usersClass").Users;
const Projects = require("../../classModel/projectClass").Projects;
const Attendances = require("../../classModel/attendanceClass").Attendances;
const Worksheets = require("../../classModel/worksheetClass").Worksheets;
const { getConnection, getRepository } = require("typeorm");

const getFeedbackList = async function(clientData) {
  try {
    let data = await getConnection()
      .getRepository(Feedback)
      .createQueryBuilder("feedback")
      .leftJoin(Worksheets, "worksheet", "worksheet.id = feedback.worksheet_id")
      .leftJoin(Users, "user", "user.id = worksheet.user_id")
      .leftJoin(Users, "feedback_by", "feedback_by.id = feedback.feedback_by")
      .select([
        "feedback.title as feedbackTitle",
        "worksheet.title as worksheetTitle",
        "user.name as employeeName",
        "feedback_by.name as feedbackBy",
        "feedback.desc as feedback"
      ])
      .getRawMany();
    return data;
  } catch (error) {
    throw error;
  }
};

const giveFeedback = async function(clientData, clientData2) {
  try {
    console.log(clientData, clientData2);
    let data = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Feedback)
      .values([
        {
          worksheet_id: clientData2.worksheet_id,
          title: clientData2.title,
          desc: clientData2.desc,
          feedback_by: clientData.manager_id,
          rating: clientData2.rating,
          created_At: Date()
        }
      ])
      .execute();
    return data;
  } catch (error) {
    throw error;
  }
};

const getFeedbackByUserId = async function(clientData, clientData2) {
  try {
    console.log("getFeedbackByUserId");
    let data = await getConnection()
      .getRepository(Feedback)
      .createQueryBuilder("feedback")
      .leftJoin(Worksheets, "worksheet", "worksheet.id = feedback.worksheet_id")
      .leftJoin(Users, "user", "user.id = worksheet.user_id")
      .leftJoin(Users, "feedback_by", "feedback_by.id = feedback.feedback_by")
      .where("worksheet.user_id = :user_id", {
        user_id: clientData.employee_id
      })
      .select([
        "worksheet.user_id as employeeId",
        "user.name as employeeName",
        "feedback_by.name as feedbackBy",
        "feedback.title as feedbackTitle",
        "feedback.desc as feedback",
        "worksheet.title as worksheetTitle"
      ])
      .getRawMany();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = { getFeedbackList, giveFeedback, getFeedbackByUserId };
