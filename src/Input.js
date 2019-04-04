var fs = require("fs");

class Input {
  constructor() {
    this.inputArray = [];
  }

  readInput(filePath) {
    try {
      this.inputArray = fs
        .readFileSync(filePath)
        .toString()
        .split("\n");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("File not found!");
      } else {
        throw error;
      }
    }
    this.inputArray.pop();
  }

  getRoomDimensions() {
    if (this.isCoordinates(this.inputArray[0])) {
      return this.inputArray[0].split(" ").map(Number);
    }
  }

  getHooverPosition() {
    if (this.isCoordinates(this.inputArray[1])) {
      return this.inputArray[1].split(" ").map(Number);
    }
  }

  getDirectionsArray() {
    if (this.isCardinal(this.inputArray.slice(-1).pop())) {
      return this.inputArray
        .slice(-1)
        .pop()
        .split("");
    }
  }

  getDirtArray() {
    var dirtArray = [];
    for (var i = 2; i < this.inputArray.length - 1; i++) {
      if (this.isCoordinates(this.inputArray[i])) {
        dirtArray.push(this.inputArray[i].split(" ").map(Number));
      }
    }
    return dirtArray;
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
}

module.exports = Input;
