class Payslips {
    constructor(
        id,
        user_id,
        url,
        month_year,
        status,
        created_At,
        updated_At
    ){
        this.id = id;
        this.user_id = user_id,
        this.url = url,
        this.month_year = month_year,
        this.status = status;
        this.created_At = created_At;
        this.updated_At = updated_At

    }
}

module.exports = {
    Payslips: Payslips
  };