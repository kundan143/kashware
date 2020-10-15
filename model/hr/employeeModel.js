const Users = require("../../classModel/usersClass").Users;
const Bank = require("../../classModel/banksClass").Banks;
const Leave = require("../../classModel/leaveClass").Leaves;
const Projects = require("../../classModel/projectClass").Projects;
const Teams = require("../../classModel/teamClass").Teams;
const Branches = require("../../classModel/branchClass").Branches;
const UserKYCDocs = require("../../classModel/usersKYCDocsClass").UserKYCDocs; 
const roles = require("../../classModel/rolesClass").Roles;
const {getConnection,getRepository} = require("typeorm");
const bcrypt = require("bcrypt");
const Designations = require("../../classModel/designationClass").Designations;


const searchEmployeeProjectVise = async (clientData)=>{
  try{
    let data = await getConnection()
    .getRepository(Teams)
    .createQueryBuilder("team")
    .leftJoin(Projects, "project", "project.id = team.project_id")
    .leftJoin(Users, "user", "user.id = team.user_id")
    .leftJoin(Designations, "design", "design.id = user.designation")
    .where("team.status = 1 and team.project_id = :project_id", {project_id:clientData.project_id})
    .select([
            "project.id as projectId",
            "project.title as projectName",
            "design.name as designation",
            "user.id as user_id",
            "user.first_name as user_fname",
            "user.last_name as user_lname",
            "user.designation as designation",
            "user.city as city"
        ])
    .getRawMany();
    
    return data;
  }catch(err){
    throw err
  }
}

const addEmployee = async function(clientData){
    try{
        let check_emp_email = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.email = :email and users.status = 1", {email:clientData.email_id})
        .getRawMany()

        let check_xelp_email = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.xelp_email = :email and users.status = 1", {email:clientData.xelp_email})
        .getRawMany()

        let check_xelp_id = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.emp_id = :emp_id", {emp_id:clientData.emp_id})
        .getRawMany()

        if (check_emp_email.length != 0){
            return "3"
        }

        if (check_xelp_email.length != 0){
            return "1"
        }

        if (check_xelp_id.length != 0){
            return "2"
        }
        
        let emp_designation = null
        if(clientData.designation != '' && clientData.designation != 'null'){
            emp_designation = clientData.designation
        }
        let reportingTO = null
        if(clientData.reporting_manager != '' && clientData.reporting_manager != 'null'){
            reportingTO = clientData.reporting_manager
        }
        
        let date_of_joining = null 
          if(clientData.joining_date != '' && clientData.joining_date != 'null'){
            date_of_joining = clientData.joining_date
        }

        let userType = 'employee';
        if(clientData.emp_type != '' && clientData.emp_type != 'null'){
            userType = clientData.emp_type
        }
        
            const data = await getConnection()
             .createQueryBuilder()
             .insert()
             .into(Users)
             .values([{
                 first_name: clientData.first_name,
                 last_name: clientData.last_name,
                 email: clientData.email_id,
                 //phone: clientData.contact_no,
                 mobile: clientData.contact_no,
                 bg: clientData.blood_group,
                 c_address: clientData.current_address,
                 p_address: clientData.permanent_address,
                 password: '$2y$10$1YXHjEj.aN7O.q2Om60z8.ZBr3xBdwVdIwwt/sQ1cNNsllihOXGGa',
                 role_id: clientData.role_id,
                 //contact_number: clientData.contact_number,
                 //emer_contact_no: clientData.emer_contact_no,
                 //emer_contact_name: clientData.emer_contact_name,
                 emp_id: clientData.emp_id,
                 designation: emp_designation,
                 xelp_email: clientData.xelp_email,
                 branch_id: clientData.location,
                 doj: date_of_joining,
                 //hire_date: clientData.hire_date,
                 //resignation_date: clientData.resigtration,
                 //address: clientData.address,
                 reporting_to: reportingTO,
                 //bg: clientData.bg,
                 //profile_pic: 'none',
                 //resume_url: null,
                 //branch_id: clientData.branch_id,
                 //current_salary: clientData.current_salary,
                 user_type: userType,
                 status: 1,
                 //remember_token: null,
                 created_at: new Date()
             }])
             .execute();

            if(reportingTO != null){
             let make_reporting_manager = await getConnection()
             .createQueryBuilder()
             .update(Users)
             .set({
                 role_id: 3,
                 updated_at: new Date()
             })
             .where("status = 1 and id = :user_id",{
                 user_id: clientData.reporting_manager
             })
             .execute()
            }
            return data;
        

    }catch(error){
        throw error;
    }
};

const updateEmployeeDetail = async (clientData, clientData1)=>{
    try{
       // console.log("update_employee", typeof(clientData.releasing_date), clientData.releasing_date == 'Invalid date') 
        console.log("update_employee")
        let check_emp_email = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.email = :email and users.id != :e_id and users.status = 1", 
        {
            email:clientData.email_id, 
            e_id: clientData1.e_id
        })
        .getRawMany()

        let check_xelp_email = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.xelp_email = :email and users.id != :e_id and users.status = 1", 
        {
            e_id: clientData1.e_id ,
            email:clientData.xelp_email
        })
        .getRawMany()

        let check_xelp_id = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.emp_id = :emp_id and users.id != :e_id", 
        {
            e_id: clientData1.e_id ,
            emp_id:clientData.emp_id
        })
        .getRawMany()

        if (check_emp_email.length != 0){
            return "3"
        }

        if (check_xelp_email.length != 0){
            return "1"
        }

        if (check_xelp_id.length != 0){
            return "2"
        }

        let resignationDate = null

        if (clientData.resignation_date != 'Invalid date' && clientData.resignation_date != 'null'){
            resignationDate = clientData.resignation_date
        }
        
        let leaveDate = null
        
         if (clientData.releasing_date != 'Invalid date' && clientData.releasing_date != 'null'){
            leaveDate = clientData.releasing_date
        }

        let emp_designation = null
        if(clientData.designation != '' && clientData.designation != 'null'){
            emp_designation = clientData.designation
        }
        
        let date_of_joining = null
        if(clientData.joining_date != '' && clientData.joining_date != 'null'){
            date_of_joining = clientData.joining_date
        }

        let reportingTO = null
        if(clientData.reporting_manager != '' && clientData.reporting_manager != 'null'){
            reportingTO = clientData.reporting_manager
        }
        

        const data = await getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
            first_name: clientData.first_name,
            last_name: clientData.last_name,
            email: clientData.email_id,
            phone: clientData.contact_no,
            mobile: clientData.contact_no,
            bg: clientData.blood_group,
            c_address: clientData.current_address,
            p_address: clientData.permanent_address,
            xelp_email: clientData.xelp_email,
            //role_id: clientData.role_id,
            designation: emp_designation,
            emp_id: clientData.emp_id,
            branch_id: clientData.branch_id,
            doj: date_of_joining,
            dol: leaveDate,
            resignation_date: resignationDate,
            reporting_to: reportingTO,
            branch_id: clientData.location,
            user_type: clientData.emp_type,
            status: 1,
            updated_at: new Date()
        })
        .where("id=:e_id and status = 1",{e_id:clientData1.e_id})
        .execute();
        return data
    }catch(error){
        throw error
    }
}

const uploadResume = async (clientData, clientData1)=>{
    try{
        const extension = clientData1.originalname.split(".").pop();
        if (extension !== 'pdf'){
            return "error"
        }
        console.log(clientData1['filename'])
        // const data = await getConnection()
        // .createQueryBuilder()
        // .update(Users)
        // .set({
        //      resume_url:clientData1.filename,
        //      updated_at: new Date()
        // })
        // .where("status = 1 and resume_url is null")
        // .execute();

        return "data"
    }catch(error){
        throw error
    }
}

const getResume = async (clientData)=>{
    try{
        let data = await getConnection()
      .getRepository(Users)
      .createQueryBuilder("user")
      .where(
        "user.id = :emp_id and user.status = 1", 
        {emp_id: clientData.emp_id})
      .select([
        "user.id as user_id",
        "user.name as user_name",
        "user.resume_url as resumeUrl"
      ])
      .getRawMany();

      return data
    }catch(error){
        throw error
    }
}

const uploadProfilePic = async (clientData, clientData1)=>{
    try{
        const extension = clientData1.originalname.split(".").pop();
        if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg'){
            console.log("error")
            return "error"
        }
        const data = await getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
             profile_pic:clientData1.filename,
             updated_at: new Date()

        })
        .where("status = 1 and id=:emp_id",{emp_id:clientData.emp_id})
        .execute();

        return "data"
    }catch(error){
        throw error
    }
}

const getProfilePic = async (clientData)=>{
    try{
        let data = await getConnection()
      .getRepository(Users)
      .createQueryBuilder("user")
      .where(
        "user.id = :emp_id and user.status = 1", 
        {emp_id: clientData.emp_id})
      .select([
        "user.id as user_id",
        "user.first_name as user_fname",
        "user.last_name as user_lname",
        "user.profile_pic as profilePic"
      ])
      .getRawMany();

      return data
    }catch(error){
        throw error
    }
}

const searchEmployeeByRoleAndBranch = async (clientData)=>{
    try {
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .leftJoin(roles, "roles", "roles.id = user.role_id")
        .leftJoin(Users, "usr", "usr.id = user.reporting_to")
        .leftJoin(Branches, "branch", "branch.id = user.branch_id")
        .leftJoin(Designations, "design", "design.id = user.designation")
        .where("user.status = 1 and user.role_id = :roleid and user.branch_id = :branch ", {
        roleid: clientData.emptype,
        branch: clientData.branch_id
        })
        .select([
            "user.id as user_id",
            "user.first_name as first_name",
            "user.last_name as last_name",
            "design.name as designation",
            "user.user_type as emp__type",
            "user.bg as blood_group",
            "roles.id as role_id",
            "roles.name as role_name",
            "user.emp_id as emp_id",
            "user.email as user_email",
            "user.xelp_email as xelp_email",
            "user.phone as contact_no",
            "user.c_address as current_address",
            "user.p_address as permanent_address",
            "user.phone as phone",
            "user.mobile as mobile",
            "usr.first_name as reporting_manager_fname",
            "usr.last_name as reporting_manager_lname",
            "branch.city as location"
        ])
        .getRawMany();
        return data
    } catch (error)  {
        throw error 
    }
    
}

const uploadKYCDocs = async (clientData, clientData1, clientData2)=>{
    try{
        let ad = null
        let pd = null
        let marksheet = null 
        if(clientData['pancard'] != undefined)
        {
        pd = clientData['pancard'][0].filename
        }
        if(clientData['adhaar'] != undefined)
        {
        ad = clientData['adhaar'][0].filename
        }
        if(clientData['marksheet'] != undefined)
        {
        marksheet = clientData['marksheet'][0].filename
        }

        let check_userId = await getConnection()
        .getRepository(UserKYCDocs)
        .createQueryBuilder("user")
        .where("user.user_id = :emp_id and user.status = 1", {emp_id:clientData1.emp_id})
        .getRawMany()

        if (check_userId.length == 0){
            const data = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(UserKYCDocs)
            .values([{
                user_id: clientData1.emp_id,
                adhaar_card: ad,
                pan_card: pd,
                marksheet: marksheet,
                adhaar_card_status: clientData2.adhaarStatus,
                pan_card_status: clientData2.pancardStatus,
                marksheet_status: clientData2.marksheetStatus,
                created_at: new Date()
            }])
            .execute()
            return data
        }else{
            var object_data = {
                // adhaar_card: ad,
                // pan_card: pd,
                // marksheet: marksheet,
                adhaar_card_status: clientData2.adhaarStatus,
                pan_card_status: clientData2.pancardStatus,
                marksheet_status: clientData2.marksheetStatus,
                updated_at: new Date()
    
            }
            if (ad != null ){
            object_data.adhaar_card = ad 
            }

            if (pd != null ){
                object_data.pan_card = pd
                }

                if (marksheet != null ){
                    object_data.marksheet = marksheet
                    }


            const data = await getConnection()
            .createQueryBuilder()
            .update(UserKYCDocs)
            .set(object_data)
            .where("user_id=:emp_id and status = 1",{emp_id:clientData1.emp_id})
            .execute();
            return data
        }

    }catch(error){
        throw error
    }
}

const getKYCDocs = async (clientData) =>{
    try{
        let data = await getConnection()
        .getRepository(UserKYCDocs)
        .createQueryBuilder("user")
        .where("user.user_id = :emp_id and user.status = 1", {emp_id:clientData.emp_id})
        .getRawMany()
        return data;
    }catch(error){
        throw error
    }
}

const checkCredentials = async (clientData)=>{
    try{
        if (clientData.type == 'email'){
         var data12 = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.email = :email and users.status = 1", {email:clientData.value})
        .select([
            "users.id", 
            "users.email", 
            "users.xelp_email", 
            "users.emp_id"
        ])
        .getRawMany()
        }

        if (clientData.type == 'xelp_email'){
        var data12 = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.xelp_email = :email and users.status = 1", {email:clientData.value})
        .select([
            "users.id", 
            "users.email", 
            "users.xelp_email", 
            "users.emp_id"
        ])
        .getRawMany()
        }

        if (clientData.type == 'emp_id'){
        var data12 = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.emp_id = :emp_id", {emp_id:clientData.value})
        .select([
            "users.id", 
            "users.email", 
            "users.xelp_email", 
            "users.emp_id"
        ])
        .getRawMany()
        }

        if (clientData.type == 'contact_no'){
            var data12 = await getConnection()
            .getRepository(Users)
            .createQueryBuilder("users")
            .where("users.status = 1 and (users.mobile = :contact_no or users.phone = :contact_no)",
             {contact_no:clientData.value})
            .select([
                "users.id", 
                "users.email", 
                "users.xelp_email", 
                "users.emp_id"
            ])
            .getRawMany()
        }
        return data12
    }catch(error){
        throw error
    }
}

const getEmployeeById = async (clientData)=>{
    try{
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .leftJoin(roles, "roles", "roles.id = user.role_id")
        .leftJoin(Users, "usr", "usr.id = user.reporting_to")
        .leftJoin(Branches, "branch", "branch.id = user.branch_id")
        .leftJoin(Designations, "design", "design.id = user.designation")
        .leftJoin(UserKYCDocs, "ukyc", "ukyc.user_id = user.id")
        .where("user.status = 1 and user.id = :id ", {
        id: clientData.empId
        })
        .select([
            "user.id as user_id",
            "user.first_name as first_name",
            "user.last_name as last_name",
            "design.name as designation",
            "user.user_type as emp__type",
            "user.bg as blood_group",
            "roles.id as role_id",
            "roles.name as role_name",
            "user.emp_id as emp_id",
            "user.email as user_email",
            "user.xelp_email as xelp_email",
            "user.phone as contact_no",
            "user.c_address as current_address",
            "user.p_address as permanent_address",
            "user.phone as phone",
            "user.mobile as mobile",
            "usr.first_name as reporting_manager_fname",
            "usr.last_name as reporting_manager_lname",
            "branch.city as location",
            "branch.id as branch_id",
            "usr.id as reporting_manager_id",
            "design.id as design_id",
            "ukyc.id as kyc_user_id",
            "ukyc.adhaar_card as adhaarfile",
            "ukyc.pan_card as pancardfile",
            "ukyc.marksheet as markSheetfile",
            "ukyc.adhaar_card_status as adhaarStatus",
            "ukyc.pan_card_status as pancardStatus",
            "ukyc.marksheet_status as markSheetStatus",
            "user.doj as dateOfJoining",
            "user.dol as dateOfReleasing",
            "user.resignation_date as dateOfResignation",
            "user.appointment_date as dateOfAppointment"
        ])
        .getRawMany();
        return data
    }catch(error){
        throw error
    }
}

const getEmail = async ()=>{
    try{
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder('user')
        //.where("user.status = 1")
        .select(["user.email as email"])
        .getRawMany()

        return data
    }catch(error){
        throw error
    }
}

const checkKYCDocsPending = async (clientData)=>{
    try{
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder('user')
        .leftJoin(UserKYCDocs, "kyc", "kyc.user_id = user.id")
        .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
        .where(
        `kyc.status = 1 and user.status = 1 and
        ((kyc.marksheet is null and kyc.marksheet_status = 0) or
        (kyc.adhaar_card is null and kyc.adhaar_card_status = 0) or
        (kyc.pan_card is null and kyc.pan_card_status = 0))
        and user.branch_id = ${clientData.branch_id}`)
        .andWhere(`user.role_id not in (1, 2, 5, 7, 8, 9, 10)`)
        .select([
            "user.id as user_id",
            "user.first_name as fname",
            "user.last_name as lname",
            "user.status as userstatus",
            "brnch.location as location", 
            "kyc.adhaar_card as adhaar_card",
            "kyc.pan_card as pan_card",
            "kyc.marksheet as marksheet",
            "kyc.adhaar_card_status as adhaar_status",
            "kyc.pan_card_status as pancard_status",
            "kyc.marksheet_status as marksheet_status",
            "user.appointment_date as appointment_date",
            "user.role_id as role_id",
            "user.doj as dateOfJoining"
        ])
        .getRawMany()
        return data
    }catch(error){
        throw error
    }
}


const addEmployee2 = async function(clientData, clientData2){
    try{
        let check_emp_email = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.email = :email and users.status = 1 and users.id != :id", {email:clientData.email_id, id: clientData2.id})
        .getRawMany()

        let check_xelp_email = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.xelp_email = :email and users.status = 1 and users.id != :id", {email:clientData.xelp_email, id: clientData2.id})
        .getRawMany()

        let check_xelp_id = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.emp_id = :emp_id", {emp_id:clientData.emp_id, id: clientData2.id})
        .getRawMany()

        // let check_contact_no = await getConnection()
        // .getRepository(Users)
        // .createQueryBuilder("users")
        // .where("users.status = 1 and (users.mobile = :contact_no or users.phone = :contact_no) and users.id != :id",
        //  {contact_no:clientData.contact_no, id: clientData2.id})
        // .select([
        //     "users.id", 
        //     "users.email", 
        //     "users.xelp_email", 
        //     "users.emp_id"
        // ])
        // .getRawMany()

        if (check_emp_email.length != 0){
            return "3"
        }

        if (check_xelp_email.length != 0){
            return "1"
        }

        if (check_xelp_id.length != 0){
            return "2"
        }

        // if (check_contact_no.length != 0){
        //     return "4"
        // }

            let deactivate_user = await getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
            status: 2,
            updated_at: new Date()
        })
        .where("id = :user_id",{
            user_id: clientData2.id
        })
        .execute()


        let emp_designation = null
        if(clientData.designation != '' && clientData.designation != 'null'){
            emp_designation = clientData.designation
        }
        
        let resignationDate = null
        if (clientData.resignation_date != '' && clientData.resignation_date != 'null'){
            resignationDate = clientData.resignation_date 
        }
        
        let date_of_joining = null
        if(clientData.joining_date != '' && clientData.joining_date != 'null'){
            date_of_joining = clientData.joining_date
        }
        
        let reportingTO = null
        if(clientData.reporting_manager != '' && clientData.reporting_manager != 'null'){
            reportingTO = clientData.reporting_manager
        }

        let userType = 'employee';
        if(clientData.emp_type != '' && clientData.emp_type != 'null'){
            userType = clientData.emp_type
        }

            const data = await getConnection()
             .createQueryBuilder()
             .insert()
             .into(Users)
             .values([{
                 first_name: clientData.first_name,
                 last_name: clientData.last_name,
                 email: clientData.email_id,
                 phone: clientData.contact_no,
                 mobile: clientData.contact_no,
                 bg: clientData.blood_group,
                 c_address: clientData.current_address,
                 p_address: clientData.permanent_address,
                 password: '$2y$10$1YXHjEj.aN7O.q2Om60z8.ZBr3xBdwVdIwwt/sQ1cNNsllihOXGGa',
                 role_id: clientData.role_id,
                 //contact_number: clientData.contact_number,
                 //emer_contact_no: clientData.emer_contact_no,
                 //emer_contact_name: clientData.emer_contact_name,
                 emp_id: clientData.emp_id,
                 designation: emp_designation,
                 xelp_email: clientData.xelp_email,
                 branch_id: clientData.location,
                 doj: date_of_joining,
                 //dol: clientData.releasing_date,
                 resignation_date: resignationDate,
                 //hire_date: clientData.hire_date,
                 //resignation_date: clientData.resigtration,
                 //address: clientData.address,
                 reporting_to: reportingTO,
                 //bg: clientData.bg,
                 //profile_pic: 'none',
                 //resume_url: null,
                 //branch_id: clientData.branch_id,
                 //current_salary: clientData.current_salary,
                 user_type: userType,
                 status: 1,
                 //remember_token: null,
                 created_at: new Date()
             }])
             .execute();

            return data;
        

    }catch(error){
        throw error;
    }
};

const deleteEmployee = async (clientdata)=>{
    try{
        let data = await getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
            status: 0,
            updated_at: new Date()
        })
        .where("id = :user_id",{
            user_id: clientdata.id
        })
        .execute()

        return data
    }catch(error){
        throw error
    }
}

const deleteDocs = async (clientdata, clientdata2)=>{
    try{
        // let deletedocs = await getConnection()
        // .createQueryBuilder()
        // .update(UserKYCDocs)
        // .set({
        //     clientData2.docs: "NULL"
        // })
        // .where()
        // .execute()
        let query1 = `update intranet.user_kyc_docs set ${clientdata2.docs} = NULL where user_id = ${clientdata.emp_id};`
        console.log(query1)
        let delete_docs_ = await getConnection()
        .query(query1)
        .catch(err_msg => {
          console.log(err_msg);
        });

        return delete_docs_
    }catch(error){
        throw error
    }
}

const change_reporting_manager = async (clientdata)=>{
    try{
        let user_reporting = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .where("user.id = :id and status = 1",{
            id: clientdata.id
        })
        .select(["user.reporting_to as reportingManager"])
        .getRawOne()

        let reporting_by = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .where("status = 1 and reporting_to = :id",
        {
            id: clientdata.id
        })
        .select(["user.id as report_by"])
        .getRawMany()


        for (i in reporting_by){
            let set_new_reporting_manager = await getConnection()
            .createQueryBuilder()
            .update(Users)
            .set({
                reporting_to: user_reporting.reportingManager,
                updated_at: new Date()
            })
            .where("status = 1 and id = :id2",{
                id2: reporting_by[i].report_by
            })
            .execute()
        }

        return "data"
    }catch(error){
        throw error
    }
}

const deletedUser = async (clientdata)=>{
    try{
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .leftJoin(roles, "roles", "roles.id = user.role_id")
        .leftJoin(Users, "usr", "usr.id = user.reporting_to")
        .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
        .leftJoin(Designations, "design", "design.id = user.designation")
        .where("user.branch_id = :location and user.status = 0",{
            location: clientdata.location
        })
        .select([
          "user.id as user_id",
          "user.first_name as first_name",
          "user.last_name as last_name",
          "design.name as designation",
          "user.bg as blood_group",
          "user.user_type as emp__type",
          "roles.id as role_id",
          "roles.name as role_name",
          "user.user_type as emp__type",
          "user.emp_id as emp_id",
          "user.email as user_email",
          "user.xelp_email as xelp_email",
          "user.phone as contact_no",
          "user.c_address as current_address",
          "user.p_address as permanent_address",
          "user.phone as phone",
          "user.mobile as mobile",
          "usr.first_name as reporting_manager_fname",
          "usr.last_name as reporting_manager_lname",
          "brnch.city as location",
          "user.status as status",
          "user.dol as release_date"
        ])
        .addOrderBy("user.first_name")
        .getRawMany();
      return data
    }catch(error){
      throw error
    }
  }

  const restore_emp = async (clientdata)=>{
      try{
        let data = await getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
            status: 1,
            updated_at: new Date()
        })
        .where("status = 0 and id = :user_id",{
            user_id: clientdata.id
        })
        .execute()

        return data
      }catch(error){
          throw error
      }
  }

  const updateUserAppointment = async (clientdata)=>{
      try{
        let data = await getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
            appointment_date: new Date(),
            updated_at: new Date()
        })
        .where("status = 1 and id = :user_id",{
            user_id: clientdata.emp_id
        })
        .execute()

        return data
      }catch(error){
          throw error
      }
  }

  const checkAppointmentLetter = async (param_data, query_data)=>{
      try{
          let location_ = ``;
          if(query_data.location != '' & query_data.location != 'null'){
              location_ = `and user.branch_id = ${query_data.location}`
          }
        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder('user')
        .leftJoin(Branches, "brnch", "brnch.id = user.branch_id")
        .where(
        `user.appointment_date is null and user.status = 1 ${location_}`)
        .andWhere(`user.role_id not in (1, 2, 5, 7, 8, 9, 10)`)
        .select([
            "user.id as user_id",
            "user.first_name as fname",
            "user.last_name as lname",
            "brnch.location as location", 
            "user.branch_id as branch_id",
            "user.appointment_date as appointment_date",
            "user.doj as dateOfJoining"
        ])
        .getRawMany()
        return data
      }catch(error){
          throw error
      }
  }

  const fetchEmployeList = async (clientdata, clientData2)=>{
      try{
        let location_ = ``
        if(clientdata.branch_id != '' && clientdata.branch_id != 'null'){
            location_ = `and user.branch_id = ${clientdata.branch_id}`
        }
    
        let role_ = ``
        if(clientdata.emptype != '' && clientdata.emptype != 'null'){
            if (clientdata.emptype == '4'){
            role_ = `and user.role_id = ${clientdata.emptype}`;
            }else{
                role_ = `and user.role_id in (3,6)`;
            }

        }

        let name_ = ``
        if(clientdata.name != '' && clientdata.name != 'null'){
            let name1 = clientdata.name.split(" ")
            name_ = `and (user.first_name like '${name1[0]}%' or user.last_name like '${name1[0]}%')`
        }

        let data = await getConnection()
        .getRepository(Users)
        .createQueryBuilder("user")
        .leftJoin(Branches, "branch", "branch.id = user.branch_id")
        .leftJoin(roles, "roles", "roles.id = user.role_id")
        .leftJoin(Users, "usr", "usr.id = user.reporting_to")
        .leftJoin(Designations, "design", "design.id = user.designation")
        .where(`user.status = 1 ${location_} ${role_} ${name_}`)
        .andWhere(`user.role_id not in (1, 2, 5, 7, 8, 9, 10)`)
        .select([
        "user.id as user_id",
        "user.first_name as first_name",
        "user.last_name as last_name",
        "design.name as designation",
        "roles.id as role_id",
        "roles.name as role_name",
        "user.user_type as emp__type",
        "user.emp_id as emp_id",
        "user.email as user_email",
        "user.xelp_email as xelp_email",
        "user.phone as contact_no",
        "user.mobile as mobile",
        "usr.first_name as reporting_manager_fname",
        "usr.last_name as reporting_manager_lname",
        "branch.city as location",
        "user.status as status"
        ])
        .getRawMany();
        return data
      }catch(error){
          throw error
      }
  }

module.exports = { 
    checkAppointmentLetter,
    updateUserAppointment,
    checkCredentials,
    searchEmployeeByRoleAndBranch,
    searchEmployeeProjectVise, 
    addEmployee, 
    updateEmployeeDetail,
    uploadResume, 
    getResume, 
    uploadProfilePic, 
    getProfilePic,
    uploadKYCDocs,
    getKYCDocs,
    getEmployeeById,
    getEmail,
    checkKYCDocsPending,
    addEmployee2,
    deleteEmployee,
    deleteDocs, 
    change_reporting_manager,
    deletedUser,
    restore_emp,
    fetchEmployeList
}