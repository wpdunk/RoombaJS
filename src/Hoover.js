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
      switch (move) {
        case "N":
          if (this.hooverPosition[1] < this.roomDimensions[1]) {
            this.hooverPosition[1] += 1;
          }
          break;
        case "E":
          if (this.hooverPosition[0] < this.roomDimensions[0]) {
            this.hooverPosition[0] += 1;
          }
          break;
        case "S":
          if (this.hooverPosition[1] > 0) {
            this.hooverPosition[1] -= 1;
          }
          break;
        case "W":
          if (this.hooverPosition[0] > 0) {
            this.hooverPosition[0] -= 1;
          }
          break;
        default:
      }
      this.clean();
    });
  }

  clean() {
    this.dirtArray.forEach((dirt, index) => {
      if (
        this.hooverPosition[0] === dirt[0] &&
        this.hooverPosition[1] === dirt[1]
      ) {
        this.dirtSum += 1;
        this.dirtArray.splice(index, 1);
      }
    });
  }
}

module.exports = Hoover;
