const Hoover = require("../src/hoover");

describe("Features", function() {
  beforeEach(function() {
    spyOn(console, "log");
  });

  describe("given single driving instruction", function() {
    it("should return updated position", function() {
      hoover = new Hoover("./spec/support/testInputs/testTwo.txt");
      hoover.run();
      expect(console.log).toHaveBeenCalledWith("0 1\n0");
    });
  });

  describe("given all 4 driving instruction", function() {
    it("should return correct final position", function() {
      hoover = new Hoover("./spec/support/testInputs/testThree.txt");
      hoover.run();
      expect(console.log).toHaveBeenCalledWith("0 0\n0");
    });
  });

  describe("given driving instruction over dirt patch", function() {
    it("should record patch cleaned", function() {
      hoover = new Hoover("./spec/support/testInputs/testFour.txt");
      hoover.run();
      expect(console.log).toHaveBeenCalledWith("0 1\n1");
    });
  });

  describe("given instructions to clean multiple patches of dirt", function() {
    it("record correct count cleaned", function() {
      hoover = new Hoover("./spec/support/testInputs/testFive.txt");
      hoover.run();
      expect(console.log).toHaveBeenCalledWith("0 3\n2");
    });
  });

  describe("given instructions that force contact with walls", function() {
    it("should bounce off walls and clean as expected", function() {
      hoover = new Hoover("./spec/support/testInputs/testSix.txt");
      hoover.run();
      expect(console.log).toHaveBeenCalledWith("3 1\n1");
    });
  });

  describe("given instructions to pass over same dirt patch twice", function() {
    it("should only record one successful clean", function() {
      hoover = new Hoover("./spec/support/testInputs/testSeven.txt");
      hoover.run();
      expect(console.log).toHaveBeenCalledWith("0 0\n1");
    });
  });
});
