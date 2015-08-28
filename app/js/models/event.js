define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {

  return Backbone.Model.extend({
    urlRoot: 'api/event',
    
    defaults: {
        jsDateStart: null,
        jsDateEnd:   null,
        daysToStart: null,
        //dateNow:     null,
    },
    
    initialize: function() {
        //var dateParts = this.get('end').split("-");
        //var jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
        this.set('jsDateStart', new Date(this.get('start')));
        this.set('jsDateEnd', new Date(this.get('end')));
        
        //this.set('dateNow', new Date().getTime());
        
        delta = this.get('jsDateStart').getTime() - new Date().getTime();
        //console.log(Math.ceil(delta/1000/60/60/24));
        this.set('daysToStart', Math.ceil(delta/1000/60/60/24));

    },
  });
});
