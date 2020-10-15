class Attendances {
  constructor(
    id,
    user_id,
    xelp_id,
    date,
    in_time,
    out_time,
    shift,
    first_half,
    second_half,
    late_in,
    early_out,
    work_hrs,
    ot,
    status,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.user_id = user_id;
    this.xelp_id = xelp_id;
    this.date = date;
    this.in_time = in_time;
    this.out_time = out_time;
    this.first_half = first_half;
    this.second_half = second_half;
    this.late_in = late_in;
    this.early_out = early_out;
    this.work_hrs = work_hrs;
    this.ot = ot;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = {
  Attendances: Attendances
};
