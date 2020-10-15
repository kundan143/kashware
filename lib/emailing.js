'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config()

const send_email = async (clientData, clientData2) => {
    try{
        var smtpTransport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASS
            }
        });
            clientData2.forEach(function (to, i , array) {

                let mailOptions = {
                    from: 'info@xelp.com',
                    subject: 'Hello  ',
                    text: 'Hello world?',
                    attachments: [
                        {
                            filename: clientData['filename'],
                            path: `./upload/${clientData['filename']}`
                        }
                    ],
                    html: `<b>New resume format is uploaded by HR, please download and upload from your profile</b>
                            <a href='${clientData['filename']}'>click to open</a>`
                };
                mailOptions.to = to;
              
                smtpTransport.sendMail(mailOptions, function (err) {
                  if (err) { 
                    console.log('Sending to ' + to + ' failed: ' + err);
                    return "error";
                  } else { 
                    console.log('Sent to ' + to);
                  }
              
                  if (i === clientData2.length - 1) { msg.transport.close(); }
                });
              });

              return "data"
    }catch(error){
        throw error;
    }
}

module.exports = {send_email};