const Input = require("../src/input");
describe("Input", function() {
  beforeEach(function() {
    input = new Input();
  });

  describe("readInput", function() {
    it("can read input file without dirt", function() {
      input.readInput("./spec/support/testInputs/testTwo.txt");
      expect(input.inputArray).toEqual(["5 5", "0 0", "N"]);
    });

    it("can read input file with dirt", function() {
      input.readInput("./spec/support/testInputs/testOne.txt");
      expect(input.inputArray).toEqual(["5 5", "0 0", "0 1", "N"]);
    });

    it("throws error when input file not found", function() {
      spyOn(console, "log");
      input.readInput("nonexistentFile.txt");
      expect(console.log).toHaveBeenCalledWith("File not found!");
    });
  });

  describe("getRoomDimensions", function() {
    it("can retrieve room dimensions from input", function() {
      input.readInput("./spec/support/testInputs/testOne.txt");
      expect(input.getRoomDimensions()).toEqual([5, 5]);
    });

    it("throws error when input file has bad room dimensions", function() {
      input.readInput("./spec/support/testInputs/errorCoordinatesRoom.txt");
      badRequest = function() {
        input.getRoomDimensions();
      };
      expect(badRequest).toThrowError(
        TypeError,
        "Coordinates must be 2 integers seperated by a space!"
      );
    });
  });

  describe("getHooverPosition", function() {
    it("can retrieve hoover position from input", function() {
      input.readInput("./spec/support/testInputs/testOne.txt");
      expect(input.getHooverPosition()).toEqual([0, 0]);
    });

    it("throws error when input file has bad hoover position", function() {
      input.readInput("./spec/support/testInputs/errorCoordinatesHoover.txt");
      badRequest = function() {
        input.getHooverPosition();
      };
      expect(badRequest).toThrowError(
        TypeError,
        "Coordinates must be 2 integers seperated by a space!"
      );
    });
  });

  describe("getDirectionsArray", function() {
    it("can retrieve directions from input", function() {
      input.readInput("./spec/support/testInputs/testTwo.txt");
      expect(input.getDirectionsArray()).toEqual(["N"]);
    });

    it("can retrieve directions from input (lower case format)", function() {
      input.readInput("./spec/support/testInputs/testEight.txt");
      expect(input.getDirectionsArray()).toEqual(["N"]);
    });

    it("throws error when input file has bad directions", function() {
      input.readInput("./spec/support/testInputs/errorCardinal.txt");
      badRequest = function() {
        input.getDirectionsArray();
      };
      expect(badRequest).toThrowError(
        TypeError,
        "Directions must be cardinal form!"
      );
    });
  });

  describe("getDirtArray", function() {
    it("can retrieve dirt positions from input", function() {
      input.readInput("./spec/support/testInputs/testFour.txt");
      expect(input.getDirtArray()).toEqual([[0, 1]]);
    });

    it("throws error when input file has bad dirt positions", function() {
      input.readInput("./spec/support/testInputs/errorCoordinatesDirt.txt");
      badRequest = function() {
        input.getDirtArray();
      };
      expect(badRequest).toThrowError(
        TypeError,
        "Coordinates must be 2 integers seperated by a space!"
      );
    });
  });

  describe("isCardinal", function() {
    it("throws error when directions input format incorrect", function() {
      badInput = function() {
        input.isCardinal(111);
      };
      expect(badInput).toThrowError(
        TypeError,
        "Directions must be cardinal form!"
      );
      badInput2 = function() {
        input.isCardinal("MmM");
      };
      expect(badInput2).toThrowError(
        TypeError,
        "Directions must be cardinal form!"
      );
      badInput3 = function() {
        input.isCardinal("111");
      };
      expect(badInput3).toThrowError(
        TypeError,
        "Directions must be cardinal form!"
      );
    });
    it("returns true when directions input format correct", function() {
      expect(input.isCardinal("NeSW")).toEqual(true);
    });
  });

  describe("isCoordinates", function() {
    it("throws error when co-ordinate input format incorrect", function() {
      badInput = function() {
        input.isCoordinates(11);
      };
      expect(badInput).toThrowError(
        TypeError,
        "Coordinates must be 2 integers seperated by a space!"
      );
      badInput2 = function() {
        input.isCoordinates("1,1");
      };
      expect(badInput2).toThrowError(
        TypeError,
        "Coordinates must be 2 integers seperated by a space!"
      );
      badInput3 = function() {
        input.isCoordinates("1 Y");
      };
      expect(badInput3).toThrowError(
        TypeError,
        "Coordinates must be 2 integers seperated by a space!"
      );
    });
    it("returns true when co-ordinate input format correct", function() {
      expect(input.isCoordinates("1 1")).toEqual(true);
    });
  });
});
