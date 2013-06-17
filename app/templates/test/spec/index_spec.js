describe("Index", function() {
  beforeEach(function () {
    Ember.run(<%= _.classify(appname) %>, <%= _.classify(appname) %>.advanceReadiness);
  });
  afterEach(function (done) {
    <%= _.classify(appname) %>.reset();
    done();
  });

  it("contains the words 'Welcome to Ember.js on Charcoal'", function(done) {
    visit("/").then(function() {
      expect($("#ember h1").html()).to.be.equal("<%= _.classify(appname) %>");
      done();

      // finishes loading fixtures so Ember Data doesn't throw an error after
      // App.reset() in teardown
      Ember.run.sync();
    });
  });
});
