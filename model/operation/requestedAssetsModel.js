const {getConnection} = require("typeorm");
const Assets = require("../../classModel/assetsClass").Assets;
const Users = require("../../classModel/usersClass").Users;
const Assetsitem = require("../../classModel/assetsItemsClass").AssetsItems;

const requestItem = async function(clientData){
    try {
        console.log(requestItem);
        let data = await getConnection()
        .createQueryBuilder()
        .insert()
        .into()
        .values([{
            branch_id: clientData.branch_id,
            item_type:clientData.item_type,
            product_name: clientData.product_name,
            created_at: new Date()
        }]).execute();
        return data;
    } catch (error) {
        throw error;
    }
}
const searchRequestedItemBranchWise = async function(clientData){
    try {   
        console.log("searchRequestedItemBranchWise",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .where("user.branch_id = :branch_id", {branch_id:clientData.branch_id})
        .select([
                    "assets.product_id as Requested_Item",
                    "user.first_name as Requested_By",
                    "user.designation as Designation",
                    "user.branch_id as Location",
                    "assets.created_at as Date",
                    "assets.reason as Reason",
                    "assetsitem.item_type as type_Of_Item",
                    "assets.status as Action"
        ])
        .getRawMany()
        return data;
    } 
    catch (error) {
    throw error
    }
}
const searchRequestedItemEmpTypeWise = async function(clientData){
    try {   
        console.log("searchRequestedItemEmpTypeWise",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .where("user.user_type = :user_type",{user_type: clientData.user_type})
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ])
        .getRawMany()
        return data;
    } 
    catch (error) {
    throw error
    }
}
const searchRequestedDesignationWise = async function(clientData){
    try {   
        console.log("searchRequestedDesignationWise",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .where("user.designation = :designation",{designation: clientData.designation})
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ])
        .getRawMany()
        return data;
    } 
    catch (error) {
    throw error
    }
}
const searchRequestedItemTypeWise = async function(clientData){
    try {   
        console.log("searchRequestedItemTypeWise",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .where("assetsitem.item_type = :item_type",{item_type: clientData.item_type})
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ])
        .getRawMany()
        return data;
    } 
    catch (error) {
    throw error
    }
}
const searchRequestedBranchAndUserTypeWise = async function(clientData){
    try {   
        console.log("searchRequestedBranchAndUserTypeWise",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .where("user.branch_id = :branch_id", {branch_id:clientData.branch_id})
        .andWhere("user.user_type = :user_type",{user_type: clientData.user_type})
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ])
        .getRawMany()
        return data;
    } 
    catch (error) {
    throw error
    }
}
const searchRequestedBranchAndDesignationWise = async function(clientData){
    try {   
        console.log("searchRequestedBranchAndDesignationWise",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .where("user.branch_id = :branch_id", {branch_id:clientData.branch_id})
        .andWhere("user.designation = :designation",{designation: clientData.designation})
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ])
        .getRawMany()
        return data;
    } 
    catch (error) {
    throw error
    }
}
const searchRequestedBranchAndItemTypeWise = async function(clientData){
    try {   
        console.log("searchRequestedBranchAndItemTypeWise",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .where("user.branch_id = :branch_id", {branch_id:clientData.branch_id})
        .andWhere("assetsitem.item_type = :item_type",{item_type: clientData.item_type})
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ])
        .getRawMany()
        return data;
    } 
    catch (error) {
    throw error
    }
}
const searchRequestedBranchAndUserTypeAndDesignationWise = async function(clientData){
    try {   
        console.log("searchRequestedBranchAndUserTypeAndDesignationWise",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .where("user.branch_id = :branch_id", {branch_id:clientData.branch_id})
        .andWhere("user.user_type = :user_type",{user_type: clientData.user_type})
        .andWhere("user.designation = :designation",{designation: clientData.designation})
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ])
        .getRawMany()
        return data;
    } 
    catch (error) {
    throw error
    }
}
const searchRequestedBranchAndUserTypeAndItemTypeWise = async function(clientData){
    try {   
        console.log("searchRequestedBranchAndUserTypeAndItemTypeWise",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .where("user.branch_id = :branch_id", {branch_id:clientData.branch_id})
        .andWhere("user.user_type = :user_type",{user_type: clientData.user_type})
        .andWhere("assetsitem.item_type = :item_type",{item_type: clientData.item_type})
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ])
        .getRawMany()
        return data;
    } 
    catch (error) {
    throw error
    }
}
const searchRequestedBranchAndUserTypeAndDesignationAndItemTypeWise = async function(clientData){
    try {   
        console.log("searchRequestedBranchAndUserTypeAndDesignationAndItemTypeWise",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .where("user.branch_id = :branch_id", {branch_id:clientData.branch_id})
        .andWhere("user.user_type = :user_type",{user_type: clientData.user_type})
        .andWhere("user.designation = :designation",{designation: clientData.designation})
        .andWhere("assetsitem.item_type = :item_type",{item_type: clientData.item_type})
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ])
        .getRawMany()
        return data;
    } 
    catch (error) {
    throw error
    }
}
const allRequestedItem = async function(clientData){
    try {   
        console.log("allRequestedItem",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ])
        .getRawMany()
        return data;
    }catch (error) {
    throw error
    }
}
const requestedByLatestDate = async function(clientData){
    try {   
        console.log("requestedByLatestDate",clientData);
        let data = await getConnection()
        .getRepository(Assets)
        .createQueryBuilder("assets")
        .leftJoin(Users,"user","user.id = assets.user_id")
        .leftJoin(Assetsitem,"assetsitem","assetsitem.id = assets.id")
        .select([
                "assets.product_id as Requested_Item",
                "user.first_name as Requested_By",
                "user.designation as Designation",
                "user.branch_id as Location",
                "assets.created_at as Date",
                "assets.reason as Reason",
                "assetsitem.item_type as type_Of_Item",
                "assets.status as Action"
        ]).orderBy("assets.created_at","DESC")
        .getRawMany()
        return data;
    }catch (error) {
    throw error
    }
}

 module.exports ={
    requestItem,
    searchRequestedItemBranchWise,
    searchRequestedItemEmpTypeWise,
    searchRequestedDesignationWise,
    searchRequestedItemTypeWise,
    searchRequestedBranchAndUserTypeWise,
    searchRequestedBranchAndDesignationWise,
    searchRequestedBranchAndItemTypeWise,
    searchRequestedBranchAndUserTypeAndDesignationWise,
    searchRequestedBranchAndUserTypeAndItemTypeWise,
    searchRequestedBranchAndUserTypeAndDesignationAndItemTypeWise,
    allRequestedItem,
    requestedByLatestDate
    
 }