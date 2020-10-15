const express = require("express");
const router = express.Router();
const cors = require('cors');
const { verify } = require("../../lib/handler")
const multer = require("multer");
const { route } = require("../../controller");
const assetsItem = require("../../controller/operation/assetsItem");
const assets = require("../../controller/operation/assets");
const assetsRequests = require("../../controller/operation/assetsRequests");
const inventoryLeft = require("../../controller/operation/inventoryLeft");
const biometric = require("../../controller/operation/biometric");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split(".").pop();
        cb(null, Date.now() + "-" + file.fieldname + "." + extension)
    }
})

const upload = multer({
    storage: storage
})

const storage_biometric = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split(".").pop();
        cb(null, Date.now() + "-" + file.fieldname + "." + extension)
    }
})

const storage_biometric1 = multer({
    storage: storage_biometric
})

//////////////////////////////////////////////////////////////////////////////
var storage_xfile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var upload_ = multer({
    storage: storage_xfile,
    fileFilter: function (req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
})

// ********************************assets_item(add and view)**************************************/

// add assets item
router.post("/:user_id/additem",
    verify,
    upload.fields([{
        name: 'documents', maxCount: 60
    }, {
        name: 'invoice', maxCount: 60
    }, {
        name: "warranty", maxCount: 60
    }]),
    assetsItem.add_assets
);

// veiw assets item
router.get("/:user_id/viewassets", verify, assetsItem.view_assets);

//fetch_item
router.get("/:user_id/fetch_item", verify, assetsItem.fetch_item);

router.delete("/:user_id/item/:item_id/delete_item", verify, assetsItem.delete_assets_item)


// ********************************assets_item(assign_item_list)**************************************/
// fetch_employee_name
router.get("/:user_id/all_emp_name", verify, assets.fetch_emp)

// search_assets_by_emp_name
router.get("/:user_id/search_assets_by_emp_name/:name", verify, assets.search_assets_by_emp_name);

// assign item
router.post("/:user_id/assign_item_2", verify, assets.assign_item_2);

// fetch_all_item
router.get("/:user_id/all_items", verify, assets.all_items);
// fliter all_assignitem
router.get("/:user_id/filterall", verify, assets.filter_all);

// fliter allAssignItemByParam
router.get("/filterall/", verify, assets.filter_all);

// delete assign_item
router.delete("/:user_id/remove_assign_item/:id", verify, assets.remove_assign_item);

// search assign_item_location_wise
router.get("/:user_id/search_item_location/:branch_id", verify, assets.search_item_location);

// search assign_item_designation_wise
router.get("/:user_id/search_item_designation_wise/:designation", verify, assets.search_item_designation_wise);

// search assign_item_type_wise
router.get("/:user_id/search_item_type_wise/:item_type", verify, assets.search_item_type_wise);

// sort by last assign
router.get("/:user_id/sort_by_last_assign", verify, assets.sort_by_last_assign);


// filter by assetsItemList location_employeeType_Designation_itemType
router.get("/:user_id/fetchitemlist", verify, assets.location_emp_type_designation_item_type);
router.get("/:user_id/fetchitemlist1", verify, assets.get_assets_assigned_list);

//edit iteam  *****************
router.put("/:user_id/edit_item/:item_id/:asset_id/:flag",
    verify,
    upload.fields([{
        name: 'documents', maxCount: 1
    }, {
        name: 'invoice', maxCount: 1
    }, {
        name: "warranty", maxCount: 1
    }]),
    assetsItem.edit_asset_item);


// ********************************requested_assets_item(assign_item)**************************************/
// request_item
router.post("/:user_id/request_item", verify, assetsRequests.request_item);

// search requested item branch wise
router.get("/:user_id/requesteditembranchwise/:branch_id", verify, assetsRequests.search_requested_item_branch_wise);

// search requested item employee type wise
router.get("/:user_id/requesteditememptypewise/:user_type", verify, assetsRequests.search_requested_item_emp_type_wise);


// search requested item designation wise
router.get("/:user_id/requesteditemdesignationwise/:designation", verify, assetsRequests.search_requested_designation_wise);

// search requested item type wise
router.get("/:user_id/requesteditemtypewise/:item_type", verify, assetsRequests.search_requested_item_type_wise);

// search requested item latest date wise
router.get("/:user_id/requestedlatestdate", verify, assetsRequests.requested_by_latest_date);

// search requested branch_wise_&_employee_type_wise_&_designation_wise_&_item_type_wise
router.get("/:user_id/requesteditemlist", verify, assetsRequests.search_requested_branch_employee_designation_item_type);




// ********************************assets_check_inventory(assign_item)**************************************/

router.get("/:user_id/check_inventry_list2", inventoryLeft.check_inventry_list)

// check_inventory_all_by_name_model_version
router.get("/:user_id/leftitem", verify, inventoryLeft.all_stocks_in_inventory);

// delete_inventory_item
router.delete("/:user_id/remove_inventory_item/:id", verify, inventoryLeft.remove_inventory_item);

// search_stocks_in_inventory_item_branch_wise
router.get("/:user_id/leftitembranchwise/:branch_id", verify, inventoryLeft.search_stocks_in_inventory_item_branch_wise1);

// search_stocks_in_inventory_item_designation_wise
router.get("/:user_id/leftitemdesignationwise/:name", verify, inventoryLeft.search_stocks_in_inventory_item_designation_wise1);

// search_stocks_in_inventory_item_type_wise
router.get("/:user_id/leftitemitemtypewise/:item_type", verify, inventoryLeft.search_stocks_in_inventory_item_type_wise1);

// search_stocks_in_inventory_item_latest_date_wise
router.get("/:user_id/leftitemlatestdatewise", verify, inventoryLeft.search_stocks_in_inventory_item_latest_date_wise);

//search_stocks_ininventory_all_filter
router.get("/:user_id/fetchinventrylist", verify, inventoryLeft.location_emp_designation_item_type);

//item history
router.get("/:user_id/item_history/:item_id", verify, assetsItem.assets_history);



// ********************************BioMetric**************************************/

router.get("/:user_id/fetch_biometric_by_id/:biometric_id", verify, biometric.fetch_biomtric_by_id)

// upload_file
router.post("/:user_id/upload_biometric_data", verify,
    storage_biometric1.single('biometric_file'),
    biometric.upload_biometric_data);

// update_biometric_data
router.put("/:user_id/update_biometric_data/:biometric_id", verify, storage_biometric1.single('biometric_file'), biometric.update_biometric_data);

// remove_biometric_data
router.delete("/:user_id/remove_biometric_data/:biometric_id", verify, biometric.remove_biometric_data);

// search_bbiometric_all
router.get("/:user_id/search_biometric_all", verify, biometric.search_biometric_all);

// search_branch_wise
router.get("/:user_id/search_biometric_branch_wise/:branch_id", verify, biometric.search_biometric_branch_wise);

// search_month_wise
router.get("/:user_id/search_biometric_year_wise/:year", verify, biometric.search_biometric_year_wise);

// search_year_wise
router.get("/:user_id/search_biometric_month_wise/:month", verify, biometric.search_biometric_month_wise);
// sort_by_last_date
router.get("/:user_id/sort_by_last_date", verify, biometric.sort_by_last_date);

//upload excel file for attendence sheet

router.post("/:user_id/add_attendance/",
    verify,
    upload_.single('file'),
    biometric.upload_attendanceSheet);



module.exports = router;