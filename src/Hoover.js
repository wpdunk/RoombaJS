var fs = require("fs");

class Hoover {
  constructor() {
    this.dirtSum = 0;
    this.hooverPosition;
    this.directionsArray = [];
    this.dirtArray = [];
    this.roomDimensions;
  }
  run(filename) {
    this.readInput(filename);
    this.drive();
    console.log(`${this.hooverPosition.join(" ")}\n${this.dirtSum}`);
  }

  readInput(filename) {
    var inputArray = fs
      .readFileSync(filename)
      .toString()
      .split("\n");
    inputArray.pop();
    this.roomDimensions = inputArray[0].split(" ").map(Number);
    this.hooverPosition = inputArray[1].split(" ").map(Number);
    this.directionsArray = inputArray.pop().split("");
    for (var i = 2; i < inputArray.length; i++) {
      this.dirtArray.push(inputArray[i].split(" ").map(Number));
    }
  }

  drive() {
    this.directionsArray.forEach(move => {
      if (move === "N" && this.isInbounds(1, 1)) {
        this.hooverPosition[1] += 1;
      }
      if (move === "E" && this.isInbounds(0, 1)) {
        this.hooverPosition[0] += 1;
      }
      if (move === "S" && this.isInbounds(1, -1)) {
        this.hooverPosition[1] -= 1;
      }
      if (move === "W" && this.isInbounds(0, -1)) {
        this.hooverPosition[0] -= 1;
      }
      this.clean();
    });
  }

  isInbounds(xy, change) {
    return (
      0 <= this.hooverPosition[xy] + change &&
      this.hooverPosition[xy] + change <= this.roomDimensions[xy]
    );
  }

  clean() {
    this.dirtArray.forEach(dirt => {
      if (
        this.hooverPosition[0] === dirt[0] &&
        this.hooverPosition[1] === dirt[1]
      ) {
        this.dirtSum += 1;
      }
    });
  }
}

module.exports = Hoover;
