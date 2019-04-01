class Hoover {
  constructor() {
    this.dirtSum = 0;
    this.hooverPosition;
  }
  run(filename) {
    var fs = require("fs");
    var inputArray = fs
      .readFileSync(filename)
      .toString()
      .split("\n");
    this.hooverPosition = inputArray[1];
    console.log(`${this.hooverPosition}\n${this.dirtSum}`);
  }
}

module.exports = Hoover;
