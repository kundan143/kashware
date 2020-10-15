const jwt = require("jsonwebtoken");
const { successRoute, route } = require("../controller/index");
const { loginEmployee } = require("../model/management/employeeModel");
const forgot_pass = require("../model/hr/forgotpasswordModel")
const bcrypt = require("bcrypt");
const mailing = require("./email")
require('dotenv').config()
var credentials = require("../helper/credentials")

if (process.env.NODE_ENV == "development") {
    var jwtKey = credentials[process.env.NODE_ENV].JWT_SECRET
    var ip__ = credentials[process.env.NODE_ENV].FORGOT_PASSWORD_IP
}
if (process.env.NODE_ENV == "production") {
    var jwtKey = credentials[process.env.NODE_ENV].JWT_SECRET
    var ip__ = credentials[process.env.NODE_ENV].FORGOT_PASSWORD_IP

}

const jwtExpirySeconds = 604800000;

const logInEmp = route(async function (req, res) {
    try {

        let { email, password } = req.body;
        let logdata = await loginEmployee(req.body);

        const userId = logdata.userId;
        const pass2 = logdata.password.replace(/^\$2y(.+)$/i, '$2a$1');

        // console.log(password, pass2)

        const match_password = await bcrypt.compare(password, pass2);
        //const password1 = logdata.password; 


        if (email == logdata.email || email == logdata.xelp_email) {
            if (!match_password) {
                return res.status(404).send({
                    message: "Wrong password!",
                    statusCode: "400",
                    requestUrl: `/v1${req.url}`
                }).end();
            }
        }
        else {
            return res.status(404).send({
                message: "Email doesn't exist for login",
                statusCode: "400",
                requestUrl: `/v1${req.url}`
            }).end();
        }

        const token = jwt.sign({ email, pass2, userId }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds
        });


        res.status(200).send({
            message: "Success",
            statusCode: 200,
            requestUrl: `/v1${req.url}`,
            method: "POST",
            results: {
                userId: logdata.userId,
                first_name: logdata.first_name,
                last_name: logdata.last_name,
                email: logdata.email,
                xelp_email: logdata.xelp_email,
                xelp_id: logdata.xelp_id,
                profile_pic: `https://intranet.xelpmoc.in/employee/static_file/${logdata.profile_pic}`,
                roleId: logdata.role_id,
                roleName: logdata.role_name,
                token: token
            }
        }).end();
    }
    catch (error) {
        console.log("Email and password are not found!")
        return res.status(404).send({
            message: "Email and password are not found!",
            statusCode: 400,
            requestUrl: `/v1${req.url}`,
            method: "POST",
        })
    }
}, {
    requiredFields: ["email", "password"]
});


const verify = async function (req, res, next) {
    try {
        try {
            var token = req.get("Authorization").slice(7);
        }
        catch (err) {
            res.status(401)
        }
        if (!token) {
            return res.status(401).send({
                message: "No token found!",
                statusCode: "404",
                requestUrl: `/v1/manager${req.url}`
            }).end();
        }

        var payload;
        try {
            payload = jwt.verify(token, jwtKey);
            if (payload.userId != req.params.user_id) {
                return res
                    .send({
                        message: "Invalid token",
                        statusCode: "401",
                        requestUrl: `/v1/manager${req.url}`
                    })
                    .end();
            }
        }
        catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).send({
                    message: "Invalid token",
                    statusCode: "401",
                    requestUrl: `/v1/manager${req.url}`
                }).end();
            }
            return res.status(401).end();
        }
        return next();

    }
    catch (error) {
        throw "error";
    }
}

const verify_for_password = async function (req, res, next) {
    try {
        try {
            var token = req.get("Authorization").slice(7);
        }
        catch (err) {
            res.status(401)
        }
        if (!token) {
            console.log("First")
            return res.status(401).send({
                message: "No token found!",
                statusCode: "404",
                requestUrl: `/v1/manager${req.url}`
            }).end();
        }

        var payload;
        try {
            payload = jwt.verify(token, jwtKey);
            console.log(payload);
            console.log(req.body);
            if (payload.mt != req.body.mail) {
                console.log("Second")
                return res
                    .send({
                        message: "Invalid token",
                        statusCode: "401",
                        requestUrl: `/v1/manager${req.url}`
                    })
                    .end();
            }
        }
        catch (error) {
            console.log("Third")
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).send({
                    message: "Invalid token",
                    statusCode: "401",
                    requestUrl: `/v1/manager${req.url}`
                }).end();
            }
            return res.status(401).end();
        }
        return next();

    }
    catch (error) {
        throw "error";
    }
}

const forgot_password = async(req, res) => {
    try {
        let pass_for = await forgot_pass.checkEmail(req.body)
        if (pass_for.length == 0) {
            return res.send({
                message: "We can't find a user with that email",
                statusCode: 200,
                requestUrl: `/api/v1${req.url}`,
                results: ""
            })
        }
        const mt = req.body.email

        console.log(req.body.email);
        const token11 = jwt.sign({ mt }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds
        });
        await mailing.send_mail_on_forgot_password(req.body, token11)
        return res.send({
            message: "link has been sent on your email",
            statusCode: 200,
            requestUrl: `/api/v1${req.url}`,
            results: ""
        })
    }
    catch (error) {
        throw error
    }
}

const change_password_forgot = async(req, res) => {
    try {
        if (req.body.password == req.body.confirm_password) {
            let cp = await forgot_pass.changePassword(req.body.password, req.body.mail)
            return res.send({
                message: "password reset successfully",
                statusCode: 200,
                requestUrl: `/api/v1${req.url}`,
                results: ""
            })
        }
        return res.send({
            message: "password and confirm not similar!",
            statusCode: 400,
            requestUrl: `/api/v1${req.url}`,
            results: ""
        })
    }
    catch (error) {
        throw error
    }
}



module.exports = {
    logInEmp,
    verify,
    forgot_password,
    change_password_forgot,
    verify_for_password
};
