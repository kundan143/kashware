class UserKYCDocs {
    constructor(
        id,
        user_id,
        adhaar_card,
        pan_card,
        created_at,
        updated_at,
        marksheet, 
        adhaar_card_status,
        pan_card_status,
        marksheet_status,
        status
    ){
        this.id = id;
        this.user_id =user_id;
        this.adhaar_card = adhaar_card;
        this.pan_card = pan_card;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.marksheet = marksheet;
        this.adhaar_card_status = adhaar_card_status;
        this.pan_card_status = pan_card_status;
        this.marksheet_status = marksheet_status;
        this.status = status;
    }
}

module.exports = {
    UserKYCDocs: UserKYCDocs
  };