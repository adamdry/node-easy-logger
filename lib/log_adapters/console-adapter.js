// Constructor
function ConsoleAdapter() {
  // always initialize all instance properties
  //this.bar = bar;
  //this.baz = 'baz'; // default value
}

// class methods
ConsoleAdapter.prototype.log = function(msg) {
    console.log(msg);
};

// export the class
module.exports = ConsoleAdapter;