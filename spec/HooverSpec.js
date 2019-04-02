const Hoover = require("../src/hoover");

describe("Hoover", function() {
  it("can record initial position from input", function() {
    hoover = new Hoover();
    hoover.readInput("./spec/support/testOne.txt");
    expect(hoover.hooverPosition).toEqual([0, 0]);
  });
  it("can drive north", function() {
    hoover = new Hoover();
    hoover.hooverPosition = [1, 1];
    hoover.directionsArray = ["N"];
    hoover.drive();
    expect(hoover.hooverPosition).toEqual([1, 2]);
  });
  it("can drive east", function() {
    hoover = new Hoover();
    hoover.hooverPosition = [1, 1];
    hoover.directionsArray = ["E"];
    hoover.drive();
    expect(hoover.hooverPosition).toEqual([2, 1]);
  });
  it("can drive south", function() {
    hoover = new Hoover();
    hoover.hooverPosition = [1, 1];
    hoover.directionsArray = ["S"];
    hoover.drive();
    expect(hoover.hooverPosition).toEqual([1, 0]);
  });
  it("can drive west", function() {
    hoover = new Hoover();
    hoover.hooverPosition = [1, 1];
    hoover.directionsArray = ["W"];
    hoover.drive();
    expect(hoover.hooverPosition).toEqual([0, 1]);
  });
});
