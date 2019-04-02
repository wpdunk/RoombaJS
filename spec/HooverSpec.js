const Hoover = require("../src/hoover");

describe("Hoover", function() {
  it("can record initial position from input", function() {
    hoover = new Hoover();
    hoover.readInput("./spec/support/testOne.txt");
    expect(hoover.hooverPosition).toEqual([0, 0]);
  });
  it("can drive north", function() {
    hoover = new Hoover();
    hoover.hooverPosition = [0, 0];
    hoover.directionsArray = ["N"];
    hoover.drive();
    expect(hoover.hooverPosition).toEqual([0, 1]);
  });
});
