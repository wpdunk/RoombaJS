class Hoover {
  constructor() {
    this.dirtSum = 0;
    this.hooverPosition;
    this.directionsArray = [];
    this.dirtArray = [];
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
    inputArray.pop();
    this.hooverPosition = inputArray[1].split(" ").map(Number);
    this.directionsArray = inputArray.pop().split("");
    for (var i = 2; i < inputArray.length; i++) {
      this.dirtArray.push(inputArray[i].split(" ").map(Number));
    }
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
        if (this.hooverPosition[1] > 0) {
          this.hooverPosition[1] -= 1;
        }
      }
      if (move === "W") {
        if (this.hooverPosition[0] > 0) {
          this.hooverPosition[0] -= 1;
        }
      }
      this.dirtArray.forEach(dirt => {
        if (
          this.hooverPosition[0] === dirt[0] &&
          this.hooverPosition[1] === dirt[1]
        ) {
          this.dirtSum += 1;
        }
      });
      console.log(move);
      console.log("hP>", this.hooverPosition, "<");
    });
  }
}

module.exports = Hoover;
