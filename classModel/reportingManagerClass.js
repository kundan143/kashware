class ReportingManagers {
    constructor(
        id,
        user_id,
        manager_id,
        status,
        created_At,
        updated_At
    ){
        this.id = id;
        this.user_id = user_id,
        this.manager_id = manager_id,
        this.status = status;
        this.created_At = created_At;
        this.updated_At = updated_At;
      }
}

module.exports = {
    ReportingManagers: ReportingManagers
  };