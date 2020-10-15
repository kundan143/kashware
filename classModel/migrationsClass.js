class Migrations {
  constructor(id, migration, batch) {
    this.id = id;
    this.migration = migration;
    this.batch = batch;
  }
}

module.exports = {
  Migrations: Migrations
};
