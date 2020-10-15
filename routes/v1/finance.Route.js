var express = require("express");
var router = express.Router();
const multer = require("multer");
const {verify} = require("../../lib/handler");
const PayslipList = require("../../controller/Finance/payslip");
const EmployeeList = require("../../controller/Finance/employee");
const generateReport = require("../../controller/Finance/generateReport")
const payslipmodel =  require("../../model/Finance/payslipModel");
const cron = require("node-cron")

cron.schedule("0 0 1 * *", async ()=> { 
    let data = await payslipmodel.createMonthlyPayslips()
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
});


//************************* payslip_details *********************//

// fetch by all payslip
router.get("/:user_id/employee/:emp_id/paysliplist",PayslipList.fetchPayslip_list);

// upload payslip

router.post("/:user_id/uploadpayslip/:payslip_id", verify, upload.single('payslip'), PayslipList.upload_payslip)

//************************* fetch_employee_details *********************//

router.get("/:user_id/employee/:emp_id/emp_by_id",verify, EmployeeList.fetch_employee_Detail_by_id);

//****************************generate report******************************************/

router.post("/:user_id/generate_report", verify, generateReport.generate_report)

//****************************upload resume***********************************/

router.post("/:user_id/employee/:emp_id/upload_resume", 
    verify, 
    upload.single('resume'),
    EmployeeList.upload_resume_by_id)
    
//**********************************salary structure********************************************/   
const salarystructure = require("../../controller/Finance/salaryStructure")

router.post("/:user_id/employee/:emp_id/salary_structure", verify, salarystructure.save_salary_structure)

router.get("/:user_id/employee/:emp_id/get_salary_structure_by_id", verify, salarystructure.get_salary_structure_by_id)

module.exports = router;