const Hoover = require("../src/hoover");

describe("Hoover", function() {
  describe("readInput", function() {
    it("can load instructions from input file", function() {
      hoover = new Hoover();
      hoover.loadInput("./spec/support/testInputs/testSeven.txt");
      expect(hoover.hooverPosition).toEqual([0, 0]);
      expect(hoover.directionsArray).toEqual(["N", "N", "S", "S"]);
      expect(hoover.dirtArray).toEqual([[0, 1]]);
      expect(hoover.roomDimensions).toEqual([3, 3]);
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

  describe("displayOutput", function() {
    it("can print hoover position and sum of dirt cleaned to terminal", function() {
      spyOn(console, "log");
      hoover = new Hoover();
      hoover.hooverPosition = [0, 0];
      hoover.dirtSum = 1;
      hoover.displayOutput();
      expect(console.log).toHaveBeenCalledWith("0 0\n1");
    });
  });
});
