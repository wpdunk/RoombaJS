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
    this.hooverPosition = inputArray[1].split(" ").map(Number);
    var directionsArray = inputArray[2].split("");
    directionsArray.forEach(move => {
      if (move === "N") {
        this.hooverPosition[1] += 1;
      }
    });
    console.log(`${this.hooverPosition.join(" ")}\n${this.dirtSum}`);
  }
}

module.exports = Hoover;
