var ConsoleAdapter = require('./log_adapters/console-adapter');
require('./exceptions');

//var easyLoggerInstance = null;

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
    
    console.log('warn called on id ' + this.id);
    
    if (this.opts.enable !== true) {
        return true;
    }
    
    this.adapters.forEach(function(adapter, index, array){
        adapter.log(msg);
    });
}

EasyLogger.prototype.id = 23;

// export the class
//module.exports = EasyLogger;
module.exports = function(opts) {
    
    console.log('easy logger setup function called');
    
    var easyLoggerInstance = new EasyLogger(opts);
    
    easyLoggerInstance.id = Math.random();
    
    console.log('easyLoggerInstance.id: ' + easyLoggerInstance.id);
    
    return easyLoggerInstance;
    
    //easyLoggerInstance = new EasyLogger(opts);
    
    /*if (null === easyLoggerInstance) {
        easyLoggerInstance = new EasyLogger(opts);
    }
    
    return easyLoggerInstance;*/
}