const nodemailer = require('nodemailer');
const { getConnection } = require('typeorm');
const Users = require("../classModel/usersClass").Users;
var credentials = require("../helper/credentials")
require('dotenv').config()

const get_email = async(clientdata) => {
  try {
    console.log("add_email", clientdata);
    const data = await getConnection()
      .getRepository(Users)
      .createQueryBuilder("user")
      .where("user.id = :user_id", { user_id: clientdata.user_id })
      .select([
        "user.xelp_email as Email",
        "user.first_name as fname",
        "user.last_name as lname"
      ])
      .getRawOne()
    return data;
  }
  catch (error) {
    throw error;
  }
}


const send_mail_oncreate = async(clientdata, clientdata2) => {
  try {

    if (process.env.NODE_ENV == "development") {
      var mail_of_employee = credentials[process.env.NODE_ENV].RECIPIENTS
    }else{
      if (clientdata.role_id == '4' && process.env.NODE_ENV == "production") {
        var mail_of_employee = clientdata.email_id
      }
      if(clientdata.role_id == '6' && process.env.NODE_ENV == "production") {
        var mail_of_employee = clientdata.xelp_email
      }
    }

    if (clientdata.role_id == '4') {
      var mail_of_employee1 = clientdata.email_id
    }
    if(clientdata.role_id == '6') {
      var mail_of_employee1 = clientdata.xelp_email
    }

    let transporter = nodemailer.createTransport({
      host: credentials[process.env.NODE_ENV].MAIL_HOST,
      port: credentials[process.env.NODE_ENV].MAIL_PORT,
      secure: false,
      auth: {
        user: credentials[process.env.NODE_ENV].MAIL_AUTH_USER,
        pass: credentials[process.env.NODE_ENV].MAIL_AUTH_PASS
      }
    });

    let mailOptions = {
      from: credentials[process.env.NODE_ENV].MAIL_FROM,
      to: mail_of_employee,
      cc: credentials[process.env.NODE_ENV].MAIL_CC,
      subject: 'New user created',
      text: '',
      html: `    `
    };


    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      }
      else {
        console.log("Email sent!!!!");
      }
    });
  }
  catch (error) {
    throw error
  }
}

const mail_generate_report = async(clientdata2) => {
  try {
    if (process.env.NODE_ENV == "development") {
      var date_email = credentials[process.env.NODE_ENV].RECIPIENTS
    }
    else {
      let dataemail = await get_email(clientdata2)
      var date_email = dataemail.Email
    }


    let name_of_you = await getConnection()
      .getRepository(Users)
      .createQueryBuilder("usr")
      .where(" usr.id = :id", {
        id: clientdata2.user_id
      })
      .select()
      .getMany()

    //console.log(clientdata2, name_of_you[0].first_name)

    let transporter = nodemailer.createTransport({
      host: credentials[process.env.NODE_ENV].MAIL_HOST,
      port: credentials[process.env.NODE_ENV].MAIL_PORT,
      secure: false,
      auth: {
        user: credentials[process.env.NODE_ENV].MAIL_AUTH_USER,
        pass: credentials[process.env.NODE_ENV].MAIL_AUTH_PASS
      }
    });

    let mailOptions = {
      from: credentials[process.env.NODE_ENV].MAIL_FROM,
      to: date_email,
      subject: 'report ',
      text: 'report of employee',
      html: `<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml><![endif]-->
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <meta content="width=device-width" name="viewport"/>
      <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
      <!--<![endif]-->
      <title></title>
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
      <!--<![endif]-->
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
        }
    
        table,
        td,
        tr {
          vertical-align: top;
          border-collapse: collapse;
        }
    
        * {
          line-height: inherit;
        }
    
        a[x-apple-data-detectors=true] {
          color: inherit !important;
          text-decoration: none !important;
        }
      </style>
      <style id="media-query" type="text/css">
        @media (max-width: 520px) {
    
          .block-grid,
          .col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
    
          .block-grid {
            width: 100% !important;
          }
    
          .col {
            width: 100% !important;
          }
    
          .col > div {
            margin: 0 auto;
          }
    
          img.fullwidth,
          img.fullwidthOnMobile {
            max-width: 100% !important;
          }
    
          .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important;
          }
    
          .no-stack.two-up .col {
            width: 50% !important;
          }
    
          .no-stack .col.num4 {
            width: 33% !important;
          }
    
          .no-stack .col.num8 {
            width: 66% !important;
          }
    
          .no-stack .col.num4 {
            width: 33% !important;
          }
    
          .no-stack .col.num3 {
            width: 25% !important;
          }
    
          .no-stack .col.num6 {
            width: 50% !important;
          }
    
          .no-stack .col.num9 {
            width: 75% !important;
          }
    
          .video-block {
            max-width: none !important;
          }
    
          .mobile_hide {
            min-height: 0px;
            max-height: 0px;
            max-width: 0px;
            display: none;
            overflow: hidden;
            font-size: 0px;
          }
    
          .desktop_hide {
            display: block !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    
    <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
    <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
           style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"
           valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top;" valign="top">
          <div style="background-color:transparent;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div align="center" class="img-container center fixedwidth"
                           style="padding-right: 10px;padding-left: 10px;">
                        <div style="font-size:1px;line-height:10px"> </div>
                        <img align="center" alt="Alternate text" border="0" class="center fixedwidth"
                             src="https://intranet.xelpmoc.in/emp-backend/images/xelp_logo.png"
                             style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 125px; display: block;"
                             title="Alternate text" width="125"/>
                        <div style="font-size:1px;line-height:10px"> </div>
                      </div>
                      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
                             style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                             valign="top" width="100%">
                        <tbody>
                        <tr style="vertical-align: top;" valign="top">
                          <td class="divider_inner"
                              style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;"
                              valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
                                   role="presentation"
                                   style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;"
                                   valign="top" width="100%">
                              <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                    style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                    valign="top">
                                  <span></span></td>
                              </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <div
                          style="color:#555555;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; color: #555555; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                          <p
                              style="line-height: 1.2; word-break: break-word; font-size: 18px; mso-line-height-alt: 22px; margin: 0;">
                            <span style="font-size: 18px;">Dear ${name_of_you[0].first_name} ${name_of_you[0].last_name}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="background-color:transparent;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #77c09e;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:#77c09e;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;">
                      <div
                          style="color:#363434;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:15px;padding-right:15px;padding-bottom:15px;padding-left:15px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; color: #363434; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                          <p
                              style="line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: NaNpx; margin: 0;">
                                <span style="color: #ffffff;"><span style="font-size: 16px;">A new report is generated by you from dashboard</span></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="background-color:#ffffff;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div
                          style="color:#363434;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.8;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                        <div
                            style="line-height: 1.8; font-size: 12px; color: #363434; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 22px;">
                          <p
                              style="line-height: 1.8; word-break: break-word; font-size: 14px; mso-line-height-alt: 25px; margin: 0;">
                            <span style="font-size: 14px;">You can download file in xls format</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
    
          <div style="background-color:#ffffff;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div
                          style="color:#555555;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:25px;padding-right:25px;padding-bottom:25px;padding-left:25px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                          <p
                              style="font-size: 12px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;">
                            <span style="font-size: 12px;">- Made by the Team @ {Xelp}</span></p>
                        </div>
                      </div>
                      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
                             style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                             valign="top" width="100%">
                        <tbody>
                        <tr style="vertical-align: top;" valign="top">
                          <td class="divider_inner"
                              style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;"
                              valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
                                   role="presentation"
                                   style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;"
                                   valign="top" width="100%">
                              <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                    style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                    valign="top">
                                  <span></span></td>
                              </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <div
                          style="color:#555555;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:25px;padding-right:25px;padding-bottom:25px;padding-left:25px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;">
                          <p
                              style="font-size: 11px; line-height: 1.2; word-break: break-word; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 13px; margin: 0;">
                                <span style="font-size: 11px;">If you have are unable to login, please reach back out on
                                   <a href="mailto:ajay@xelpmoc.in">ajay@xelpmoc.in</a></span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    </body>
    
    </html>
    `,
      attachments: [{
        filename: 'file1.xls',
        path: `file1.xls`
      }]
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      }
      else {
        console.log("Email sent!!!!");
      }
    });
  }
  catch (error) {
    throw error
  }
}


const send_mail_onupdate = async(clientdata, clientdata2) => {
  try {
    let dataemail = await get_email(clientdata2)
    if (process.env.NODE_ENV == "development") {
      var date_email = credentials[process.env.NODE_ENV].RECIPIENTS
    }
    else {
      var date_email = dataemail.Email
    }

    if (clientdata.role_id == '4') {
      var mail_of_employee = clientdata.email_id
    }
    else {
      var mail_of_employee = clientdata.xelp_email
    }

    let transporter = nodemailer.createTransport({
      host: credentials[process.env.NODE_ENV].MAIL_HOST,
      port: credentials[process.env.NODE_ENV].MAIL_PORT,
      secure: false,
      auth: {
        user: credentials[process.env.NODE_ENV].MAIL_AUTH_USER,
        pass: credentials[process.env.NODE_ENV].MAIL_AUTH_PASS
      }
    });

    let mailOptions = {
      from: credentials[process.env.NODE_ENV].MAIL_FROM,
      to: date_email,
      subject: 'Update user detail!',
      text: 'Hi ',
      cc: credentials[process.env.NODE_ENV].MAIL_CC,
      html: `<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml><![endif]-->
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <meta content="width=device-width" name="viewport"/>
      <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
      <!--<![endif]-->
      <title></title>
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
      <!--<![endif]-->
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
        }
    
        table,
        td,
        tr {
          vertical-align: top;
          border-collapse: collapse;
        }
    
        * {
          line-height: inherit;
        }
    
        a[x-apple-data-detectors=true] {
          color: inherit !important;
          text-decoration: none !important;
        }
      </style>
      <style id="media-query" type="text/css">
        @media (max-width: 520px) {
    
          .block-grid,
          .col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
    
          .block-grid {
            width: 100% !important;
          }
    
          .col {
            width: 100% !important;
          }
    
          .col > div {
            margin: 0 auto;
          }
    
          img.fullwidth,
          img.fullwidthOnMobile {
            max-width: 100% !important;
          }
    
          .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important;
          }
    
          .no-stack.two-up .col {
            width: 50% !important;
          }
    
          .no-stack .col.num4 {
            width: 33% !important;
          }
    
          .no-stack .col.num8 {
            width: 66% !important;
          }
    
          .no-stack .col.num4 {
            width: 33% !important;
          }
    
          .no-stack .col.num3 {
            width: 25% !important;
          }
    
          .no-stack .col.num6 {
            width: 50% !important;
          }
    
          .no-stack .col.num9 {
            width: 75% !important;
          }
    
          .video-block {
            max-width: none !important;
          }
    
          .mobile_hide {
            min-height: 0px;
            max-height: 0px;
            max-width: 0px;
            display: none;
            overflow: hidden;
            font-size: 0px;
          }
    
          .desktop_hide {
            display: block !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    
    <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
    <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
           style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"
           valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top;" valign="top">
          <div style="background-color:transparent;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div align="center" class="img-container center fixedwidth"
                           style="padding-right: 10px;padding-left: 10px;">
                        <div style="font-size:1px;line-height:10px"> </div>
                        <img align="center" alt="Alternate text" border="0" class="center fixedwidth"
                             src="https://intranet.xelpmoc.in/emp-backend/images/xelp_logo.png"
                             style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 125px; display: block;"
                             title="Alternate text" width="125"/>
                        <div style="font-size:1px;line-height:10px"> </div>
                      </div>
                      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
                             style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                             valign="top" width="100%">
                        <tbody>
                        <tr style="vertical-align: top;" valign="top">
                          <td class="divider_inner"
                              style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;"
                              valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
                                   role="presentation"
                                   style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;"
                                   valign="top" width="100%">
                              <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                    style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                    valign="top">
                                  <span></span></td>
                              </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <div
                          style="color:#555555;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; color: #555555; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                          <p
                              style="line-height: 1.2; word-break: break-word; font-size: 18px; mso-line-height-alt: 22px; margin: 0;">
                            <span style="font-size: 18px;">Dear ${dataemail.fname} ${dataemail.lname}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="background-color:transparent;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #77c09e;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:#77c09e;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;">
                      <div
                          style="color:#363434;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:15px;padding-right:15px;padding-bottom:15px;padding-left:15px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; color: #363434; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                          <p
                              style="line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: NaNpx; margin: 0;">
                                <span style="color: #ffffff;"><span style="font-size: 16px;"> You have updated an employee!</span></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div style="background-color:#ffffff;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div
                          style="color:#363434;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.8;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                        <div
                            style="line-height: 1.8; font-size: 12px; color: #363434; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 22px;">
                          <p
                              style="line-height: 1.8; word-break: break-word; font-size: 14px; mso-line-height-alt: 25px; margin: 0;">
                            <span style="font-size: 14px;">Employee details - </span>
                          </p>
                        </div>
                      </div>
                      <div
                          style="color:#555555;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;line-height:1.8;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                        <div
                            style="line-height: 1.8; font-size: 12px; color: #555555; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 22px;">
                          <ul>
                            <li style="line-height: 1.8; font-size: 14px; mso-line-height-alt: 25px;"><span
                                  style="font-size: 14px;">First Name - ${clientdata.first_name} </span>
                            </li>
                            <li style="line-height: 1.8; font-size: 14px; mso-line-height-alt: 25px;"><span
                                  style="font-size: 14px;">Last Name - ${clientdata.last_name}</span>
                            </li>
                            <li style="line-height: 1.8; font-size: 14px; mso-line-height-alt: 25px;"><span
                                  style="font-size: 14px;">User Id - ${clientdata.emp_id}</span>
                            </li>
                            <li style="line-height: 1.8; font-size: 14px; mso-line-height-alt: 25px;"><span
                                  style="font-size: 14px;">Xelp Id - ${clientdata.xelp_id}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div style="background-color:#f8f8f8;">
            <div class="block-grid mixed-two-up"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <div class="col num4"
                     style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 164px; width: 166px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div align="center" class="img-container center autowidth"
                           style="padding-right: 0px;padding-left: 0px;">
                        <img align="center" alt="I'm an image" border="0" class="center autowidth"
                             src="https://intranet.xelpmoc.in/emp-backend/images/right.png"
                             style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 121px; display: block;"
                             title="I'm an image" width="121"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col num8"
                     style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 328px; width: 333px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div
                          style="color:#555555;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;">
                          <p
                              style="font-size: 14px; line-height: 1.2; text-align: left; word-break: break-word; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 17px; margin: 0;">
                            Below are your login credentials</p>
                        </div>
                      </div>
                      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
                             style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                             valign="top" width="100%">
                        <tbody>
                        <tr style="vertical-align: top;" valign="top">
                          <td class="divider_inner"
                              style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;"
                              valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
                                   role="presentation"
                                   style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;"
                                   valign="top" width="100%">
                              <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                    style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                    valign="top">
                                  <span></span></td>
                              </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <div
                          style="color:#555555;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;">
                          <p
                              style="line-height: 1.2; word-break: break-word; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: NaNpx; margin: 0;">
                              <a href="mailto:${mail_of_employee}">${mail_of_employee}</a></p>
                          <p
                              style="line-height: 1.2; word-break: break-word; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: NaNpx; margin: 0;">
                            <br/>123456789 (Please do change your password once you login)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div style="background-color:#f8f8f8;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div align="center" class="button-container"
                           style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                        <a href="https://intranet.xelpmoc.in" target="_blank"
                            style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#77c09e;border-radius:4px;-webkit-border-radius:4px;
                        -moz-border-radius:4px;width:auto; width:auto;border-top:1px solid #77c09e;border-right:1px solid #77c09e;border-bottom:1px solid #77c09e;border-left:1px solid #77c09e;padding-top:5px;padding-bottom:5px;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;">
                              <span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;"><span style="font-size: 16px; margin: 0;
                              line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Get Started</span></span>
                        </a>
                      </div>
                      <div
                          style="color:#aaaaaa;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; color: #aaaaaa; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                          <p
                              style="font-size: 10px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 12px; margin: 0;">
                                <span style="font-size: 10px; color: #808080;">If the above button does not work use this
                                  link: <span style="color: #339966;">https://intranet.xelpmoc.in/</span></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div style="background-color:#ffffff;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div
                          style="color:#555555;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:25px;padding-right:25px;padding-bottom:25px;padding-left:25px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                          <p
                              style="font-size: 12px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;">
                            <span style="font-size: 12px;">- Made by the Team @ {Xelp}</span></p>
                        </div>
                      </div>
                      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
                             style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                             valign="top" width="100%">
                        <tbody>
                        <tr style="vertical-align: top;" valign="top">
                          <td class="divider_inner"
                              style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;"
                              valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
                                   role="presentation"
                                   style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;"
                                   valign="top" width="100%">
                              <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                    style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                    valign="top">
                                  <span></span></td>
                              </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <div
                          style="color:#555555;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:25px;padding-right:25px;padding-bottom:25px;padding-left:25px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;">
                          <p
                              style="font-size: 11px; line-height: 1.2; word-break: break-word; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 13px; margin: 0;">
                                <span style="font-size: 11px;">If you have are unable to login, please reach back out on
                                   <a href="mailto:ajay@xelpmoc.in">ajay@xelpmoc.in</a></span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    </body>
    
    </html>
    `
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      }
      else {
        console.log("Email sent!!!!");
      }
    });

    return

  }
  catch (error) {
    throw error
  }
}


const send_mail_on_forgot_password = async(clientdata, clientdata2) => {
  try {
    let dataemail = clientdata.email

    if (process.env.NODE_ENV == "development") {
      var date_email1 = credentials[process.env.NODE_ENV].RECIPIENTS
    }
    else {
      var date_email1 = dataemail
    }

    console.log(date_email1)

    const user_name = await getConnection()
      .getRepository(Users)
      .createQueryBuilder("user")
      .where("user.status = 1 and user.xelp_email = :email", {
        email: clientdata.email
      })
      .select(['user.first_name as first_name', 'user.last_name as last_name'])
      .getRawMany()


    let transporter = nodemailer.createTransport({
      host: credentials[process.env.NODE_ENV].MAIL_HOST,
      port: credentials[process.env.NODE_ENV].MAIL_PORT,
      secure: false,
      auth: {
        user: credentials[process.env.NODE_ENV].MAIL_AUTH_USER,
        pass: credentials[process.env.NODE_ENV].MAIL_AUTH_PASS
      }
    });
    let mailOptions = {
      from: credentials[process.env.NODE_ENV].MAIL_FROM,
      to: date_email1,
      subject: 'mail for forgot password',
      text: 'forgot password',
      html: `
      <!DOCTYPE html>
      <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
      
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Xelp-Intranet</title>      
      </head>
      
      <body style="padding: 10px;">
      <p>
      <p>Hello ${user_name[0].first_name} ${user_name[0].last_name}</p>
      
      <p> You are receiving this email because you requested for a password reset, if you did please go ahead and reset your password. </p>
      
      <a target="_blank" rel="noopener noreferrer" href="${credentials[process.env.NODE_ENV].FORGOT_PASSWORD_IP}management/session/update-password?email=${clientdata.email}&token=${clientdata2}"
         class="" style="font-family: -apple-system,
             BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
             box-sizing: border-box;
             border-radius: 3px;
             box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
             color: #fff;
             display: inline-block;
             text-decoration: none;
             padding: 8px 16px;
             font-size: 18px;
             -webkit-text-size-adjust: none;
             background-color: #77C09E;
             border-top: 1px solid rgba(0, 0, 0, 0.16);
             border-right: 1px solid rgba(0, 0, 0, 0.16);
             border-bottom: 1px solid rgba(0, 0, 0, 0.16);
             border-left: 1px solid rgba(0, 0, 0, 0.16);
          "
      >
      Reset Password
      </a>
      
      <p> If the button doesn’t work use this link: <a href="${credentials[process.env.NODE_ENV].FORGOT_PASSWORD_IP}management/session/update-password?email=${clientdata.email}&token=${clientdata2}" target="_blank">${credentials[process.env.NODE_ENV].FORGOT_PASSWORD_IP}management/session/update-password?email=${clientdata.email}&token=${clientdata2}</a></p>
      
      <p> If you did not request for a password reset, you can ignore this email. Your password will remain the same </p>
      
      <br>
      
      <footer>
        Thank you, <br>
        Team @ {Xelp}
        <br>
        <p style="font-style: italic; font-size: 13px">This is an automated message. Any email sent to this email address will not be answered</p>
      </footer>
      </body>
      
      </html>`
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      }
      else {
        console.log("Email sent!!!!");
      }
    });

  }
  catch (error) {
    throw error
  }
}


const mail_regard_appointment_to_hr = async(clientdata, clientdata2) => {
  try {

    let name_of_you = await getConnection()
      .getRepository(Users)
      .createQueryBuilder("usr")
      .where(" usr.status = 1 and usr.role_id = 5")
      .select()
      .getOne()

    if (process.env.NODE_ENV == "development") {
      var date_email = credentials[process.env.NODE_ENV].RECIPIENTS
    }
    else {
      var date_email = name_of_you.xelp_email
    }

    let transporter = nodemailer.createTransport({
      host: credentials[process.env.NODE_ENV].MAIL_HOST,
      port: credentials[process.env.NODE_ENV].MAIL_PORT,
      secure: false,
      auth: {
        user: credentials[process.env.NODE_ENV].MAIL_AUTH_USER,
        pass: credentials[process.env.NODE_ENV].MAIL_AUTH_PASS
      }
    });


    let html_table = ``

    for (i in clientdata2) {
      html_table += `<tr>
                        <td>${clientdata2[i].emp_id}</td>
                        <td>${clientdata2[i].first_name}</td>
                        <td>${clientdata2[i].last_name}</td>
                        <td>${clientdata2[i].email}</td>
                    </tr>`
    }

    let mailOptions = {
      from: credentials[process.env.NODE_ENV].MAIL_FROM,
      to: date_email,
      subject: 'Appointment of employee',
      text: 'Appointment letter status',
      html: `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml><![endif]-->
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
  <meta content="width=device-width" name="viewport"/>
  <!--[if !mso]><!-->
  <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
  <!--<![endif]-->
  <title></title>
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
  <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css"/>
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css"/>
  <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css"/>
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <!--<![endif]-->
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
    }

    table,
    td,
    tr {
      vertical-align: top;
      border-collapse: collapse;
    }

    * {
      line-height: inherit;
    }

    a[x-apple-data-detectors=true] {
      color: inherit !important;
      text-decoration: none !important;
    }
  </style>
  <style id="media-query" type="text/css">
    @media (max-width: 520px) {

      .block-grid,
      .col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }

      .block-grid {
        width: 100% !important;
      }

      .col {
        width: 100% !important;
      }

      .col > div {
        margin: 0 auto;
      }

      img.fullwidth,
      img.fullwidthOnMobile {
        max-width: 100% !important;
      }

      .no-stack .col {
        min-width: 0 !important;
        display: table-cell !important;
      }

      .no-stack.two-up .col {
        width: 50% !important;
      }

      .no-stack .col.num4 {
        width: 33% !important;
      }

      .no-stack .col.num8 {
        width: 66% !important;
      }

      .no-stack .col.num4 {
        width: 33% !important;
      }

      .no-stack .col.num3 {
        width: 25% !important;
      }

      .no-stack .col.num6 {
        width: 50% !important;
      }

      .no-stack .col.num9 {
        width: 75% !important;
      }

      .video-block {
        max-width: none !important;
      }

      .mobile_hide {
        min-height: 0px;
        max-height: 0px;
        max-width: 0px;
        display: none;
        overflow: hidden;
        font-size: 0px;
      }

      .desktop_hide {
        display: block !important;
        max-height: none !important;
      }
    }
  </style>
</head>

<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
<table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
       style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"
       valign="top" width="100%">
  <tbody>
  <tr style="vertical-align: top;" valign="top">
    <td style="word-break: break-word; vertical-align: top;" valign="top">
      <div style="background-color:transparent;">
        <div class="block-grid"
             style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
            <div class="col num12"
                 style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
              <div style="width:100% !important;">
                <div
                    style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                  <div align="center" class="img-container center fixedwidth"
                       style="padding-right: 10px;padding-left: 10px;">
                    <div style="font-size:1px;line-height:10px"> </div>
                    <img align="center" alt="Alternate text" border="0" class="center fixedwidth"
                         src="https://intranet.xelpmoc.in/emp-backend/images/xelp_logo.png"
                         style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 125px; display: block;"
                         title="Alternate text" width="125"/>
                    <div style="font-size:1px;line-height:10px"> </div>
                  </div>
                  <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
                         style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                         valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                      <td class="divider_inner"
                          style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;"
                          valign="top">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
                               role="presentation"
                               style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;"
                               valign="top" width="100%">
                          <tbody>
                          <tr style="vertical-align: top;" valign="top">
                            <td
                                style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                valign="top">
                              <span></span></td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div
                      style="color:#555555;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">
                    <div
                        style="line-height: 1.2; font-size: 12px; color: #555555; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                      <p
                          style="line-height: 1.2; word-break: break-word; font-size: 18px; mso-line-height-alt: 22px; margin: 0;">
                        <span style="font-size: 18px;">Dear ${name_of_you.first_name} ${name_of_you.last_name}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="background-color:transparent;">
        <div class="block-grid"
             style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #77c09e;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#77c09e;">
            <div class="col num12"
                 style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
              <div style="width:100% !important;">
                <div
                    style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;">
                  <div
                      style="color:#363434;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:15px;padding-right:15px;padding-bottom:15px;padding-left:15px;">
                    <div
                        style="line-height: 1.2; font-size: 12px; color: #363434; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                      <p
                          style="line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: NaNpx; margin: 0;">
                            <span style="color: #ffffff;"><span style="font-size: 16px;">Appointment letter status</span></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="background-color:#ffffff;">
        <div class="block-grid"
             style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
            <div class="col num12"
                 style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
              <div style="width:100% !important;">
                <div
                    style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                  <div
                      style="color:#363434;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.8;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                    <div
                        style="line-height: 1.8; font-size: 12px; color: #363434; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 22px;">
                      <p
                          style="line-height: 1.8; word-break: break-word; font-size: 14px; mso-line-height-alt: 25px; margin: 0;">
                        <span style="font-size: 14px;">You didn't send appointment or update appointment of following employees - </span><br>
                        <table class="table">
                            <thead>
                              <tr>
                                <th>Xelp ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                              </tr>
                            </thead>
                            <tbody>
                                ${html_table}
                            </tbody>
                          </table>

                        <p></p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <div style="background-color:#ffffff;">
        <div class="block-grid"
             style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
            <div class="col num12"
                 style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
              <div style="width:100% !important;">
                <div
                    style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                  <div
                      style="color:#555555;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:25px;padding-right:25px;padding-bottom:25px;padding-left:25px;">
                    <div
                        style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                      <p
                          style="font-size: 12px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;">
                        <span style="font-size: 12px;">- Made by the Team @ {Xelp}</span></p>
                    </div>
                  </div>
                  <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
                         style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                         valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                      <td class="divider_inner"
                          style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;"
                          valign="top">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
                               role="presentation"
                               style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;"
                               valign="top" width="100%">
                          <tbody>
                          <tr style="vertical-align: top;" valign="top">
                            <td
                                style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                valign="top">
                              <span></span></td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div
                      style="color:#555555;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:25px;padding-right:25px;padding-bottom:25px;padding-left:25px;">
                    <div
                        style="line-height: 1.2; font-size: 12px; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;">
                      <p
                          style="font-size: 11px; line-height: 1.2; word-break: break-word; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 13px; margin: 0;">
                            <span style="font-size: 11px;">If you have are unable to login, please reach back out on
                               <a href="mailto:ajay@xelpmoc.in">ajay@xelpmoc.in</a></span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
  </tbody>
</table>
</body>

</html>
`
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      }
      else {
        console.log("Email sent!!!!");
      }
    });
  }
  catch (error) {
    throw error
  }
}

const mail_generate_report_finance = async (param_data)=>{
  try{
    let dataemail = await get_email(param_data)
     if (process.env.NODE_ENV == "development") {
      var date_email = credentials[process.env.NODE_ENV].RECIPIENTS
    }
    else {
      var date_email = dataemail.Email
    }

    let transporter = nodemailer.createTransport({
      host: credentials[process.env.NODE_ENV].MAIL_HOST,
      port: credentials[process.env.NODE_ENV].MAIL_PORT,
      secure: false,
      auth: {
        user: credentials[process.env.NODE_ENV].MAIL_AUTH_USER,
        pass: credentials[process.env.NODE_ENV].MAIL_AUTH_PASS
      }
    });

    let mailOptions = {
      from: credentials[process.env.NODE_ENV].MAIL_FROM,
      to: date_email,
      subject: 'report ',
      text: 'report of employee',
      html: `<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml><![endif]-->
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <meta content="width=device-width" name="viewport"/>
      <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
      <!--<![endif]-->
      <title></title>
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
      <!--<![endif]-->
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
        }
    
        table,
        td,
        tr {
          vertical-align: top;
          border-collapse: collapse;
        }
    
        * {
          line-height: inherit;
        }
    
        a[x-apple-data-detectors=true] {
          color: inherit !important;
          text-decoration: none !important;
        }
      </style>
      <style id="media-query" type="text/css">
        @media (max-width: 520px) {
    
          .block-grid,
          .col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
    
          .block-grid {
            width: 100% !important;
          }
    
          .col {
            width: 100% !important;
          }
    
          .col > div {
            margin: 0 auto;
          }
    
          img.fullwidth,
          img.fullwidthOnMobile {
            max-width: 100% !important;
          }
    
          .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important;
          }
    
          .no-stack.two-up .col {
            width: 50% !important;
          }
    
          .no-stack .col.num4 {
            width: 33% !important;
          }
    
          .no-stack .col.num8 {
            width: 66% !important;
          }
    
          .no-stack .col.num4 {
            width: 33% !important;
          }
    
          .no-stack .col.num3 {
            width: 25% !important;
          }
    
          .no-stack .col.num6 {
            width: 50% !important;
          }
    
          .no-stack .col.num9 {
            width: 75% !important;
          }
    
          .video-block {
            max-width: none !important;
          }
    
          .mobile_hide {
            min-height: 0px;
            max-height: 0px;
            max-width: 0px;
            display: none;
            overflow: hidden;
            font-size: 0px;
          }
    
          .desktop_hide {
            display: block !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    
    <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
    <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
           style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"
           valign="top" width="100%">
      <tbody>
      <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top;" valign="top">
          <div style="background-color:transparent;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div align="center" class="img-container center fixedwidth"
                           style="padding-right: 10px;padding-left: 10px;">
                        <div style="font-size:1px;line-height:10px"> </div>
                        <img align="center" alt="Alternate text" border="0" class="center fixedwidth"
                             src="https://intranet.xelpmoc.in/emp-backend/images/xelp_logo.png"
                             style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 125px; display: block;"
                             title="Alternate text" width="125"/>
                        <div style="font-size:1px;line-height:10px"> </div>
                      </div>
                      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
                             style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                             valign="top" width="100%">
                        <tbody>
                        <tr style="vertical-align: top;" valign="top">
                          <td class="divider_inner"
                              style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;"
                              valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
                                   role="presentation"
                                   style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;"
                                   valign="top" width="100%">
                              <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                    style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                    valign="top">
                                  <span></span></td>
                              </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <div
                          style="color:#555555;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; color: #555555; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                          <p
                              style="line-height: 1.2; word-break: break-word; font-size: 18px; mso-line-height-alt: 22px; margin: 0;">
                            <span style="font-size: 18px;">Dear ${dataemail.fname} ${dataemail.lname}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="background-color:transparent;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #77c09e;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:#77c09e;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;">
                      <div
                          style="color:#363434;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:15px;padding-right:15px;padding-bottom:15px;padding-left:15px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; color: #363434; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                          <p
                              style="line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: NaNpx; margin: 0;">
                                <span style="color: #ffffff;"><span style="font-size: 16px;">A new report is generated by you from dashboard</span></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="background-color:#ffffff;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div
                          style="color:#363434;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.8;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                        <div
                            style="line-height: 1.8; font-size: 12px; color: #363434; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 22px;">
                          <p
                              style="line-height: 1.8; word-break: break-word; font-size: 14px; mso-line-height-alt: 25px; margin: 0;">
                            <span style="font-size: 14px;">You can download file in xls format</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
    
          <div style="background-color:#ffffff;">
            <div class="block-grid"
                 style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <div class="col num12"
                     style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                  <div style="width:100% !important;">
                    <div
                        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                      <div
                          style="color:#555555;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:25px;padding-right:25px;padding-bottom:25px;padding-left:25px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                          <p
                              style="font-size: 12px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;">
                            <span style="font-size: 12px;">- Made by the Team @ {Xelp}</span></p>
                        </div>
                      </div>
                      <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
                             style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                             valign="top" width="100%">
                        <tbody>
                        <tr style="vertical-align: top;" valign="top">
                          <td class="divider_inner"
                              style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;"
                              valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
                                   role="presentation"
                                   style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;"
                                   valign="top" width="100%">
                              <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                    style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                    valign="top">
                                  <span></span></td>
                              </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <div
                          style="color:#555555;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:25px;padding-right:25px;padding-bottom:25px;padding-left:25px;">
                        <div
                            style="line-height: 1.2; font-size: 12px; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;">
                          <p
                              style="font-size: 11px; line-height: 1.2; word-break: break-word; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 13px; margin: 0;">
                                <span style="font-size: 11px;">If you have are unable to login, please reach back out on
                                   <a href="mailto:ajay@xelpmoc.in">ajay@xelpmoc.in</a></span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    </body>
    
    </html>
    `,
      attachments: [{
        filename: 'project_report.xls',
        path: `project_report.xls`
      }]
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      }
      else {
        console.log("Email sent!!!!");
      }
    });
  }catch(error){
    throw error
  }
}

module.exports = {
  mail_regard_appointment_to_hr,
  send_mail_oncreate,
  mail_generate_report,
  send_mail_onupdate,
  send_mail_on_forgot_password,
  mail_generate_report_finance
}
