"use strict";

var router = require('express').Router();

var File = require('../models/file');

router.get('/:uuid', function _callee(req, res) {
  var file, filePath;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(File.findOne({
            uuid: req.params.uuid
          }));

        case 2:
          file = _context.sent;

          if (file) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.render('download', {
            error: 'Link has been expired.'
          }));

        case 5:
          filePath = "".concat(__dirname, "/../").concat(file.path);
          res.download(filePath);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=download.dev.js.map
