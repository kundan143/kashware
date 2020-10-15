require('dotenv').config()

module.exports = {
    development: {
        port: process.env.DEV_PORT,
        DB_TYPE: process.env.DEV_DB_TYPE,
        DB_HOST: process.env.DEV_DB_HOST,
        DB_PORT: process.env.DEV_DB_PORT,
        DB_USERNAME : process.env.DEV_DB_USERNAME,
        DB_PASSWORD : process.env.DEV_DB_PASSWORD,
        DB_DATABASE : process.env.DEV_DB_DATABASE,
        MAIL_HOST: process.env.DEV_MAIL_HOST,
        MAIL_PORT: process.env.DEV_MAIL_PORT,
        MAIL_AUTH_USER: process.env.DEV_MAIL_AUTH_USER,
        MAIL_AUTH_PASS: process.env.DEV_MAIL_AUTH_PASS,
        RECIPIENTS: [
            'sushant.chauhan@xelpmoc.in',
            'nikhil.rao@xelpmoc.in',
            //'ankit.gaud@xelpmoc.in'
        ],
        MAIL_FROM: process.env.DEV_MAIL_FROM,
        FORGOT_PASSWORD_IP: process.env.DEV_FORGOT_PASSWORD_IP,
        MAIL_CC: process.env.DEV_MAIL_CC,
        JWT_SECRET: process.env.DEV_JWT_SECRET,
        DEFAULT_PROJECT_BANGALORE: process.env.DEV_DEFAULT_PROJECT_BANGALORE,
        DEFAULT_PROJECT_KOLKATA: process.env.DEV_DEFAULT_PROJECT_KOLKATA,
        DEFAULT_PROJECT_MUMBAI: process.env.DEV_DEFAULT_PROJECT_MUMBAI
      },
      production: {
        port: process.env.PROD_PORT,
        DB_TYPE: process.env.PROD_DB_TYPE,
        DB_HOST: process.env.PROD_DB_HOST,
        DB_PORT: process.env.PROD_DB_PORT,
        DB_USERNAME : process.env.PROD_DB_USERNAME,
        DB_PASSWORD : process.env.PROD_DB_PASSWORD,
        DB_DATABASE : process.env.PROD_DB_DATABASE,
        MAIL_HOST: process.env.PROD_MAIL_HOST,
        MAIL_PORT: process.env.PROD_MAIL_PORT,
        MAIL_AUTH_USER: process.env.PROD_MAIL_AUTH_USER,
        MAIL_AUTH_PASS: process.env.PROD_MAIL_AUTH_PASS,
        RECIPIENTS: [],
        MAIL_FROM: process.env.PROD_MAIL_FROM,
        FORGOT_PASSWORD_IP: process.env.PROD_FORGOT_PASSWORD_IP,
        MAIL_CC: process.env.PROD_MAIL_CC,
        JWT_SECRET: process.env.PROD_JWT_SECRET,
        DEFAULT_PROJECT_BANGALORE: process.env.PROD_DEFAULT_PROJECT_BANGALORE,
        DEFAULT_PROJECT_KOLKATA: process.env.PROD_DEFAULT_PROJECT_KOLKATA,
        DEFAULT_PROJECT_MUMBAI: process.env.PROD_DEFAULT_PROJECT_MUMBAI
      },
}