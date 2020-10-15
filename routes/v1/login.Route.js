const express = require("express");
const router = express.Router();

const handler = require("../../lib/handler")

const {logInEmp, forgot_password, change_password_forgot} = require("../../lib/handler")

router.post("/login", logInEmp);

router.post("/forgot_password_hr_dashboard", forgot_password)

router.post("/change_password_on_link", handler.verify_for_password, change_password_forgot)

module.exports = router;