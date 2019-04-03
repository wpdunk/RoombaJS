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
    it("can record count of dirt cleaned", function() {
      hoover = new Hoover();
      hoover.hooverPosition = [0, 1];
      hoover.dirtArray = [[0, 1]];
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
