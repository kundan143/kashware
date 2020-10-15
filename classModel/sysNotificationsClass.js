class SysNotifications {
    constructor(
        notification_id,
        user_id,
        flag,
        releted_to,
        model_type,
        read_at,
        expires_at,
        published,
        posted_by,
        desc,
        status,
        created_at,
        updated_at
    ){
        this.notification_id = notification_id;
        this.user_id = user_id;
        this.flag = flag;
        this.releted_to = releted_to;
        this.model_type = model_type;
        this.read_at = read_at;
        this.expires_at = expires_at;
        this.desc = desc;
        this.posted_by = posted_by;
        this.published = published;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = {
    SysNotifications: SysNotifications
  };