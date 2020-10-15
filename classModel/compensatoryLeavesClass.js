class CompensatoryLeaves {
    constructor(
        compensatory_leave_id,
        user_id,
        days,
        allocated_by,
        year,
        desc,
        is_approved,
        status,
        created_at,
        updated_at
    ){
        this.compensatory_leave_id = compensatory_leave_id;
        this.user_id =user_id;
        this.days = days;
        this.allocated_by = allocated_by;
        this.year = year;
        this.desc = desc;
        this.is_approved = is_approved;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = {
    CompensatoryLeaves: CompensatoryLeaves
  };