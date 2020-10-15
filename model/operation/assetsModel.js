const {getConnection} = require("typeorm");
const Assets = require("../../classModel/assetsClass").Assets;
const Designations = require("../../classModel/designationClass").Designations;
const Users = require("../../classModel/usersClass").Users;
const Assetsitem = require("../../classModel/assetsItemsClass").AssetsItems;
const Branches = require("../../classModel/branchClass").Branches;
const Roles = require("../../classModel/rolesClass").Roles;



const fetchEmp = async function(clientData){
    // console.log(clientData);
    try {
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("usr")  
        .leftJoin(Branches, "brnch", "brnch.id = usr.branch_id")
        .leftJoin(Roles, "role", "role.id = usr.role_id")
        .where("usr.status = 1")
        .select([
            "usr.id as user_id",
            "usr.first_name as F_Name",
            "usr.last_name as L_name",
            "brnch.location as location",
            "role.name as role_name"
        ])
    .getRawMany()
    return data;
    } catch (error) {
        throw error;
    }
}

const allItems = async function(clientData){
    // console.log(clientData);
    try {
        let data = await getConnection()
        .getRepository(Assetsitem)
        .createQueryBuilder("astitem")  
        .select([
            "astitem.id as product_id",
            "astitem.name as Name",
            "astitem.version as Version",
            "astitem.model as Model"
        ])
    .getRawMany()
    return data;
    } catch (error) {
        throw error;
    }
}

const assignItem2 = async function(clientData, clientData2){
    try {
        let values = []
        for(var i=0; i<clientData2.product_id.length;i++){
            values.push(
                {
                    assign_by: clientData.user_id,
                    user_id : clientData2.user_id,
                    product_id : clientData2.product_id[i],
                    status:1,
                    created_at:new Date()
                }
            )
        }
        //console.log(values);
        let data = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Assets)
        .values(values)
        .execute()
        return data;
    } catch (error) {
        throw error;
    }
}


const filterAll = async function(clientData){
    try {
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Designations,"dsgntn", "dsgntn.id = user.designation")
        .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
        .where("user.status = 1 and assets.status = 1 and assetsitem.status = 1")
            .select([
                "assets.id as id",
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
        .orderBy("assets.created_at", "DESC")
        .getRawMany();
        return data;
    } catch (error) {
        throw error
    }
};

const removeAssignItem = async (clientData)=>{
    try{
    const data = await getConnection()
        .createQueryBuilder()
        .update(Assets)
        .set({
            status: 0,
            updated_at: new Date()
        })
        .where("id = :id",{id: clientData.id})
        .execute();
        return data;
    }catch(error){
        throw error
    }
}

const searchItemLocation = async function(clientData){
    try {   
            let data = await getConnection()
            .getRepository(Assets)
            .createQueryBuilder("assets")
            .leftJoin(Users,"user","user.id = assets.user_id")
            .leftJoin(Designations,"dsgntn", "dsgntn.id = user.designation")
            .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
            .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
            .where("user.status = 1 and assets.status = 1 and assetsitem.branch_id = :branch_id", {branch_id:clientData.branch_id})
            .select([
                    "assets.id as id",
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
            .orderBy("assets.created_at", "DESC")
            .getRawMany()
            return data;
        } 
        catch (error) {
        throw error
    }
}

const searchItemDesignationWise = async function(clientData){
    try {
            let data = await getConnection()
            .getRepository(Assets)
            .createQueryBuilder("assets")
            .leftJoin(Users,"user","user.id = assets.user_id")
            .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
            .leftJoin(Designations,"dsgntn", "dsgntn.id = user.designation")
            .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
            .where("assets.status = 1 and user.designation = :designation", {designation:clientData.designation})
            .select([
                    "assets.id as id",
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
            .orderBy("assets.created_at", "DESC")
            .getRawMany()
            return data;
    } catch (error) {
        throw error;
    }
}

const searchItemTypeWise = async function(clientData){
    try {
            //console.log("searchItemTypeWise",clientData);
            let data = await getConnection()
            .getRepository(Assets)
            .createQueryBuilder("assets")
            .leftJoin(Users,"user","user.id = assets.user_id")
            .leftJoin(Designations,"dsgntn", "dsgntn.id = user.designation")
            .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
            .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
            .where("assets.status = 1 and assetsitem.item_type = :item_type and assetsitem.status = 1 and user.status = 1", {item_type:clientData.item_type})
            .select([
                    "assets.id as id",
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
            .orderBy("assets.created_at", "DESC")
            .getRawMany()
            return data;
    } catch (error) {
        throw error;
    }
}

const sortByLastAssign = async function(clientData){
    try {
           // console.log("sortByLastAssign",clientData);
            let data = await getConnection()
            .getRepository(Assets)
            .createQueryBuilder("assets")
            .leftJoin(Users,"user","user.id = assets.user_id")
            .leftJoin(Designations,"dsgntn", "dsgntn.id = user.designation")
            .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
            .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
            .where("assets.status = 1 and user.status = 1 and assetsitem = 1")
            .select([
                    "assets.id as id",
                    "user.first_name as first_name",
                    "user.last_name as last_name",
                    "dsgntn.name as Designation",
                    "brnch.location as location",
                    "assetsitem.name as itemsAssign",
                    "assetsitem.item_type as typeofitem",
                    "assets.created_at as assignDate",
                    "assets.product_id as product_id",
                    "assetsitem.description as damage"
            ]).orderBy("assets.created_at","DESC")
            .getRawMany()
            return data;
    } catch (error) {
        throw error;
    }
}

const searchEmpTypeDesignationItemType = async function(clientData){
    try {
        //console.log("searchEmpTypeDesignationItemType",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
        .leftJoin(Designations, "design", "design.id = user.designation")
        .where("assets.status = 1 and user.branch_id = :branch_id", {branch_id:clientData.branch_id})
        .andWhere("assets.status = 1 and user.designation = :designation", {designation:clientData.designation})
        .andWhere("assets.status = 1 and assetsitem.item_type = :item_type", {item_type:clientData.item_type})
        .select([
                "assets.id as id",
                "user.first_name as first_name",
                "user.last_name as last_name",
                "design.name as Designation",
                "brnch.location as location",
                "assetsitem.name as itemsAssign",
                "assetsitem.item_type as typeofitem",
                "assets.created_at as assignDate",
                "assets.product_id as product_id",
                "assetsitem.description as damage"
        ])
        .orderBy("assets.created_at", "DESC")
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
}

const searchItemBranchAndDesignation = async function(clientData){
    try {
        //console.log("searchItemBranchAndDesignation",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
        .leftJoin(Designations, "design", "design.id = user.designation")
        .where("assets.status = 1 and user.branch_id = :branch_id", {branch_id:clientData.branch_id})
        .andWhere("assets.status = 1 and user.designation = :designation", {designation:clientData.designation})
        .select([
                "assets.id as id",
                "user.first_name as first_name",
                "user.last_name as last_name",
                "design.name as Designation",
                "brnch.location as location",
                "assetsitem.name as itemsAssign",
                "assetsitem.item_type as typeofitem",
                "assets.created_at as assignDate",
                "assets.product_id as product_id",
                "assetsitem.description as damage"
        ])
        .orderBy("assets.created_at", "DESC")
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
}

const searchItemDesignationAndItemType = async function(clientData){
    try {
        //console.log("searchItemDesignationAndItemType",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
        .leftJoin(Designations, "design", "design.id = user.designation")
        .Where("assets.status = 1 and user.designation = :designation", {designation:clientData.designation})
        .andWhere("assets.status = 1 and assetsitem.item_type = :item_type", {item_type:clientData.item_type})
        .select([
                "assets.id as id",
                "user.first_name as first_name",
                "user.last_name as last_name",
                "design.name as Designation",
                "brnch.location as location",
                "assetsitem.name as itemsAssign",
                "assetsitem.item_type as typeofitem",
                "assets.created_at as assignDate",
                "assets.product_id as product_id",
                "assetsitem.description as damage"
        ])
        .orderBy("assets.created_at", "DESC")
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
}

const searchItembranchAnditemType = async function(clientData){
    try {
        //console.log("searchItembranchAnditemType",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
        .leftJoin(Designations, "design", "design.id = user.designation")
        .where("assets.status = 1 and user.branch_id = :branch_id", {branch_id:clientData.branch_id})
        .andWhere("assets.status = 1 and assetsitem.item_type = :item_type", {item_type:clientData.item_type})
        .select([
                "assets.id as id",
                "user.first_name as first_name",
                "user.last_name as last_name",
                "design.name as Designation",
                "brnch.location as location",
                "assetsitem.name as itemsAssign",
                "assetsitem.item_type as typeofitem",
                "assets.created_at as assignDate",
                "assets.product_id as product_id",
                "assetsitem.description as damage"
        ])
        .orderBy("assets.created_at", "DESC")
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
};

const searchAssetsByEmpName = async function(name){
    try {
        if(name['name'] == ''){
            // console.log("searchItembranchAnditemType",clientData);
            let data = await getConnection()
            .getRepository(Assets)
            .createQueryBuilder("assets")
            .leftJoin(Users,"user","user.id = assets.user_id")
            .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
            .leftJoin(Designations,"dsgntn", "dsgntn.id = user.designation")
            .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
            .where("assets.status = 1")
            .select([
                    "assets.id as id",
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
            .orderBy("assets.created_at", "DESC")
            .getRawMany()
            return data;
        }else{
            let data = await getConnection()
            .getRepository(Assets)
            .createQueryBuilder("assets")
            .leftJoin(Users,"user","user.id = assets.user_id")
            .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
            .leftJoin(Designations, "design", "design.id = user.designation")
            .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
            .where("assets.status = 1 and user.first_name Like :name1 or user.last_name Like :name1",{
                name1: "%" +name.name + "%"})
            .select([
                        "assets.id as id",
                        "user.first_name as first_name",
                        "user.last_name as last_name",
                        "design.name as Designation",
                        "brnch.location as location",
                        "assetsitem.name as itemsAssign",
                        "assetsitem.item_type as typeofitem",
                        "assets.created_at as assignDate",
                        "assets.product_id as product_id",
                        "assetsitem.description as damage"
            ])
            .orderBy("assets.created_at", "DESC")
            .getRawMany()
            return data;
        }
    } catch (error) {
        throw error;
    }
}

const getAssignedItemList = async (clientData)=>{
    try{
        return "daata"
    }catch(error){
        throw error
    }
}

const fetchItemList = async (clientData, clientData2)=>{
    try{
        let offs = 0
        if(clientData2.page!='' && clientData2.page != 0){
            offs = (clientData2.page-1)*10
        }
        let emp_name = ``
        if(clientData2.name != '' && clientData2.name != 'null'){
            let name1 = clientData2.name.split(" ")
            emp_name = `and (user.first_name like '${name1[0]}%' or user.last_name like '${name1[0]}%')`
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
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.product_id")
        .where(`assets.status = 1 and user.status = 1 and assetsitem.status = 1
        ${emp_name} ${location_} ${item_type_} ${role_}`)
        //.andWhere(`user.role_id not in (1, 2, 5, 7, 8, 9, 10)`)
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
        .limit(10)
        .offset(offs)
        .orderBy("assets.id", "DESC")
        .getRawMany()

        return data;
    }catch(error){
        throw error
    }
}

const allUserForAssignItem = async (clientData)=>{
    try{
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("usr")
        .leftJoin(Roles, "roles", "roles.id = usr.role_id")
        .where("usr.status = 1 and usr.role_id in (3,6,4) and usr.branch_id = :location", {
            location: clientData.location
        })
        .select([
            "usr.id as user_id",
            "usr.first_name as emp_fname",
            "usr.last_name as emp_lname", 
            "roles.id as role_id", 
            "roles.name as role_name", 
            "usr.emp_id as xelp_id"
        ])
        .getRawMany()

        return data
    }catch(error){
        throw error
    }
}

module.exports={
    allUserForAssignItem,
    fetchItemList,
    getAssignedItemList,
    fetchEmp,
    allItems,
    assignItem2,
    filterAll,
    removeAssignItem,
    searchItemLocation,
    searchItemDesignationWise,
    searchItemTypeWise,
    sortByLastAssign,
    searchEmpTypeDesignationItemType,
    searchItemBranchAndDesignation,
    searchItemDesignationAndItemType,
    searchItembranchAnditemType,
    searchAssetsByEmpName
}