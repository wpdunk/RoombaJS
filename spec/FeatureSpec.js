const Hoover = require("../src/hoover");

describe("Features", function() {
  it("given no driving instructions or dirt, should report position and zero dirt removed", function() {
    hoover = new Hoover();
    spyOn(console, "log");
    hoover.run("./spec/support/testOne.txt");
    expect(console.log).toHaveBeenCalledWith("0 0\n0");
  });

  it("given single driving instruction, should return updated position", function() {
    hoover = new Hoover();
    spyOn(console, "log");
    hoover.run("./spec/support/testTwo.txt");
    expect(console.log).toHaveBeenCalledWith("0 1\n0");
  });

  it("given all 4 driving instruction, should return correct final position", function() {
    hoover = new Hoover();
    spyOn(console, "log");
    hoover.run("./spec/support/testThree.txt");
    expect(console.log).toHaveBeenCalledWith("0 0\n0");
  });
  it("given driving instruction over dirt patch should record patch cleaned", function() {
    hoover = new Hoover();
    spyOn(console, "log");
    hoover.run("./spec/support/testFour.txt");
    expect(console.log).toHaveBeenCalledWith("0 1\n1");
  });
});
