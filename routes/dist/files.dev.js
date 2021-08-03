"use strict";

var router = require('express').Router();

var multer = require('multer');

var path = require('path');

var File = require('../models/file');

var _require = require('uuid'),
    uuidv4 = _require.v4;

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    return cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    var uniqueName = "".concat(Date.now(), "-").concat(Math.round(Math.random() * 1E9)).concat(path.extname(file.originalname));
    cb(null, uniqueName);
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000 * 100
  }
}).single('myfile'); //100mb

router.post('/', function (req, res) {
  upload(req, res, function _callee(err) {
    var file, response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!err) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(500).send({
              error: err.message
            }));

          case 2:
            file = new File({
              filename: req.file.filename,
              uuid: uuidv4(),
              path: req.file.path,
              size: req.file.size
            });
            _context.next = 5;
            return regeneratorRuntime.awrap(file.save());

          case 5:
            response = _context.sent;
            res.json({
              file: "".concat(process.env.APP_BASE_URL, "/files/").concat(response.uuid)
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});
router.post('/send', function _callee2(req, res) {
  var _req$body, uuid, emailTo, emailFrom, expiresIn, file, response, sendMail;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, uuid = _req$body.uuid, emailTo = _req$body.emailTo, emailFrom = _req$body.emailFrom, expiresIn = _req$body.expiresIn;

          if (!(!uuid || !emailTo || !emailFrom)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(422).send({
            error: 'All fields are required except expiry.'
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(File.findOne({
            uuid: uuid
          }));

        case 5:
          file = _context2.sent;

          if (!file.sender) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(422).send({
            error: 'Email already sent once.'
          }));

        case 8:
          file.sender = emailFrom;
          file.receiver = emailTo;
          _context2.next = 12;
          return regeneratorRuntime.awrap(file.save());

        case 12:
          response = _context2.sent;
          // send mail
          sendMail = require('../services/emailService');
          sendMail({
            from: emailFrom,
            to: emailTo,
            subject: 'inShare file sharing',
            text: "".concat(emailFrom, " shared a file with you."),
            html: require('../services/emailTemplate')({
              emailFrom: emailFrom,
              downloadLink: "".concat(process.env.APP_BASE_URL, "/files/").concat(file.uuid),
              size: parseInt(file.size / 1000) + ' KB',
              expires: '24 hours'
            })
          });
          return _context2.abrupt("return", res.json({
            success: true
          }));

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=files.dev.js.map
