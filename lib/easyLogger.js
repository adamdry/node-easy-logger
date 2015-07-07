var ConsoleAdapter = require('./log_adapters/console-adapter');
require('./exceptions');

var globalEasyLogInst = null;

var modes = [
    'file',
    'mysql',
    'console'
]

var defaultOpts = {
    enable: true,
    modes: ['console'],
    filename: './node-easy-logger_output.log'
}

var adapters = null;

// private functions
function setupEasyLoggerOptsDefaults(easyLogInst) {
    easyLogInst.opts = {
        enable: true,
        modes: ['console'],
        filename: './node-easy-logger_output.log'
    };
}

function setupOpts(easyLogInst, opts) {
    
    for (var propName in easyLogInst.opts) {
        if (opts.hasOwnProperty(propName)) {
            easyLogInst.opts[propName] = opts[propName];
        }
    }
}

function setupAdapters(easyLogInst) {
    
    easyLogInst.adapters = [];
    
    easyLogInst.opts.modes.forEach(function(element, index, array){
        switch(element) {
            case 'file':
                break;
            case 'mysql':
                break;
            case 'console':
                easyLogInst.adapters.push(new ConsoleAdapter());
                break;
            default:
                throw new LoggerException('Unknown logger mode');
        }
    });
    
}

// constructor
function EasyLogger(opts) {
    
    setupEasyLoggerOptsDefaults(this);
    
    if (typeof opts !== 'undefined') {
        setupOpts(this, opts);
    }

    setupAdapters(this);
}

// public functions
EasyLogger.prototype.warn = function(msg) {
    
    if (this.opts.enable !== true) {
        return true;
    }
    
    this.adapters.forEach(function(adapter, index, array){
        adapter.log(msg);
    });
}

// export the class
module.exports.getGlobalLogger = function(opts) {
    if (null === globalEasyLogInst) {
        globalEasyLogInst = new EasyLogger(opts);
    }
    
    return globalEasyLogInst;
}

module.exports.getNewLogger = function(opts) {
    return new EasyLogger(opts);
}