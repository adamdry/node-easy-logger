var ConsoleAdapter = require('./log_adapters/console-adapter');
require('./exceptions');


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

// constructor
function EasyLogger() {
    if (typeof opts !== 'undefined') {
        setOpts = opts;
    }

    setupAdapter();
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

module.exports = {
    
    setup: function setup(opts) {
        
        if (typeof opts !== 'undefined') {
            setOpts = opts;
        }
        
        setupAdapter();
    },
    
    warn: function warn(msg) {
        adapters.forEach(function(element, index, array){
            element.log(msg);
        });
    }
    
}