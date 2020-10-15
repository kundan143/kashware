var express = require("express");
const multer = require('multer');

var router = express.Router();

const holidays = require("../../controller/hr/holidays");
const design = require("../../controller/hr/designation")
const assets = require("../../controller/operation/assetsItem");
const project = require("../../controller/Finance/projects");
const emplist = require("../../controller/Finance/employee");
const allemp_operation = require("../../controller/operation/assets")

router.get("/location", holidays.location)

router.get("/emptype", holidays.emp_type_list)

router.get("/reporting_manager", holidays.reporting_manager_list)

router.get("/all_emp_operation", allemp_operation.all_user_for_assign_item)

router.get("/v1/designation", design.get_list_designation)

router.get("/v1/assets_list/location/:location", assets.assets_item_list)

router.get("/v1/project_list", project.project_list)

router.get("/v1/emp_list/branch/:branch_id", emplist.emp_list)

let pro_t = require("../../model/hr/projectModel")

// router.get("/test_1", async (req, res)=>{
//     let data = await pro_t.assignDefaultProject("21", 2)
//     return res.send(data)
// })

module.exports = router;