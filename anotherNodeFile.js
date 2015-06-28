var easyLogger = require('./lib/easyLogger')();

module.exports = {
    testLogger: function() {
        easyLogger.warn('$$$$ this is a test from anotherNodeFile.js');
    }
}