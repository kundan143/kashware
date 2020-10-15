const {getConnection} = require("typeorm");
const { CloudWatchLogs } = require("aws-sdk");
const Assets = require("../../classModel/assetsClass").Assets;
const Designations = require("../../classModel/designationClass").Designations;
const Users = require("../../classModel/usersClass").Users;
const AssetsItems = require("../../classModel/assetsItemsClass").AssetsItems;
const Branches = require("../../classModel/branchClass").Branches;
const Roles = require("../../classModel/rolesClass").Roles;

const viewAssetsPagination = async function(clientData, clientData2){
    try {
        
        if (clientData2.location == ''){
            var location_ = ``
        }else{
            var location_ = `and assetsItem.branch_id = '${clientData2.location}'`
        }
        if (clientData2.item_type == ''){
            var it_ = ``
        }else{
            var it_ = `and assetsItem.item_type = '${clientData2.item_type}'`
        }
        if (clientData2.usage_type == ''){
            var ut_ = ``
        }else{
            var ut_ = `and assetsItem.usage_type = '${clientData2.usage_type}'`
        }
        if (clientData2.item_name == ''){
            var in_ = ``
        }else{
            var in_ = `and assetsItem.name like '%${clientData2.item_name}%'`
        }
        let data = await getConnection()
        .getRepository(AssetsItems)
        .createQueryBuilder("assetsItem")
        .leftJoin(Branches,"brnch","brnch.id = assetsItem.branch_id")
        .where(`assetsItem.status = 1 
        ${location_} ${ut_} ${it_} ${in_}`)
        .select([
            "assetsItem.id as item_id",
            "brnch.location as location",
            "assetsItem.item_type as item_type",  
            "assetsItem.name as item_name",
            "assetsItem.model as model_number",
            "assetsItem.version as version",
            "assetsItem.purchase_date as purchase_date",
            "assetsItem.expire_date as Expire_date",
            "assetsItem.documents as documents",
            "assetsItem.usage_type as usage_item",
            "assetsItem.description as description"
        ])
        .getCount();

        let data1 = parseInt(data/10);
        if(data%10 > 0){
            data1 = data1 + 1
        }

        return data1;
    } catch (error) {
        throw error
    }
}

const fetchItemListPagination = async (clientData, clientData2)=>{
    try{
    let emp_name = ``
    if(clientData2.name != '' && clientData2.name != 'null'){
        emp_name = `and (user.first_name like '${clientData2.name}%' or user.last_name like '${clientData2.name}%')`
    }
    let location_ = ``
    if(clientData2.branch_id != '' && clientData2.branch_id != 'null'){
        location_ = `and user.branch_id = ${clientData2.branch_id}`
    }
    let item_type_ = ``
    if(clientData2.item_type != '' && clientData2.item_type != 'null'){
        item_type_ = `and assetsitem.item_type = '${clientData2.item_type}'`
    }
    let role_ = ``
    if(clientData2.user_type != '' && clientData2.user_type != 'null'){
        role_ = `and user.role_id = ${clientData2.user_type}`
    }

    let data = await getConnection()
    .getRepository(Assets)
    .createQueryBuilder("assets")
    .leftJoin(Users,"user","user.id = assets.user_id")
    .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
    .leftJoin(Designations,"dsgntn", "dsgntn.id = user.designation")
    .leftJoin(AssetsItems,"assetsitem","assetsitem.id = assets.product_id")
    .where(`assets.status = 1 and user.status = 1 and assetsitem.status = 1
    ${emp_name} ${location_} ${item_type_} ${role_}`)
    .select([
            "assets.id as id",
            "user.id as user_id",
            "user.first_name as first_name",
            "user.last_name as last_name",
            "dsgntn.name as Designation",
            "brnch.location as location",
            "assetsitem.name as itemsAssign",
            "assetsitem.item_type as typeofitem",
            "assets.created_at as assignDate",
            "assets.product_id as product_id",
            "assetsitem.description as damage"
    ])
    .getCount();


        let data1 = parseInt(data/10);
        if(data%10 > 0){
            data1 = data1 + 1
        }

        return data1;
}catch(error){
    throw error
}
}

module.exports = {
    viewAssetsPagination,
    fetchItemListPagination
}