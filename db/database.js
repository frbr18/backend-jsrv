const sqlite3 = require('sqlite3');

module.exports = (function () {
    return new sqlite3.Database('./db/texts.sqlite');
}());