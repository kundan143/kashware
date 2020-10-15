const { createConnection } = require("typeorm");
var credentials = require("./helper/credentials")
require('dotenv').config()

BaseConnection = async () => {
  const connection = await createConnection({
    type: credentials[process.env.NODE_ENV].DB_TYPE,
    host: credentials[process.env.NODE_ENV].DB_HOST,
    port: credentials[process.env.NODE_ENV].DB_PORT,
    username: credentials[process.env.NODE_ENV].DB_USERNAME,
    password: credentials[process.env.NODE_ENV].DB_PASSWORD,
    //password: '',
    database: credentials[process.env.NODE_ENV].DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [
      require("./entity/salaryStructureSchema"),
      require("./entity/userLogsSchema"),
      require("./entity/announcementsSchema"),
      require("./entity/announcementUsersSchema"),
      require("./entity/leaveQuotasSchema"),
      require("./entity/designationSchema"),
      require("./entity/WorksheetSchema"),
      require("./entity/UserSchema"),
      require("./entity/projectSchema"),
      require("./entity/TechLabelSchema"),
      require("./entity/attendanceSchema"),
      require("./entity/roleSchema"),
      require("./entity/teamSchema"),
      require("./entity/feedbackSchema"),
      require("./entity/leaveSchema"),
      require("./entity/banksSchema"),
      require("./entity/payslipSchema"),
      require("./entity/brancheSchema"),
      require("./entity/assetsSchema"),
      require("./entity/holidaysSchema"),
      require("./entity/usersKYCDocsSchema"),
      require("./entity/sysNotificationsSchema"),
      require("./entity/annualLeavesSchema"),
      require("./entity/approvalSchema"),
      require("./entity/compensatoryLeavesSchema"),
      require("./entity/failedJobsSchema"),
      require("./entity/migrationsSchema"),
      require("./entity/passwordResetsSchema"),
      require("./entity/TechLabelSchema"),
      require("./entity/techLabelUsersSchema"),
      require("./entity/assetsItemsSchema"),
      require("./entity/biometricsSchema")
    ]
  });

  return connection;
};

module.exports = BaseConnection();