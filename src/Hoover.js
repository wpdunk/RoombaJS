class Hoover {
  constructor() {
    this.dirtSum = 0;
    this.hooverPosition;
    this.directionsArray = [];
  }
  run(filename) {
    this.readInput(filename);
    this.drive();
    console.log(`${this.hooverPosition.join(" ")}\n${this.dirtSum}`);
  }

  readInput(filename) {
    var fs = require("fs");
    var inputArray = fs
      .readFileSync(filename)
      .toString()
      .split("\n");
    this.hooverPosition = inputArray[1].split(" ").map(Number);
    this.directionsArray = inputArray[2].split("");
  }

  drive() {
    this.directionsArray.forEach(move => {
      if (move === "N") {
        this.hooverPosition[1] += 1;
      }
      if (move === "E") {
        this.hooverPosition[0] += 1;
      }
      if (move === "S") {
        this.hooverPosition[1] -= 1;
      }
      if (move === "W") {
        this.hooverPosition[0] -= 1;
      }
    });
  }
}

module.exports = Hoover;
