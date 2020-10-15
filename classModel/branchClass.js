class Branches {
    constructor(
        id,
        location,
        city,
        address,
        mobile,
        created_At,
        updated_At
    ){
        this.id = id;
        this.location = location,
        this.city =city,
        this.address = address,
        this.mobile = mobile;
        this.created_At = created_At;
        this.updated_At = updated_At;
        //this.deleted_At = deleted_At;

    }
}

module.exports = {
    Branches: Branches
  };