class Announcements{
    constructor(
        announcement_id,
        branch_id,
        employee_type,
        announcement_by,
        title,
        description,
        status,
        created_at,
        updated_at
    ){
        this.announcement_id = announcement_id;
        this.branch_id = branch_id;
        this.employee_type = employee_type;
        this.announcement_by = announcement_by;
        this.title = title;
        this.description = description;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
      }
}

module.exports = {
    Announcements: Announcements
  };