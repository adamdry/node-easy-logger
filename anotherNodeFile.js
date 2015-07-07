var easyLogger = require('./lib/easyLogger')();

console.log('another node file easy logger id: ' + easyLogger.id);

module.exports = {
    testLogger: function() {
        easyLogger.warn('$$$$ this is a test from anotherNodeFile.js');
    }
}