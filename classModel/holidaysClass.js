class Holidays {
  constructor(holiday_id, title, desc, holiday_date, branch_id, flag, status, created_at, updated_at) {
    this.holiday_id = holiday_id;
    this.title = title;
    this.desc = desc;
    this.holiday_date = holiday_date;
    this.branch_id = branch_id;
    this.flag = flag;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = {
  Holidays: Holidays
};
