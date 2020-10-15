class AnnualLeaves {
    constructor(
        annual_leave_id,
        user_id,
        days,
        leave_type,
        year,
        is_approved,
        status,
        created_at,
        updated_at
    ){
        this.annual_leave_id = annual_leave_id;
        this.user_id = user_id,
        this.days =days,
        this.leave_type = leave_type,
        this.year = year;
        this.is_approved = is_approved;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = {
    AnnualLeaves: AnnualLeaves
  };