define([
  'jquery',
  'underscore',
  'backbone',
  'views/event/item',
  'text!templates/event/list.html',
  'app'
  ], function($, _, Backbone, EventItemView, template, App) {

  return Backbone.View.extend({
    template : _.template(template),

    initialize: function(options) {
        console.log('t12');
      _.bindAll(this, 'render','renderItem', 'close');
      this.user = options.user;
      this.collection.on('error', this.error, this)
    },

    render: function() {//console.log('t3');
      this.$el.html(this.template());
      this.collection.each(this.renderItem);
    },

    renderItem: function(model) {//console.log('t4');
      var itemView = new EventItemView({model:model});
      //itemView.render();
      //console.log('11122');
      //console.log((itemView.el));
      $('<li>').html(itemView.el).appendTo(this.$('ul'));
      this.$('ul').append(itemView.el);
    },

    error: function(model, response) {
      App.vent.trigger('alert', {
        msg: response.responseText ? response.responseText : response.statusText,
        type: 'error'
      });
    },

    close: function() {
      this.undelegateEvents();
      this.collection.off('error', this.error);
      this.remove();
    }
  });
});
