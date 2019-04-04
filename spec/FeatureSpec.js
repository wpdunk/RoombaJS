const Hoover = require("../src/hoover");

describe("Features", function() {
  beforeEach(function() {
    hoover = new Hoover();
    spyOn(console, "log");
  });

  describe("given single driving instruction", function() {
    it("should return updated position", function() {
      hoover.run("./spec/support/testInputs/testTwo.txt");
      expect(console.log).toHaveBeenCalledWith("0 1\n0");
    });
  });

  describe("given all 4 driving instruction", function() {
    it("should return correct final position", function() {
      hoover.run("./spec/support/testInputs/testThree.txt");
      expect(console.log).toHaveBeenCalledWith("0 0\n0");
    });
  });

  describe("given driving instruction over dirt patch", function() {
    it("should record patch cleaned", function() {
      hoover.run("./spec/support/testInputs/testFour.txt");
      expect(console.log).toHaveBeenCalledWith("0 1\n1");
    });
  });

  describe("given instructions to clean multiple patches of dirt", function() {
    it("record correct count cleaned", function() {
      hoover.run("./spec/support/testInputs/testFive.txt");
      expect(console.log).toHaveBeenCalledWith("0 3\n2");
    });
  });

  describe("given instructions that force contact with walls", function() {
    it("should bounce off walls and clean as expected", function() {
      hoover.run("./spec/support/testInputs/testSix.txt");
      expect(console.log).toHaveBeenCalledWith("3 1\n1");
    });
  });

  describe("given instructions to pass over same dirt patch twice", function() {
    it("should only record one successful clean", function() {
      hoover.run("./spec/support/testInputs/testSeven.txt");
      expect(console.log).toHaveBeenCalledWith("0 0\n1");
    });
  });
});
