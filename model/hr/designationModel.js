const {getConnection,getRepository} = require("typeorm");

const Designations = require("../../classModel/designationClass").Designations;
const Users = require("../../classModel/usersClass").Users;

const addDesignation = async (clientdata)=>{
    try{
        const data = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Designations)
        .values([{
            name: clientdata.name,
            status: 1,
            created_at: new Date()
        }])
        .execute()
        return data
    }catch(error){
        throw error
    }
}

const designationList = async ()=>{
    try{
        const data = await getConnection()
        .getRepository(Designations)
        .createQueryBuilder("design")
        .where("status = 1")
        .select()
        .getMany()
        return data
    }catch(error){
        throw error
    }
}

const editDesignation = async (clientdata, clientdata2)=>{
    try{
        console.log("Edit designation", clientdata, clientdata2)
        const data = await getConnection()
        .createQueryBuilder()
        .update(Designations)
        .set({
            name: clientdata.name,
            updated_at: new Date()
        })
        .where("id=:design_id and status = 1",{design_id:clientdata2.design_id})
        .execute();
        return data;
    }catch(error){
        throw error
    }
}

const checkDesignationOfEmp2 = async (clientdata, clientdata2)=>{
    try{
        const data = await getConnection()
        .getRepository(Designations)
        .createQueryBuilder("design")
        .leftJoin(Users, "user", "user.designation = design.name")
        .where(
            "user.designation = :name", 
            {
                name:clientdata.name
            })
        .select([
            "user.id as user_id",
            "user.first_name as first_name", 
            "user.last_name as last_name",
            "design.id as design_id",
            "design.name as design_name"
        ])
        .getRawMany()
        return data
    }catch(error){
        throw error
    }
}

const checkDesignationOfEmp = async (clientdata, clientdata2)=>{
    try{
        let data = await getConnection()
        .getRepository(Designations)
        .createQueryBuilder("design")
        .leftJoin(Users, "user", "user.designation = design.id")
        .where(
            "design.id = :id", 
            {
                id:clientdata2.design_id
            })
        .select([
            "user.id as user_id",
            "user.first_name as first_name", 
            "user.last_name as last_name",
            "design.id as design_id",
            "design.name as design_name"
        ])
        .getRawMany()

        if (!data[0].user_id){
            data = []
        }
        return data
    }catch(error){
        throw error
    }
}
const deleteDesignation = async (clientdata, clientdata2)=>{
    try{
        const data = await getConnection()
        .createQueryBuilder()
        .update(Designations)
        .set({
            status: 0,
            updated_at: new Date()
        })
        .where("id=:design_id and status = 1",{design_id:clientdata2.design_id})
        .execute();
        return data;
    }catch(error){
        throw error
    }
}

module.exports = {
    addDesignation,
    designationList,
    editDesignation, 
    checkDesignationOfEmp, 
    deleteDesignation,
    checkDesignationOfEmp2
}