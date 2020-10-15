const {getConnection,getRepository} = require("typeorm");
const bcrypt = require("bcrypt");
const Users = require("../../classModel/usersClass").Users;

const checkEmail = async (clientdata)=>{
    try{
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .where("user.status = 1 and xelp_email = :email",{
            email: clientdata.email
        })
        .select()
        .getMany()

        return data

    }catch(error){
        throw error
    }
}

//$2y$10$1YXHjEj.aN7O.q2Om60z8.ZBr3xBdwVdIwwt/sQ1cNNsllihOXGGa
const getPassWordHash = async (clientdata)=>{
    try{
        console.log(clientdata, "ankit")
        //const pass2 = logdata.password.replace(/^\$2y(.+)$/i, '$2a$1');
        return  bcrypt.hash("1234567890", 10, function(err, hash) {
            const pass2 = hash.replace(/^\$2b(.+)$/i, '$2y$1');
            return pass2
            });

    }catch(error){
        throw error
    }
}

const changePassword = async (password, email)=>{
    try{
        const hashpass = await bcrypt.hash(password, 10)
        .then(function(hashedPassword){
        return hashedPassword
        })
        const pass2 = hashpass.replace(/^\$2b(.+)$/i, '$2y$1');
        console.log("ankit", pass2, email)

        const cp = await getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
            password: pass2
        })
        .where("status = 1 and xelp_email = :email",{
            email: email
        })
        .execute()

        return cp
    }catch(error){
        throw error
    }
}

const changePassword2 = async (password, new_password, userId)=>{
    try{
        let check_old_password = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .where("status = 1 and id = :id",{
            id: userId
        })
        .select(["user.password"])
        .getRawMany()
        const pass23 = check_old_password[0].user_password.replace(/^\$2y(.+)$/i, '$2a$1');

        const match_password = await bcrypt.compare(password, check_old_password[0].user_password.replace(/^\$2y(.+)$/i, '$2a$1'));

        if(match_password){
        const hashpass = await bcrypt.hash(new_password, 10)
            .then(function(hashedPassword){
            return hashedPassword
            })
        const pass2 = hashpass.replace(/^\$2b(.+)$/i, '$2y$1');

        const cp = await getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
            password: pass2
        })
        .where("status = 1 and id = :id",{
            id: userId
        })
        .execute()
            return "saved"
        }else{
            return "error"
        }

    }catch(error){
        throw error
    }
}

module.exports = {
    checkEmail,
    changePassword,
    changePassword2
}