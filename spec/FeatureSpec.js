describe("Features", function() {
  it("given no driving instructions or dirt, should report position and zero dirt removed", function() {
    hoover = new Hoover();
    spyOn(console, "log");
    hoover.run();
    expect(console.log).toHaveBeenCalledWith("0,0\n0");
  });
});
