const Input = require("../src/input");

class Hoover {
  constructor(file = "./input.txt", input = new Input()) {
    this.input = input;
    this.inputFile = file;
    this.dirtSum = 0;
    this.hooverPosition;
    this.directionsArray = [];
    this.dirtArray = [];
    this.roomDimensions;
  }

  run() {
    this.loadInput();
    this.drive();
    this.displayOutput();
  }

  loadInput() {
    var instructions = this.input;
    instructions.readInput(this.inputFile);
    this.hooverPosition = instructions.getHooverPosition();
    this.directionsArray = instructions.getDirectionsArray();
    this.dirtArray = instructions.getDirtArray();
    this.roomDimensions = instructions.getRoomDimensions();
  }

  drive() {
    this.directionsArray.forEach(move => {
      switch (move) {
        case "N":
          this.hooverPosition[1] < this.roomDimensions[1] &&
            this.hooverPosition[1]++;
          break;
        case "E":
          this.hooverPosition[0] < this.roomDimensions[0] &&
            this.hooverPosition[0]++;
          break;
        case "S":
          this.hooverPosition[1] > 0 && this.hooverPosition[1]--;
          break;
        case "W":
          this.hooverPosition[0] > 0 && this.hooverPosition[0]--;
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
