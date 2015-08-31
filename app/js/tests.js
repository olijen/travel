// Define jQuery as AMD module
define.amd.jQuery = true;

require([
    'jasmine',
    'jasmine.html',
    'jasmine.jquery'
], function (jasmine) {
   
    jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
    jasmine.getEnv().execute();
    
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.specFilter = function(spec) {
        console.log(spec);
    };
    window.onload = function() {jasmineEnv.execute();};
    
    describe("Test1", function() {
      it("1", function() {
        expect(true).toBe(true);
      });
    });    
});

