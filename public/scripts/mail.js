/* eslint no-console: 0 */

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const mailNewPoll = async function(poll) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Decision Makr" <decision@makr.com>', // sender address
    to: `${poll.creator_email}`, // list of receivers
    subject: "Your New Poll", // Subject line
    html: `
    <b> Congrats on making a your poll: ${poll.title}! </b>
    <p> You can find your administrative link here: localhost:8080/admin/${poll.admin_link} (This includes the current results of the poll). </p>
    <p> And this is the link to share for voting: localhost:8080/vote/${poll.voter_link} </p>
    </br>
    <p> Happy voting! </p>
      `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

const mailNewVote = async function(poll, voter_name) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Decision Makr" <decision@makr.com>', // sender address
    to: `${poll.creator_email}`, // list of receivers
    subject: "Votes on Your Poll", // Subject line
    html: `
    <b> ${voter_name} has voted on your poll: ${poll.title}! </b>
    <p> You can find your administrative link here: localhost:8080/admin/${poll.admin_link} (This includes the current results of the poll). </p>
    <p> And this is the link to share for voting: localhost:8080/vote/${poll.voter_link} </p>
    </br>
    <p> Happy voting! </p>
      `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = {
  mailNewPoll,
  mailNewVote
};


