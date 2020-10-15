class Approvals{
    constructor(
        id,
        model,
        desc,
        model_id,
        approved_by,
        is_approved,
        status,
        created_at,
        updated_at
    ){
        this.id = id;
        this.model = model;
        this.desc = desc;
        this.model_id = model_id;
        this.approved_by = approved_by;
        this.is_approved = is_approved;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = {
    Approvals: Approvals
};