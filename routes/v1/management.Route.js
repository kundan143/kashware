const express = require("express");
const router = express.Router();
var cors = require('cors')

const { verify } = require("../../lib/handler");

const worksheet = require("../../controller/management/worksheet");

const employee = require("../../controller/management/employee");

const feedback = require("../../controller/management/feedback");

const leaveApplication = require("../../controller/management/leave");

const attendance = require("../../controller/management/attendance");

const project = require("../../controller/management/project");

const holidays = require("../../controller/management/holidays");

///////////////////////////////////////////////////////////////

const hr = require("../../controller/management/hr");


// ********************************project**************************************/

// add project team
router.post("/:user_id/project/:project_id/addteam", verify, project.add_project_team)

// create project
router.post("/:user_id/addProject", verify, project.create_project);

// fetch project list
router.get("/:user_id/projects", verify, project.project_list);

// project team
router.get("/:user_id/projectTeam/project/:project_id", verify, project.team_all);


//*********************************Attendances**********************************/

// fetch manager current day attendance
router.get("/:user_id/getAttendance", verify, attendance.fetch_manager_attendance_current_day)

// add attendance
router.post("/addAttendance", verify, attendance.add_attendance);

// fetch attendance and hours of all employee of month
router.get(
  "/:user_id/attendance/month",
   verify,
  attendance.fetch_attendance_all_employee_by_month
);

// fetch attendance of individual employee by date
router.get(
  "/:user_id/employee/:employee_id/attendance",
   verify,
  attendance.fetch_attendance_by_userid_with_date
);

// fetch list of all employee attendance by day
router.get("/:user_id/attendance/day", 
 verify,
attendance.fetch_attendance_all_employee_by_day
);

// fetch attendances of individual employee by month
router.get("/:user_id/employee/:employee_id/attendances",
 verify,
attendance.fetch_attendance
);

//***************************************Leave********************************************

// get leave list
router.get("/:user_id/leave", verify, leaveApplication.leave_application_list);
//*************************************Feedback******************************************

// get feedback list
router.get("/:user_id/feedback", verify, feedback.get_feedback_list);

// give feedback to employee
router.post("/:user_id/employee/:employee_id/feedback", verify, feedback.give_feedback);

// get feedback by userid
router.get("/:user_id/employee/:employee_id", verify, feedback.get_feedback_by_userid);

//**********************************Employee*********************************************

// search employee by name
router.get("/:user_id/findemployee", verify, employee.search_employee_by_name)

// fetch employee list
router.get("/:user_id/employee", verify, employee.fetch_employee_list);

// fetch employee detail
router.get("/:user_id/employee/:employee_id", verify, employee.fetch_employee_detail);

// search employee branch location wise
router.get("/:user_id/branch/:branch_id", verify, employee.search_employee)

//*********************************Worksheet*********************************************

// fetch worksheet list
router.get("/:user_id/worksheets", verify, worksheet.fetch_all_worksheet);

// fetch worksheet by date and project id
router.get(
  "/:user_id/employee/:employee_id/worksheet",
   verify,
  worksheet.fetch_worksheet_by_date_and_project
);

// update data
router.put("/:user_id/worksheet/:worksheet_id", verify, worksheet.update_worksheet_data);

// fetch all worksheet by date
router.get("/:user_id/worksheet", verify, worksheet.fetch_all_worksheet_By_Date)

// fetch worksheet of employee by their designation
router.get("/:user_id/worksheets/:designation", verify, worksheet.list_of_worksheet_by_employee_type)


// *********************************************** holidays *******************************************

router.get("/:user_id/holidays", verify, holidays.holidays_list)

// *********************************************** Hr *************************************************

router.get("/hr_list",hr.hr_list)


module.exports = router;
