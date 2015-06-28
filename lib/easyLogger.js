var ConsoleAdapter = require('./log_adapters/console-adapter');
require('./exceptions');

var easyLoggerInstance = null;

var modes = [
    'file',
    'mysql',
    'console'
]

var setOpts = {
    enable: true,
    modes: ['console'],
    filename: './node-easy-logger_output.log'
}

var adapters = [];

// private functions
function setupOpts(opts) {
    
    for (var propName in setOpts) {
        if (opts.hasOwnProperty(propName)) {
            setOpts[propName] = opts[propName];
        }
    }
}

function setupAdapter() {
    
    setOpts.modes.forEach(function(element, index, array){
        switch(element) {
            case 'file':
                break;
            case 'mysql':
                break;
            case 'console':
                adapters.push(new ConsoleAdapter());
                break;
            default:
                throw new LoggerException('Unknown logger mode');
        }
    });
    
}

// constructor
function EasyLogger(opts) {
    if (typeof opts !== 'undefined') {
        setupOpts(opts);
    }

    setupAdapter();
}

// public functions
EasyLogger.prototype.warn = function(msg) {
    
    if (setOpts.enable !== true) {
        return true;
    }
    
    adapters.forEach(function(element, index, array){
        element.log(msg);
    });
}

// export the class
//module.exports = EasyLogger;
module.exports = function(opts) {
    
    easyLoggerInstance = new EasyLogger(opts);
    
    if (null === easyLoggerInstance) {
        easyLoggerInstance = new EasyLogger(opts);
    }
    
    return easyLoggerInstance;
}