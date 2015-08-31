define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  ], function($, _, Backbone, App) {

  return Backbone.Model.extend({
    urlRoot: 'api/event',
    
    defaults: {
        jsDateStart: null,
        jsDateEnd:   null,
        daysToStart: null,
        daysToEnd:   null,
    },
    
    initialize: function() {
        this.setDefaultAttributes();
    },
    
    setDefaultAttributes: function() {
        this.set('jsDateStart', new Date(this.get('start')));
        this.set('jsDateEnd', new Date(this.get('end')));
        
        var delta = this.get('jsDateStart').getTime() - new Date().getTime();
        this.set('daysToStart', Math.ceil(delta/1000/60/60/24));
        
        delta = this.get('jsDateEnd').getTime() - new Date().getTime();
        this.set('daysToEnd', Math.ceil(delta/1000/60/60/24));
    }
  });
});
