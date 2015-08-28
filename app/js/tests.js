// Define jQuery as AMD module
define.amd.jQuery = true;

require([
    'jasmine',
    'jasmine.html',
    'jasmine.jquery'
], function (jasmine) {
    console.log('start testing');
    
    jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
    jasmine.getEnv().execute();
    
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.specFilter = function(spec) {
        console.log(spec);
    };
    window.onload = function() {jasmineEnv.execute();};
    
    describe("REST-user", function() {
      it("REST C", function() {
        expect(true).toBe(true);
      });
      it("REST R", function() {
        expect(true).toBe(true);
      });
      it("REST U", function() {
        expect(true).toBe(true);
      });
      it("REST D", function() {
        expect(true).toBe(true);
      });
    });
    
    describe("REST-event", function() {
      it("REST C", function() {
        expect(true).toBe(true);
      });
      it("REST R", function() {
        expect(true).toBe(true);
      });
      it("REST U", function() {
        expect(true).toBe(true);
      });
      it("REST D", function() {
        expect(true).toBe(true);
      });
    });
    
});

