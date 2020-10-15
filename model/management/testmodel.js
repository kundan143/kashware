//const user = require("../../classModel/usersClass").Users;

const {getConnection} = require('typeorm');
const { Users } = require("../../classModel/usersClass");

module.exports = {

    user_List: async () => {

        try{
            const data = await getConnection()
            .getRepository("users")
            .createQueryBuilder()
            .select(["user"])
            .from(Users,"user")
            .getRawMany();

            return data;

        }
        catch(error){
            throw error;
        }

    }

}