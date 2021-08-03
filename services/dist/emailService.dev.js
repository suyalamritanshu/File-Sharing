"use strict";

var nodemailer = require("nodemailer");

module.exports = function _callee(_ref) {
  var from, to, subject, text, html, transporter, info;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          from = _ref.from, to = _ref.to, subject = _ref.subject, text = _ref.text, html = _ref.html;
          transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            // true for 465, false for other ports
            auth: {
              user: process.env.MAIL_USER,
              // generated ethereal user
              pass: process.env.MAIL_PASS // generated ethereal password

            }
          }); // send mail with defined transport object

          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: "inShare <".concat(from, ">"),
            // sender address
            to: to,
            // list of receivers
            subject: subject,
            // Subject line
            text: text,
            // plain text body
            html: html // html body

          }));

        case 4:
          info = _context.sent;
          console.log(info);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};
//# sourceMappingURL=emailService.dev.js.map
