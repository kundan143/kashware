class TechLabelUsers {
    constructor(
        id,
        tech_label_id,
        user_id,
        level,
        experience,
        status,
        created_at,
        updated_at
    ){
        this.id = id;
        this.tech_label_id = tech_label_id;
        this.user_id = user_id;
        this.level = level;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = {
    TechLabelUsers: TechLabelUsers
  };