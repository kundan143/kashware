 
class FailedJobs {
  constructor(
    id,
    connection,
    queue,
    payload,
    exception,
    failed_at
  ) {
    this.id = id;
    this.connection = connection;
    this.queue = queue;
    this.payload = payload;
    this.exception = exception;
    this.failed_at = failed_at; 
  }
}

module.exports = {
  FailedJobs: FailedJobs
};
