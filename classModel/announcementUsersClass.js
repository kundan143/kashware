class AnnouncementUsers{
    constructor(
        announcement_user_id,
        user_id,
        announcement_id,
        status,
        created_at,
        updated_at
    ){
        this.announcement_user_id = announcement_user_id;
        this.user_id = user_id;
        this.announcement_id = announcement_id;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
      }
}

module.exports = {
    AnnouncementUsers: AnnouncementUsers
  };