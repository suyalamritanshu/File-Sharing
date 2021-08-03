"use strict";

var router = require('express').Router();

var File = require('../models/file');

router.get('/:uuid', function _callee(req, res) {
  var file;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(File.findOne({
            uuid: req.params.uuid
          }));

        case 3:
          file = _context.sent;

          if (file) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.render('download', {
            error: 'Link has expired.'
          }));

        case 6:
          return _context.abrupt("return", res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: "".concat(process.env.APP_BASE_URL, "/files/download/").concat(file.uuid)
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.render('download', {
            error: 'Something went wrong.'
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;
//# sourceMappingURL=show.dev.js.map
