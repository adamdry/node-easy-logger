var assert = require("assert")

describe('EasyLogger', function(){
    describe('warn() enable:false', function(){
        it('should return true to indicate success even though easyLogger is disabled', function(){
            
            var easyLogger = require('./../lib/easyLogger')({
                enable: false
            });
            
            var result = easyLogger.warn('test msg');
            
            assert.equal(result, true);
        });
        
        it('should return true to indicate success', function(){
            
            var easyLogger = require('./../lib/easyLogger')({
                enable: true
            });
            
            var result = easyLogger.warn('test msg');
            
            assert.equal(result, true);
        });
    });
});