class AssetsItems{
    constructor(
        id,
        name,
        version,
        model,
        branch_id,
        item_type,
        purchase_date,
        documents,
        status,
        updated_at,
        created_at,
        expire_date,
        usage_type,
        description
    ){
        this.id=id;
        this.name= name;
        this.version=version;
        this.model=model;
        this.branch_id=branch_id;
        this.item_type=item_type;
        this.purchase_date=purchase_date;
        this.documents=documents;
        this.status=status;
        this.created_at=created_at;
        this.updated_at=updated_at;
        this.expire_date= expire_date;
        this.usage_type= usage_type;
        this.description=description;
    }
}
module.exports={
    AssetsItems: AssetsItems
};