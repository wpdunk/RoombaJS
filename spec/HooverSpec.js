const Hoover = require("../src/hoover");

describe("Hoover", function() {
  describe("readInput", function() {
    beforeEach(function() {
      hoover = new Hoover();
    });

    it("can record initial position from input", function() {
      hoover.readInput("./spec/support/testInputs/testOne.txt");
      expect(hoover.hooverPosition).toEqual([0, 0]);
    });

    it("can record driving instructions from input", function() {
      hoover.readInput("./spec/support/testInputs/testTwo.txt");
      expect(hoover.directionsArray).toEqual(["N"]);
    });

    it("can record dirt locations from input", function() {
      hoover.readInput("./spec/support/testInputs/testFour.txt");
      expect(hoover.dirtArray).toEqual([[0, 1]]);
    });

    it("can record room dimensions from input", function() {
      hoover.readInput("./spec/support/testInputs/testOne.txt");
      expect(hoover.roomDimensions).toEqual([5, 5]);
    });
  });

  describe("readInput - exceptions", function() {
    beforeEach(function() {
      hoover = new Hoover();
    });

    it("throws error when input file not found", function() {
      spyOn(console, "log");
      badFileInput = function() {
        hoover.readInput("nonexistentFile.txt");
      };
      expect(badFileInput).toThrow();
    });

    it("throws error when input file has incorrect directions", function() {
      badFileInput = function() {
        hoover.readInput("./spec/support/testInputs/errorCardinal.txt");
      };
      expect(badFileInput).toThrowError(
        TypeError,
        "Directions must be cardinal form!"
      );
    });
  });

  describe("isCardinal", function() {
    it("throws error when directions input format incorrect", function() {
      badInput = function() {
        hoover.isCardinal(111);
      };
      expect(badInput).toThrowError(
        TypeError,
        "Directions must be cardinal form!"
      );
      badInput2 = function() {
        hoover.isCardinal("MmM");
      };
      expect(badInput2).toThrowError(
        TypeError,
        "Directions must be cardinal form!"
      );
      badInput3 = function() {
        hoover.isCardinal("111");
      };
      expect(badInput3).toThrowError(
        TypeError,
        "Directions must be cardinal form!"
      );
    });
    it("returns true when directions input format correct", function() {
      expect(hoover.isCardinal("NESW")).toEqual(true);
    });
  });

  describe("isCoordinates", function() {
    it("throws error when co-ordinate input format incorrect", function() {
      badInput = function() {
        hoover.isCoordinates(11);
      };
      expect(badInput).toThrowError(
        TypeError,
        "Coordinates must be 2 integers seperated by a space!"
      );
      badInput2 = function() {
        hoover.isCoordinates("1,1");
      };
      expect(badInput2).toThrowError(
        TypeError,
        "Coordinates must be 2 integers seperated by a space!"
      );
      badInput3 = function() {
        hoover.isCoordinates("1 Y");
      };
      expect(badInput3).toThrowError(
        TypeError,
        "Coordinates must be 2 integers seperated by a space!"
      );
    });
    it("returns true when co-ordinate input format correct", function() {
      expect(hoover.isCoordinates("1 1")).toEqual(true);
    });
  });

  describe("drive", function() {
    beforeEach(function() {
      hoover = new Hoover();
      hoover.roomDimensions = [2, 2];
      hoover.hooverPosition = [1, 1];
    });

    it("can drive north", function() {
      hoover.directionsArray = ["N"];
      hoover.drive();
      expect(hoover.hooverPosition).toEqual([1, 2]);
    });

    it("can drive east", function() {
      hoover.directionsArray = ["E"];
      hoover.drive();
      expect(hoover.hooverPosition).toEqual([2, 1]);
    });

    it("can drive south", function() {
      hoover.directionsArray = ["S"];
      hoover.drive();
      expect(hoover.hooverPosition).toEqual([1, 0]);
    });

    it("can drive west", function() {
      hoover.directionsArray = ["W"];
      hoover.drive();
      expect(hoover.hooverPosition).toEqual([0, 1]);
    });
  });

  describe("clean", function() {
    beforeEach(function() {
      hoover = new Hoover();
      hoover.hooverPosition = [0, 1];
      hoover.dirtArray = [[0, 1]];
    });

    it("can record count of dirt cleaned", function() {
      hoover.clean();
      expect(hoover.dirtSum).toEqual(1);
    });

    it("can only clean dirt once", function() {
      hoover.clean();
      hoover.clean();
      expect(hoover.dirtSum).toEqual(1);
    });
  });

  describe("drive - inbounds checks", function() {
    beforeEach(function() {
      hoover = new Hoover();
      hoover.roomDimensions = [2, 2];
    });

    it("can bounce off inner boundary wall when x=0", function() {
      hoover.hooverPosition = [0, 0];
      hoover.directionsArray = ["W"];
      hoover.drive();
      expect(hoover.hooverPosition).toEqual([0, 0]);
    });

    it("can bounce off inner boundary wall when x=0", function() {
      hoover.hooverPosition = [0, 0];
      hoover.directionsArray = ["S"];
      hoover.drive();
      expect(hoover.hooverPosition).toEqual([0, 0]);
    });

    it("can bounce off outer boundary wall x=roomDimensions[0] ", function() {
      hoover.hooverPosition = hoover.roomDimensions;
      hoover.directionsArray = ["E"];
      hoover.drive();
      expect(hoover.hooverPosition).toEqual(hoover.roomDimensions);
    });

    it("can bounce off outer boundary wall y=roomDimensions[1] ", function() {
      hoover.hooverPosition = hoover.roomDimensions;
      hoover.directionsArray = ["N"];
      hoover.drive();
      expect(hoover.hooverPosition).toEqual(hoover.roomDimensions);
    });
  });
});
