// const assetsItem = require("../../classModel/assetsItemsClass").AssetsItems;
const { getConnection } = require("typeorm");
const Designations = require("../../classModel/designationClass").Designations;
const Assets = require("../../classModel/assetsClass").Assets;
const Users = require("../../classModel/usersClass").Users;
const AssetsItems = require("../../classModel/assetsItemsClass").AssetsItems;
const Branches = require("../../classModel/branchClass").Branches;
const moment = require("moment")


const addAssets = async function (clientData, clientData2, clientData3) {
    try {
        let asset_arr = JSON.parse(clientData2.items)

        let asset_list = []
        let j = 0
        let k = 0
        let l = 0
        let fileName = ""
        let invoiceFile = ""
        let warrantyFile = ""

        for (i in asset_arr) {
            if (asset_arr[i].documents != "") {
                fileName = clientData3['documents'][j].filename
                j++
            } else {
                fileName = null
            }

            if (asset_arr[i].warranty != "") {
                warrantyFile = clientData3['warranty'][k].filename
                k++
            } else {
                warrantyFile = null
            }

            if (asset_arr[i].invoice != "") {
                invoiceFile = clientData3['invoice'][l].filename
                l++
            } else {
                invoiceFile = null
            }

            asset_list.push({
                name: clientData2.item_name,
                version: asset_arr[i].version,
                model: asset_arr[i].model,
                branch_id: clientData2.location,
                item_type: clientData2.item_type,
                purchase_date: moment(asset_arr[i].Pdate).format("YYYY-MM-DD"),
                documents: JSON.stringify({ "documents": fileName, "invoice": invoiceFile, "warranty": warrantyFile }),
                usage_type: clientData2.usage_type,
                expire_date: moment(asset_arr[i].Edate).format("YYYY-MM-DD"),
                status: 1,
                created_at: new Date(),
                description: asset_arr[i].description

            })
        }

        //console.log(asset_list )

        let data = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(AssetsItems)
            .values(asset_list)
            .execute();

        return "data";
    } catch (error) {
        throw error;
    }
}

const viewAssets = async function (clientData, clientData2) {
    try {
        let offs = 0
        if (clientData2.page != '' && clientData2.page != 0) {
            offs = (clientData2.page - 1) * 10
        }

        if (clientData2.location == '') {
            var location_ = ``
        } else {
            var location_ = `and assetsItem.branch_id = '${clientData2.location}'`
        }
        if (clientData2.item_type == '') {
            var it_ = ``
        } else {
            var it_ = `and assetsItem.item_type = '${clientData2.item_type}'`
        }
        if (clientData2.usage_type == '') {
            var ut_ = ``
        } else {
            var ut_ = `and assetsItem.usage_type = '${clientData2.usage_type}'`
        }
        if (clientData2.item_name == '') {
            var in_ = ``
        } else {
            var in_ = `and assetsItem.name like '%${clientData2.item_name}%'`
        }
        let data = await getConnection()
            .getRepository(AssetsItems)
            .createQueryBuilder("assetsItem")
            .leftJoin(Branches, "brnch", "brnch.id = assetsItem.branch_id")
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
            .limit(10)
            .offset(offs)
            .orderBy("assetsItem.id", "DESC")
            .getRawMany();
        return data;
    } catch (error) {
        throw error
    }
}

const fetchItem = async function (clientData) {
    try {
        // console.log(clientData);
        let data = await getConnection()
            .getRepository(AssetsItems)
            .createQueryBuilder("assetsItem")
            .select([
                "assetsItem.id as item_id",
                "assetsItem.name as Item_name"
            ])
            .getRawMany();
        return data;
    } catch (error) {
        throw error
    }
}

const assetsItemList = async (clientdata) => {
    try {
        // let query1 = `select id as asset_id, name as Item_name, status as item_status, version, model, branch_id 
        // from assets_items
        // where status = 1 and id not in (select product_id from assets where status = 1) and branch_id = ${clientdata.location};`

        // let data = await getConnection()
        // .query(query1)
        // .catch(err_msg => {
        //   console.log(err_msg);
        // });

        let data = await getConnection()
            .getRepository(AssetsItems)
            .createQueryBuilder("assetItem")
            //.leftJoin(Assets, "asset", "asset.product_id = assetItem.id")
            .where("status = 1 and id not in (select product_id from assets where status = 1) and branch_id = :location", {
                location: clientdata.location
            })
            .select([
                "assetItem.id as asset_id",
                "assetItem.name as Item_name",
                "assetItem.version as version",
                "assetItem.model as model",
                "assetItem.item_type as item_type", // updated item type
                "assetItem.branch_id as branch_id",
                "assetItem.status as item_status"
            ])
            .orderBy("assetItem.id", "DESC")
            .getRawMany();
        return data;
    } catch (error) {
        throw error
    }
}

const deleteAssetsItem = async (clientdata) => {
    try {
        let data = await getConnection()
            .createQueryBuilder()
            .update(AssetsItems)
            .set({
                status: 0,
                created_at: new Date()
            })
            .where("status = 1 and id = :id", {
                id: clientdata.item_id
            })
            .execute()

        return data
    } catch (error) {
        throw error
    }
}

const assetsHistory = async (clientData) => {
    try {
        let query = `select usr.first_name, usr.last_name, brnch.location,ast.updated_at as to_date,ast.created_at as from_date,
         DATEDIFF(ast.updated_at, ast.created_at) as assigned_duration
        from assets as ast
        left join users as usr
        on usr.id = ast.user_id 
        left join branches as brnch
        on brnch.id = usr.branch_id
        left join roles as role
        on role.id = usr.role_id
        where ast.status = 0 
        and ast.product_id = ${clientData.item_id}
        order by ast.updated_at desc limit 30;`
        let data = await getConnection()
            .query(query)
            .catch(err_msg => {
                console.log(err_msg);
            });
        return data
    } catch (error) {
        throw error
    }
    //   and ast.created_at >= ${clientData.from_date} and ass.created_at <= ${clientData.to_date} 

}

// it is not use

const search_asstesItem_by_assertsId = async (clientData) => {
    try {
        let data = await getConnection()
            .getRepository(AssetsItems)
            .createQueryBuilder("assetsItem")
            .where("assetsItem.id = :id ", {
                id: clientData.item_Id
            })
            .select(["asstesIteam"])
            .getOne();
        return data
    } catch (error) {
        throw error
    }
}



const editAssetsItem = async (clientParam, clientBody, clientFiles) => {
    try {

        //  let asset_arr = JSON.parse(clientData2.items)

        // assign by add kerna h
        console.log(clientParam);
        console.log(clientBody);
        console.log(clientFiles);

        // let asset_arr = JSON.parse(clientBody.items);



        //console.log(JSON.parse(clientBody))

        let userId = clientParam.user_id;
        let itemId = clientParam.item_id;
        let assetId = clientParam.asset_id;
        let empId = null;
        let assetInvenryFlag = clientParam.flag; // 0 means not assign

        let fileName = "";
        let invoiceFile = "";
        let warrantyFile = "";

        fileName = clientFiles['documents'][0].filename;
        warrantyFile = clientFiles['warranty'][0].filename;
        invoiceFile = clientFiles['invoice'][0].filename;


        // it will execute if item assign to user

        if (assetInvenryFlag == 1) {

            empId = await getConnection()
                .getRepository(Assets)
                .createQueryBuilder("assets")
                .where("assets.id=:id", { id: assetId })
                .select([
                    "assets.user_id as emp_id",
                ])
                .getOne();


            let updateAssets = await getConnection()
                .createQueryBuilder()
                .update(Assets)
                .set({
                    // unassighn
                    status: 0, //if assign = 1 , not_assign = 0
                    updated_at: new Date()
                })
                .where("id=:id", { id: assetId })
                .execute();


        }

        // It will always run
        // for (i in clientBody) {
        //     console.log(i);

        // }

        let data = await getConnection()
            .createQueryBuilder()
            .update(AssetsItems)
            .set({
                // name: clientBody.name,
                version: clientBody.version,
                model: clientBody.model,
                //  branch_id: clientBody.branch_id,
                //  item_type: clientBody.item_type,
                purchase_date: clientBody.purchase_date,
                documents: JSON.stringify({ "documents": fileName, "invoice": invoiceFile, "warranty": warrantyFile }),
                updated_at: new Date(),
                //  expire_date: clientBody.expire_date,
                //  usage_type: clientBody.usage_type,
                description: clientBody.description
            })
            .where("id=:item_id", { item_id: itemId })
            .execute();

        //It is executed if assign item to employee

        if (empId != null) {

            // assets value will be returned

            //only for taking product name
            let getAssetsIteam = await getConnection()
                .getRepository(AssetsItems)
                .createQueryBuilder("assetsItem")
                .where("id=:item_id", { item_id: itemId })
                .select([
                    "assetItem.id as asset_id",
                    "assetItem.name as Item_name",
                ])
                .getOne();



            data = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Assets)
                .values([
                    {
                        user_id: empId,
                        product_id: getAssetsIteam.id,
                        product_name: getAssetsIteam.name,
                        assign_by: userId,
                        created_at: new Date(),
                        updated_at: new Date()

                    }
                ])
                .execute()
        }

        return data;
    } catch (error) {
        throw error
    }
}




module.exports = {
    assetsHistory,
    addAssets,
    viewAssets,
    fetchItem,
    assetsItemList,
    deleteAssetsItem,
    search_asstesItem_by_assertsId,
    editAssetsItem

}