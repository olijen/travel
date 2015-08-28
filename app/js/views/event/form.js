define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'models/event',
  'text!templates/event/form.html',
  'app'
  // 'bootstrapWysihtml5',
  ], function($, _, Backbone, ModelBinding, EventModel, template, App) {

  return Backbone.View.extend({
    template : _.template(template),
    events: {
      'click button[name=save]'   : 'save',
      'click button[name=cancel]' : 'cancel'
    },

    initialize: function(options) {
      _.bindAll(this, 'render','close','success','error');
      this.model.on('sync', this.success);
      this.model.on('error', this.error);
    },

    render: function(){
      this.$el.html(this.template());
      ModelBinding.bind(this);
      //this.$('.date').mask('00/00/0000');
    },

    save: function(event) {
      event.preventDefault();
      App.events.create(this.model, {wait: true});
    },

    cancel: function(e) {
      e.preventDefault();
      Backbone.history.navigate('event/list', true);
    },

    success: function(model, response) {
      App.vent.trigger('alert', {
        msg: 'Event "' + this.model.get('place') + '" updated.',
        type: 'success'
      });
      Backbone.history.navigate('event/list', true);
    },

    error: function(model, response) {
      App.vent.trigger('alert', {
        msg: response.responseText ? response.responseText : response.statusText,
        type: 'error'
      });
    },

    close: function() {
      ModelBinding.unbind(this);
      this.model.off('sync', this.success);
      this.model.off('error', this.error);
      this.undelegateEvents();
      this.remove();
    }
  });
});
