var express = require("express");
const multer = require('multer')
const cron = require("node-cron")

const { verify } = require("../../lib/handler")

const email_model = require("../../lib/email")
const mail_cron = require("../../model/hr/mailCronModel")
const userlogger = require("../../controller/hr/user_logger")

cron.schedule("59 15 * * *", async ()=> { 
  let data = await mail_cron.checkAppointmentStatus("Data")

  if(data.length > 0){
    let mail_data = await email_model.mail_regard_appointment_to_hr("a", data)
  }
  console.log("cron trigged!")
}); 

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './upload')
    },
    filename: (req, file, cb)=>{
        const extension = file.originalname.split(".").pop();
        cb(null, Date.now()+"-"+file.fieldname+"."+extension)
    }
})

const upload = multer({
    storage: storage
})

const storage_resume = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, '/home/ubuntu/environment/intranet-backend-laravel/public/ResumeTemplates')
},
filename: (req, file, cb)=>{
    const extension = file.originalname.split(".").pop();
    if(extension == "docx"){
    cb(null, "ResumeTemplate"+"."+extension)
    }
}  
})

const upload_resume = multer({
  storage: storage_resume
})



var router = express.Router();

//*****************************holidays**********************************

const holidays = require("../../controller/hr/holidays");

router.get("/:user_id/holidays", verify, holidays.holidays_list)

router.post("/:user_id/setHolidays", verify, holidays.add_holidays)

router.delete("/:user_id/removeHolidays/:holiday_id", verify, holidays.remove_holidays)

router.put("/:user_id/updateHoliday/:holiday_id", verify, holidays.update_holiday)

router.get("/:user_id/location/:branch_id/incoming_holidays", verify, holidays.incoming_holidays)

//*****************************Employee**************************************

const employee = require("../../controller/hr/employee");
//const {add_employee} = require("../../controller/hr/employee")

router.put("/:user_id/update_user_appointment/:emp_id", verify, employee.update_user_appointment)

router.get("/:user_id/getEmployeeById/:empId", verify, employee.get_employee_by_id)

router.get("/:user_id/get_emp", verify, employee.search_employee_by_role_and_project)

// update employee
router.put(
    "/:user_id/update_employee/:e_id", 
    upload.fields([{
        name: 'adhaar', maxCount: 1
      }, {
        name: 'pancard', maxCount: 1
      },{
        name: "marksheet", maxCount: 1
      }]), 
    verify, 
    userlogger.user_logger,
    employee.update_employee)

// add employee
router.post(
    "/:user_id/addEmployee",
    upload.fields([{
        name: 'adhaar', maxCount: 1
      }, {
        name: 'pancard', maxCount: 1
      },{
        name: "marksheet", maxCount: 1
      }]), 
    verify, 
    employee.add_employee)

// add employee
router.post(
  "/:user_id/addEmployee2/:id",
  upload.fields([{
      name: 'adhaar', maxCount: 1
    }, {
      name: 'pancard', maxCount: 1
    },{
      name: "marksheet", maxCount: 1
    }]), 
  verify, 
  employee.add_employee2)

//router.post("/:user_id/ankit", add_employee)

// fetch employee list
router.get("/:user_id/employeelist", verify, employee.get_all_emp_list);

// search employee by name
router.get("/:user_id/searchemployee", verify, employee.search_employee_by_name)

// search employee branch location wise
router.get("/:user_id/branch/:branch_id/employees", verify, employee.get_all_emp_list_by_branch)

// search employee project vise
router.get("/:user_id/project/:project_id/employees", verify, employee.get_all_emp_list_by_project)

router.post(
    "/:user_id/emp/:emp_id/upload_resume",  
    verify, 
    upload.single('resume'),
    employee.upload_resume
    )

router.post(
  "/:user_id/upload_resumess",
  verify,
  upload_resume.single('resume'),
  employee.upload_resume2
)

router.post(
    "/:user_id/emp/:emp_id/upload_profile_pic", 
    verify, 
    upload.single("profilePicture"),
    employee.upload_profile_pic
    )

router.post(
    "/:user_id/emp/:emp_id/upload_kyc_docs",
    verify,
    upload.fields([{
        name: 'adhaar', maxCount: 1
      }, {
        name: 'pancard', maxCount: 1
      }]),
    employee.upload_kyc_docs
)

router.get("/:user_id/emp/:emp_id/get_resume", verify, employee.get_resume)

router.get("/:user_id/emp/:emp_id/get_profile_pic", verify, employee.get_profile_pic)

router.get("/:user_id/emp/:emp_id/getkycdocs", verify, employee.get_kyc_docs)

router.get("/:user_id/check_credentials/:type/:value", verify, employee.check_credentials)

router.get("/:user_id/location/:branch_id/pending_docs", verify, employee.check_kyc_docs_pending)

router.delete("/:user_id/delete_employee/:id/status/:status", verify, employee.delete_employee)

router.delete("/:user_id/employee/:emp_id", verify, employee.delete_docs)

router.get("/:user_id/location/:location/deleted_user", verify, employee.deleted_user)

router.post("/:user_id/update_password_hr_dashboard", verify, employee.reset_password)

router.get("/:user_id/appointment_letter_status", verify, employee.check_appointment_letter)

//*********************************announcement and notification**************************************/

const announcement = require("../../controller/hr/announcement")

router.post("/:user_id/add_announcement", verify, announcement.add_announcement)

router.post("/:user_id/add_notification", verify, announcement.add_notification)

router.get("/:user_id/get_notification/:type", verify, announcement.get_notification)

router.post("/:user_id/update_announcement", verify, announcement.approve_reject_announcement)

router.get("/:user_id/get_notification", verify, announcement.get_notification2)

router.delete("/:user_id/delete_announcement", verify, announcement.delete_announcement)


//**********************************attendance********************************************/

const attendance = require("../../controller/hr/attendance")

router.get("/:user_id/location/:location/emp_type/:emp_type/top_emp_biometric", verify, attendance.top_emp)

//***********************************timesheet*******************************************/

const timesheet = require("../../controller/hr/timesheet")

router.get("/:user_id/location/:location/emp_type/:emp_type/top_emp_timesheet", verify, timesheet.top_emp)

//************************************leaves*********************************************/

const leaves = require("../../controller/hr/leave")

router.get("/:user_id/location/:location/emp_type/:emp_type/top_emp_leave", verify, leaves.top_emp_leave)

router.get("/:user_id/location/:location/leave_status", verify, leaves.on_leave)

router.post("/:user_id/add_leave_quotas", verify, leaves.add_leave_quotas)

router.put("/:user_id/leave_quotas/:quotas_id/update", verify, leaves.edit_leave_quotas)

router.delete("/:user_id/leave_quotas/:quotas_id/delete",verify, leaves.delete_leave_quotas)

//router.post("/:user_id/test", leaves.add_annual_leave)

//*************************************designation*****************************************/

const design = require("../../controller/hr/designation")

router.post("/:user_id/add_design", verify, design.add_designation)

router.put("/:user_id/design/:design_id/update_design", verify, design.edit_designation)

router.delete("/:user_id/design/:design_id/delete_design", verify, design.delete_designation)
//**************************************generate report  ***********************************/

const generate_report = require("../../controller/hr/generateReport")

router.post("/:user_id/generate_report", verify, generate_report.generate_report)

//**************************************Technology experience***********************************/
const tech_exprnce = require("../../controller/hr/techExperience");
const announcementModel = require("../../model/hr/announcementModel");


router.get("/:user_id/techexptechwise", verify, tech_exprnce.tech_experience_tech_wise);

router.get("/:user_id/techexpbranchwise/:branch_id", verify, tech_exprnce.tech_experience_branch_wise);

router.get("/:user_id/techexpall", verify, tech_exprnce.tech_experience_all);

router.get("/:user_id/tech_list", verify, tech_exprnce.tech_list);

router.get("/:user_id/techcountbranchwise/:branch_id",verify, tech_exprnce.tech_experience_count_branch_wise)

router.get("/:user_id/techcountyear/:experience",verify, tech_exprnce.tech_experience_count_year_wise)

// router.get("/:user_id/tech", verify, tech_exprnce.tech_experience_filter);


module.exports = router;
 