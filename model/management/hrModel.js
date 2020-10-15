const { Users } = require("../../classModel/usersClass");
//const { Users } = require("../../classModel/usersClass");

const { getConnection } = require('typeorm');

module.exports = {

    List_of_hr: async () => {

        // let data = await getConnection()
        //     .getRepository("users")
        //     .createQueryBuilder()
        //     .select([
        //         "user"         
        //     ])
        //     .from(Users,"user")
        //     .where("user.role_id = 5")
        //     .getRawMany();
        try {
            const data = await getConnection()
                .getRepository("users")
                .createQueryBuilder()
                .select(["user"])
                .from(Users, "user")
                .getRawMany();

            return data;
        } catch (error) {
            throw error;
        }


    }


}