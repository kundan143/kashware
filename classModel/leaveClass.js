 
class Leaves {
  constructor(
    id,
    user_id,
    reason,
    leave_type,
    from,
    to,
    is_approved,
    status,
    created_At,
    updated_At
  ) {
    this.id = id;
    this.user_id = user_id;
    this.reason = reason;
    this.leave_type = leave_type;
    this.from = from;
    this.to = to;
    this.is_approved = is_approved;
    this.status = status;
    this.created_At = created_At;
    this.updated_At = updated_At;
  }
}

module.exports = {
  Leaves: Leaves
};
