class Feedback{
    constructor(
        id,
        title,
        desc,
        feedback_by,
        worksheet_id,
        rating,
        is_accepted,
        status,
        created_at,
        updated_at
    ){
        this.id=id;
        this.title=title;
        this.desc=desc;
        this.feedback_by=feedback_by;
        this.worksheet_id=worksheet_id;
        this.rating=rating;
        this.is_accepted=is_accepted;
        this.status=status;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}
module.exports={
    Feedback: Feedback
};