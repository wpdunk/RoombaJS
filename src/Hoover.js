var fs = require("fs");

class Hoover {
  constructor() {
    this.dirtSum = 0;
    this.hooverPosition;
    this.directionsArray = [];
    this.dirtArray = [];
    this.roomDimensions;
  }

  run(filePath = "./input.txt") {
    this.readInput(filePath);
    this.drive();
    this.displayOutput();
  }

  readInput(filename) {
    try {
      var inputArray = fs
        .readFileSync(filename)
        .toString()
        .split("\n");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("File not found!");
      } else {
        throw error;
      }
    }
    inputArray.pop();
    if (this.isCoordinates(inputArray[0])) {
      this.roomDimensions = inputArray[0].split(" ").map(Number);
    }
    if (this.isCoordinates(inputArray[1])) {
      this.hooverPosition = inputArray[1].split(" ").map(Number);
    }
    if (this.isCardinal(inputArray.slice(-1).pop())) {
      this.directionsArray = inputArray.pop().split("");
    }
    for (var i = 2; i < inputArray.length; i++) {
      if (this.isCoordinates(inputArray[i])) {
        this.dirtArray.push(inputArray[i].split(" ").map(Number));
      }
    }
  }

  isCardinal(input) {
    if (/^[NESW]+$/.test(input) === false) {
      throw new TypeError("Directions must be cardinal form!");
    } else {
      return true;
    }
  }

  isCoordinates(input) {
    if (/^[0-9]\s[0-9]+$/.test(input) === false) {
      throw new TypeError(
        "Coordinates must be 2 integers seperated by a space!"
      );
    } else {
      return true;
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

  displayOutput() {
    console.log(`${this.hooverPosition.join(" ")}\n${this.dirtSum}`);
  }
}

module.exports = Hoover;
