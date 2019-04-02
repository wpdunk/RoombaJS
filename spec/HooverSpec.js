const Hoover = require("../src/hoover");

describe("Hoover", function() {
  it("records initial position from input", function() {
    hoover = new Hoover();
    hoover.readInput("./spec/support/testOne.txt");
    expect(hoover.hooverPosition).toEqual([0, 0]);
  });
});
