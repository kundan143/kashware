class LeaveQuotas{
    constructor(
        id,
        days,
        leave_type,
        emp_type,
        year,
        branch_id,
        status,
        created_at,
        updated_at
    ){
        this.id=id;
        this.days = days;
        this.leave_type = leave_type;
        this.emp_type = emp_type;
        this.year = year;
        this.branch_id = branch_id;
        this.status=status;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}
module.exports={
    LeaveQuotas: LeaveQuotas
};