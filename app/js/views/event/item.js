define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'app',
  'views/modal/confirm',
  'text!templates/event/item.html',
  'text!templates/event/full_item.html',
  'jqueryUIDatepicker'
  ], function($, _, Backbone, ModelBinding, App, ModalConfirmView, tpl, template) {

  return Backbone.View.extend({
    //template : _.template(template),
    
    events: {
      'click a.delete' : 'delete',
      'click a.read'   : 'read',
      'click a.edit'   : 'edit'
    },

    initialize: function(options) {//console.log(options);
        this.template = (window.location.href.indexOf('read') !== -1) ? _.template(template) : _.template(tpl);

        _.bindAll(this, 'render','confirmDelete', 'close');
        
        this.model.on('error', this.error);
        this.model.on('modal:confirm', this.confirmDelete);
        this.render();
    },

    render: function(template) {//console.log('t77');
        var self = this;
        self.$el.html(self.template({
          model    : self.model.toJSON(),
        })); 
        //console.log('11');
        return this;
    },

    read: function(e){
        e.preventDefault();
        this.template = _.template(template),
        Backbone.history.navigate('event/read/' + this.model.id, true);
    },

    edit: function(e){
        e.preventDefault();
        Backbone.history.navigate('event/edit/' + this.model.id, true);
    },

    delete: function(e) {
        e.preventDefault();

        var modalConfirmView = new ModalConfirmView({
            model  : this.model,
            header : 'Confirm Delete',
            body   : 'Are you sure you want to delete this item?'
        });
        $('.head').html(modalConfirmView.render().el);
    },

    confirmDelete: function() {
        $.when(this.model.destroy()).done(this.close);
    },

    error: function(model, response) {
        App.vent.trigger('alert', {
            msg: response.responseText ? response.responseText : response.statusText,
            type: 'error'
        });
    },

    close: function() {
        this.model.off('error', this.error);
        this.model.off('modal:confirm', this.confirmDelete);
        this.undelegateEvents();
        this.remove();
    }
  });
});