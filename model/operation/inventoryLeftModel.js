const {getConnection} = require("typeorm");
const Designations = require("../../classModel/designationClass").Designations;
const Assets = require("../../classModel/assetsClass").Assets;
const Users = require("../../classModel/usersClass").Users;
const Assetsitems = require("../../classModel/assetsItemsClass").AssetsItems;

const allStocksInInventory = async function(name){
    try {
        if(name['name'] == ''){
            // console.log("allStocksInInventory",clientData);
            let data = await getConnection()
            .getRepository(Assets)
            .createQueryBuilder("assets")
            .leftJoin(Users,"user","user.id = assets.user_id")
            .leftJoin(Designations,"dsgntn", "dsgntn.id = user.designation")
            .leftJoin(Assetsitems,"assetsitems","assetsitems.id = assets.product_id")
            .where("assetsitems.status = 1")
            .select([
                "assetsitems.id as product_id",
                "assetsitems.name as name",
                "assetsitems.item_type as type_of_item",
                "user.first_name as last_used_by",
                "dsgntn.name as Designation",
                "user.branch_id as Location",
                "assetsitems.usage_type as Usage_type",
                "assetsitems.created_at as Date_created",
                "assetsitems.purchase_date as Purchase_date",
                "assets.damage as damage",
                "assetsitems.expire_date as Expire_date"
            ])
            .getRawMany()
            return data;
        }else{
            // console.log("allStocksInInventory",clientData);
            let data = await getConnection()
            .getRepository(Assets)
            .createQueryBuilder("assets")
            .leftJoin(Users,"user","user.id = assets.user_id")
            .leftJoin(Designations,"dsgntn", "dsgntn.id = user.designation")
            .leftJoin(Assetsitems,"assetsitems","assetsitems.id = assets.product_id")
            .where("assetsitems.status = 1 and assetsitems.name Like :astname or assetsitems.version Like :astname or assetsitems.model Like :astname",{astname: "%" + name.name+"%"})
            .select([
                "assetsitems.id as product_id",
                "assetsitems.name as name",
                "assetsitems.item_type as type_of_item",
                "user.first_name as last_used_by",
                "dsgntn.name as Designation",
                "user.branch_id as Location",
                "assetsitems.usage_type as Usage_type",
                "assetsitems.created_at as Date_created",
                "assetsitems.purchase_date as Purchase_date",
                "assets.damage as damage",
                "assetsitems.expire_date as Expire_date"
            ]).getRawMany()
            return data;
        }
        
    } catch (error) {
        throw error;
    }
};

const removeInventoryItem = async (clientData)=>{
    try{
    //console.log(clientData)
    const data = await getConnection()
        .createQueryBuilder()
        .update(Assets)
        .set({
            status: 0,
            updated_at: new Date()
        })
        .where("id = :id",{id: clientData.id})
        .execute();
        return `Data Has been deleted of user_id = ${clientData.user_id}`;
    }catch(error){
        throw error
    }
}

const searchStocksInInventoryItemBranchWise1 = async function(clientData){
    try {
        let data = await getConnection()
        .getRepository(Assetsitems)
        .createQueryBuilder("assetsitems")
        .leftJoin(Assets,"assets","assets.product_id = assetsitems.id")
        .leftJoin(Users,"users","users.id=assets.user_id")
        .leftJoin(Designations,"dsgn","dsgn.id = users.designation")
        .where("assetsitems.status = 1 and assetsitems.branch_id =:branch_id",{branch_id:clientData.branch_id})
        .select([
            "assetsitems.id as product_id",
            "assetsitems.name as item_left",
            "assetsitems.item_type as type_of_item",
            "assetsitems.branch_id as Location",
            "dsgn.name as Designation",
            "assetsitems.usage_type as Usage_type",
            "assetsitems.created_at as Date_created",
            "assetsitems.purchase_date as Purchase_date",
            "assets.damage as damage",
            "assetsitems.expire_date as Expire_date"
        ])
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
};

const searchStocksInInventoryDesignationeWise1 = async function(clientData){
    try {
        let data = await getConnection()
        .getRepository(Assetsitems)
        .createQueryBuilder("assetsitems")
        .leftJoin(Assets,"assets","assets.product_id = assetsitems.id")
        .leftJoin(Users,"users","users.id=assets.user_id")
        .leftJoin(Designations,"dsgn","dsgn.id = users.designation")
        .where("assetsitems.status = 1 and  dsgn.name = :name",{name: clientData.name})
        .select([
            "assetsitems.id as product_id",
            "assetsitems.name as item_left",
            "assetsitems.item_type as type_of_item",
            "assetsitems.branch_id as Location",
            "dsgn.name as Designation",
            "assetsitems.usage_type as Usage_type",
            "assetsitems.created_at as Date_created",
            "assetsitems.purchase_date as Purchase_date",
            "assets.damage as damage",
            "assetsitems.expire_date as Expire_date"
        ])
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
}

const searchStocksInInventoryItemTypeWise1 = async function(clientData){
    try {
        let data = await getConnection()
        .getRepository(Assetsitems)
        .createQueryBuilder("assetsitems")
        .leftJoin(Assets,"assets","assets.product_id = assetsitems.id")
        .leftJoin(Users,"users","users.id=assets.user_id")
        .leftJoin(Designations,"dsgn","dsgn.id = users.designation")
        .where("assetsitems.status = 1 and  assetsitems.item_type = :item_type",{item_type: clientData.item_type})
        .select([
            "assetsitems.id as product_id",
            "assetsitems.name as item_left",
            "assetsitems.item_type as type_of_item",
            "assetsitems.branch_id as Location",
            "dsgn.name as Designation",
            "assetsitems.usage_type as Usage_type",
            "assetsitems.created_at as Date_created",
            "assetsitems.purchase_date as Purchase_date",
            "assets.damage as damage",
            "assetsitems.expire_date as Expire_date"
        ])
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
};

const searchStocksInInventoryBranchAndDesignationWise1 = async function(clientData){
    try {
        let data = await getConnection()
        .getRepository(Assetsitems)
        .createQueryBuilder("assetsitems")
        .leftJoin(Assets,"assets","assets.product_id = assetsitems.id")
        .leftJoin(Users,"users","users.id=assets.user_id")
        .leftJoin(Designations,"dsgn","dsgn.id = users.designation")
        .where("assetsitems.status = 1 and assetsitems.branch_id =:branch_id",{branch_id:clientData.branch_id})
        .andWhere("assetsitems.status = 1 and  dsgn.name = :name",{name: clientData.name})
        .select([
            "assetsitems.id as product_id",
            "assetsitems.name as item_left",
            "assetsitems.item_type as type_of_item",
            "assetsitems.branch_id as Location",
            "dsgn.name as Designation",
            "assetsitems.usage_type as Usage_type",
            "assetsitems.created_at as Date_created",
            "assetsitems.purchase_date as Purchase_date",
            "assets.damage as damage",
            "assetsitems.expire_date as Expire_date"
        ])
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
};

const searchStocksInInventoryDesignationAndItemTypeWise1 = async function(clientData){
    try {
        let data = await getConnection()
        .getRepository(Assetsitems)
        .createQueryBuilder("assetsitems")
        .leftJoin(Assets,"assets","assets.product_id = assetsitems.id")
        .leftJoin(Users,"users","users.id=assets.user_id")
        .leftJoin(Designations,"dsgn","dsgn.id = users.designation")
        .where("dsgn.name = :name",{name: clientData.name})
        .andWhere("assetsitems.status = 1 and assetsitems.item_type = :item_type",{item_type: clientData.item_type})
        .select([
            "assetsitems.id as product_id",
            "assetsitems.name as item_left",
            "assetsitems.item_type as type_of_item",
            "assetsitems.branch_id as Location",
            "dsgn.name as Designation",
            "assetsitems.usage_type as Usage_type",
            "assetsitems.created_at as Date_created",
            "assetsitems.purchase_date as Purchase_date",
            "assets.damage as damage",
            "assetsitems.expire_date as Expire_date"
        ])
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
};

const searchStocksInInventoryBranchIdAndItemTypeWise1 = async function(clientData){
    try {
        let data = await getConnection()
        .getRepository(Assetsitems)
        .createQueryBuilder("assetsitems")
        .leftJoin(Assets,"assets","assets.product_id = assetsitems.id")
        .leftJoin(Users,"users","users.id=assets.user_id")
        .leftJoin(Designations,"dsgn","dsgn.id = users.designation")
        .where("assetsitems.branch_id = :branch_id",{branch_id: clientData.branch_id})
        .andWhere("assetsitems.status = 1 and assetsitems.item_type = :item_type",{item_type: clientData.item_type})
        .select([
            "assetsitems.id as product_id",
            "assetsitems.name as item_left",
            "assetsitems.item_type as type_of_item",
            "assetsitems.branch_id as Location",
            "dsgn.name as Designation",
            "assetsitems.usage_type as Usage_type",
            "assetsitems.created_at as Date_created",
            "assetsitems.purchase_date as Purchase_date",
            "assets.damage as damage",
            "assetsitems.expire_date as Expire_date"
        ])
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
};

const searchStocksInInventoryBranchIdAndDesigantionAndItemTypeWise1 = async function(clientData){
    try {
        let data = await getConnection()
        .getRepository(Assetsitems)
        .createQueryBuilder("assetsitems")
        .leftJoin(Assets,"assets","assets.product_id = assetsitems.id")
        .leftJoin(Users,"users","users.id=assets.user_id")
        .leftJoin(Designations,"dsgn","dsgn.id = users.designation")
        .where("assetsitems.branch_id = :branch_id",{branch_id: clientData.branch_id})
        .andWhere("dsgn.name = :name",{name: clientData.name})
        .andWhere("assetsitems.status = 1 and assetsitems.item_type = :item_type",{item_type: clientData.item_type})
        .select([
            "assetsitems.id as product_id",
            "assetsitems.name as item_left",
            "assetsitems.item_type as type_of_item",
            "assetsitems.branch_id as Location",
            "dsgn.name as Designation",
            "assetsitems.usage_type as Usage_type",
            "assetsitems.created_at as Date_created",
            "assetsitems.purchase_date as Purchase_date",
            "assets.damage as damage",
            "assetsitems.expire_date as Expire_date"
        ])
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
};

const allStocksInInventory1 = async function(clientData){
    try {
        let data = await getConnection()
        .getRepository(Assetsitems)
        .createQueryBuilder("assetsitems")
        .leftJoin(Assets,"assets","assets.product_id = assetsitems.id")
        .leftJoin(Users,"users","users.id=assets.user_id")
        .leftJoin(Designations,"dsgn","dsgn.id = users.designation")
        .where("assetsitems.status = 1")
        .select([
            "assetsitems.id as product_id",
            "assetsitems.name as item_left",
            "assetsitems.item_type as type_of_item",
            "assetsitems.branch_id as Location",
            "dsgn.name as Designation",
            "assetsitems.usage_type as Usage_type",
            "assetsitems.created_at as Date_created",
            "assetsitems.purchase_date as Purchase_date",
            "assets.damage as damage",
            "assetsitems.expire_date as Expire_date"
        ])
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
};

const searchStocksInInventoryItemLatestDateWise = async function(clientData){
    try {
        let data = await getConnection()
        .getRepository(Assetsitems)
        .createQueryBuilder("assetsitems")
        .leftJoin(Assets,"assets","assets.product_id = assetsitems.id")
        .leftJoin(Users,"users","users.id=assets.user_id")
        .leftJoin(Designations,"dsgn","dsgn.id = users.designation")
        .where("assetsitems.status = 1")
        .select([
            "assetsitems.id as product_id",
            "assetsitems.name as item_left",
            "assetsitems.item_type as type_of_item",
            "assetsitems.branch_id as Location",
            "dsgn.name as Designation",
            "assetsitems.usage_type as Usage_type",
            "assetsitems.created_at as Date_created",
            "assetsitems.purchase_date as Purchase_date",
            "assets.damage as damage",
            "assetsitems.expire_date as Expire_date"
        ])
        .orderBy("assetsitems.created_at","DESC")
        .getRawMany()
        return data;
    } catch (error) {
        throw error;
    }
};

const checkInventryList2 = async (clientData2)=>{
    try{
        if (clientData2.location == ''){
            var location_ = ``
        }else{
            var location_ = `and ast.branch_id = '${clientData2.location}'`
        }
        if (clientData2.item_type == ''){
            var it_ = ``
        }else{
            var it_ = `and ast.item_type = '${clientData2.item_type}'`
        }
        if (clientData2.item_name == ''){
            var in_ = ``
        }else{
            let name12 = clientData2.item_name.split(" ")
            var in_ = `and ast.name like '${name12[0]}%'`
        }
        let query1 = `select ast.id as product_id, 
        ast.name as Item_left,
        ast.item_type as type_of_item, 
        ast.status as item_status, 
        ast.version, ast.model, brnch.location as Location,
        usr.first_name as first_name,
        usr.last_name as last_name,
        desf.name as designation,
        asset1.user_id
        from assets_items as ast
        left join (select max(id) as max_id ,product_id, user_id from assets group by product_id) as asset
        on asset.product_id = ast.id
        left join assets as asset1
        on asset1.id = asset.max_id
        left join users as usr
        on usr.id = asset1.user_id
        left join designations as desf
        on desf.id = usr.designation
        join branches as brnch
        on brnch.id = ast.branch_id
        where ast.status = 1
        and ast.id not in (select product_id from assets where status = 1)  
        ${location_} ${it_} ${in_}
        order by product_id desc;`;

        let data = await getConnection()
        .query(query1)
        .catch(err_msg => {
          console.log(err_msg);
        });
        return data
    }catch(error){
        throw error
    }
}

module.exports = {
    checkInventryList2,
    searchStocksInInventoryItemBranchWise1,
    searchStocksInInventoryDesignationeWise1,
    searchStocksInInventoryItemTypeWise1,
    searchStocksInInventoryBranchAndDesignationWise1,
    searchStocksInInventoryDesignationAndItemTypeWise1,
    searchStocksInInventoryBranchIdAndItemTypeWise1,
    searchStocksInInventoryBranchIdAndDesigantionAndItemTypeWise1,
    searchStocksInInventoryItemLatestDateWise,
    allStocksInInventory1,
    allStocksInInventory,
    removeInventoryItem,
}
