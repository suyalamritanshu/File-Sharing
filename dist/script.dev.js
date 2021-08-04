"use strict";

var File = require('./models/file');

var fs = require('fs');

var connectDB = require('./config/db');

connectDB();

function deleteData() {
  var pastDate, files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file;

  return regeneratorRuntime.async(function deleteData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
          _context.next = 3;
          return regeneratorRuntime.awrap(File.find({
            createdAt: {
              $lt: pastDate
            }
          }));

        case 3:
          files = _context.sent;

          if (!files.length) {
            _context.next = 40;
            break;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 8;
          _iterator = files[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 25;
            break;
          }

          file = _step.value;
          _context.prev = 12;
          fs.unlinkSync(file.path);
          _context.next = 16;
          return regeneratorRuntime.awrap(file.remove());

        case 16:
          console.log("successfully deleted. ".concat(file.filename));
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](12);
          console.log("Error while deleting file. ".concat(_context.t0));

        case 22:
          _iteratorNormalCompletion = true;
          _context.next = 10;
          break;

        case 25:
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t1 = _context["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 31:
          _context.prev = 31;
          _context.prev = 32;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 34:
          _context.prev = 34;

          if (!_didIteratorError) {
            _context.next = 37;
            break;
          }

          throw _iteratorError;

        case 37:
          return _context.finish(34);

        case 38:
          return _context.finish(31);

        case 39:
          console.log('Job done!');

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 27, 31, 39], [12, 19], [32,, 34, 38]]);
}

deleteData().then(process.exit);
//# sourceMappingURL=script.dev.js.map
