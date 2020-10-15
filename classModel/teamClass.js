class Teams {
  constructor(
    id,
    user_id,
    project_id,
    tech_label_id,
    status,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.user_id = user_id;
    this.project_id = project_id;
    this.tech_label_id = tech_label_id;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = {
  Teams: Teams
};
