const {getConnection,getRepository} = require("typeorm");
const SysNotifications = require("../../classModel/sysNotificationsClass").SysNotifications;
const Announcements = require("../../classModel/announcementsClass").Announcements;
const Branches = require("../../classModel/branchClass").Branches;
const Users = require("../../classModel/usersClass").Users;
const AnnouncementsUsers = require("../../classModel/announcementUsersClass").AnnouncementUsers;


const addAnnouncement = async (clientData, clientData1)=>{
    try{

        let create_announcement = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Announcements)
        .values({
            branch_id: clientData['location'],
            employee_type: clientData['emp_type'],
            announcement_by: clientData1['user_id'],
            title: clientData['flag'],
            description: clientData['announcement'],
            status: 1,
            created_at: new Date()
        })       
        .execute()

        let announcementId = create_announcement['identifiers'][0].announcement_id

        if (clientData.emp_type == 'Full Time'){
            var data_usr = await getConnection()
            .getRepository(Users)
            .createQueryBuilder("user")
            .where("user.status = 1 and user.role_id in (6,3) and branch_id = :location", 
            {location: clientData.location})
            .select(["user.id"])
            .getMany()
        }else if(clientData.emp_type == 'Intern'){
            var data_usr = await getConnection()
            .getRepository(Users)
            .createQueryBuilder("user")
            .where("user.status = 1 and user.role_id = 4 and branch_id = :location", 
            {location: clientData.location})
            .select(["user.id"])
            .getMany()
        }else{
            var data_usr = await getConnection()
            .getRepository(Users)
            .createQueryBuilder("user")
            .where("user.status = 1 and branch_id = :location", 
            {role_id: clientData.emp_type, location: clientData.location})
            .select(["user.id"])
            .getMany()
        }

        let valuess = []
        for (i = 0; i < data_usr.length; i++) {
            valuess.push({
                user_id:""+data_usr[i].id+"",
                announcement_id: announcementId,
                status:1,
                created_at:new Date()
            })
        }

        if (valuess.length > 0){
        let data1 = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(AnnouncementsUsers)
        .values(valuess)       
        .execute()
        }else{
            return "Employee didn't detect!"
        }

        return "data1"
    }catch(error){
        throw error;
    }
}

const addNotification = async  (clientData, clientData2)=>{
    try{

        let data1 = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(SysNotifications)
        .values( [{
            user_id: clientData2.user_id,
            flag: 'green',
            releted_to: 'resume template upload',
            model_type: 'notification',
            desc: 'New resume template has been updated!',
            posted_by: clientData2.user_id,
            published:'1',
            status: '1',
            created_at: new Date()
          }])       
        .execute()
        return "data"
    }catch(error){
        throw error
    }
}

const getAnnouncement = async  (data_param, data_query)=>{
    try{
        let location_ = ``
        if(data_query.location != '' && data_query.location != 'null'){
            location_ = `and ancmt.branch_id = ${data_query.location}`
        }

        let data = await getConnection()
        .getRepository(Announcements)
        .createQueryBuilder("ancmt")
        .leftJoin(Branches, "branch", "branch.id = ancmt.branch_id")
        .leftJoin(Users, "user", "user.id = ancmt.announcement_by")
        .where(`ancmt.status = 1 ${location_}`)
        .select([
            'ancmt.announcement_id as announcement_id',
            'ancmt.title as title',
            'ancmt.description as description',
            'user.first_name as first_name',
            'user.last_name as last_name',
             'branch.location as location',
             'ancmt.employee_type as emp_type'
            ])
        .getRawMany()

        return data
    }catch(error){
        throw error
    }
}

const approveRejectAnnouncement = async (clientData)=>{
    try{       
         const data = await getConnection()
        .createQueryBuilder()
        .update(SysNotifications)
        .set({
            published: clientData.published
        })
        .where("desc = :desc and status = 1",{desc:clientData.desc})
        .execute();
        return data;
    }catch(error){
        throw error
    }
}

const getNotification2 = async (clientdata)=>{
    try{
        let query1 = `SELECT distinct sys.desc, usr.first_name as posted_by, sys.published, sys.created_at \n
        FROM sys_notifications as sys \n
        LEFT JOIN users as usr \n
        ON usr.id = sys.posted_by \n
        WHERE sys.status = 1 and sys.user_id = ${clientdata};`

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

const deleteAnnouncment = async (clientData)=>{
    try{
        const data = await getConnection()
        .createQueryBuilder()
        .update(Announcements)
        .set({
            status: 0,
            updated_at: new Date()
        })
        .where("announcement_id = :desc and status = 1",{desc:clientData.announcementId})
        .execute();
        return data;
    }catch(error){throw error}
}

module.exports = {
    addAnnouncement,
    getAnnouncement,
    addNotification,
    approveRejectAnnouncement,
    getNotification2,
    deleteAnnouncment
}