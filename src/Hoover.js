const Input = require("../src/input");

class Hoover {
  constructor() {
    this.dirtSum = 0;
    this.hooverPosition;
    this.directionsArray = [];
    this.dirtArray = [];
    this.roomDimensions;
  }

  run(filePath = "./input.txt") {
    this.loadInput(filePath);
    this.drive();
    this.displayOutput();
  }

  loadInput(filePath) {
    var instructions = new Input();
    instructions.readInput(filePath);
    this.hooverPosition = instructions.getHooverPosition();
    this.directionsArray = instructions.getDirectionsArray();
    this.dirtArray = instructions.getDirtArray();
    this.roomDimensions = instructions.getRoomDimensions();
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
