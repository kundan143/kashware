class Banks{
    constructor(
        id,
        name,
        user_id,
        account_no,
        ifsc,
        branch_name,
        created_at,
        updated_at
    ){
        this.id=id,
        this.name=name,
        this.user_id= user_id,
        this.account_no=account_no,
        this.ifsc=ifsc,
        this.branch_name=branch_name,
        this.created_at=created_at,
        this.updated_at=updated_at
    }
}
module.exports={
    Banks:Banks
};