class Worksheets {
  constructor(
    id,
    title,
    desc,
    hour_spend,
    date,
    task_type,
    stack,
    user_id,
    project_id,
    priority,
    status,
    created_at,
    update_at
  ) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.hour_spend = hour_spend;
    this.date = date;
    this.task_type = task_type;
    this.stack = stack;
    this.user_id = user_id;
    this.project_id = project_id;
    this.priority = priority;
    this.status = status;
    this.created_at = created_at;
    this.update_at = update_at;
  }
}

module.exports = {
  Worksheets: Worksheets
};
