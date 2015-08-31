define([
  'jquery',
  'underscore',
  'backbone',
  'models/user',
  'modelbinding',
  'text!templates/user/form.html',
  'app'
  ], function($, _, Backbone, User, ModelBinding, template, App) {

  return Backbone.View.extend({
    template : _.template(template),
    events: {
      'click button[name=save]'   : 'save',
      'click button[name=cancel]' : 'cancel'
    },

    initialize: function(options) {
      _.bindAll(this, 'render','success','close');
      this.model.on('error', this.error);
      this.model.on('sync', this.success);
    },

    render: function() {
      this.$el.html(this.template({model: this.model}));
      ModelBinding.bind(this);
    },

    save: function(event) {
      event.preventDefault();
      App.users.create(this.model, {wait: true});
    },

    cancel: function(e) {
      e.preventDefault();
      Backbone.history.navigate('user/list', true);
    },

    success: function() {
      if (App.webUser instanceof User) {
          App.vent.trigger('alert', {
            msg: 'User "' + this.model.get('username') + '" updated!',
            type: 'success'
          });
          
          Backbone.history.navigate('user/list', true);
      } else {
          //TODO: mail user to confirm registration
          App.vent.trigger('alert', {
            msg: 'Register "' + this.model.get('username') + '" with success! Please, log in!',
            type: 'success'
          });
          $('.main').html('');
          //Backbone.history.navigate('event/list', true);
      }
    },

    error: function(model, response) {
      App.vent.trigger('alert', {
        msg: response.responseText ? response.responseText : response.statusText,
        type: 'error'
      });
    },

    close: function() {
      ModelBinding.unbind(this);
      this.model.off('error', this.error);
      this.model.off('sync', this.success);
      this.undelegateEvents();
      this.remove();
    }
  });
});
