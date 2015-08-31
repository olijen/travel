define([
  'jquery',
  'underscore',
  'backbone',
  'app'
  ], function($, _, Backbone, App) {

  return Backbone.Router.extend({

    routes: {
      ".*"                          : "eventList",
      "user/list"                   : "userList",
      "user/new"                    : "userNew",
      "user/edit/:id"               : "userEdit",
      "user/delete/:id"             : "userDelete",
      "user/tools"                  : "userTools",
      "event/list"                  : "eventList",
      "event/new"                   : "eventNew",
      "event/edit/:id"              : "eventEdit",
      "event/read/:id"              : "eventRead",
      "event/filter/:filter/:value" : "eventFilter",
      "event/filter/:filter"        : "eventFilter",
    },

    // Users
    userList: function() {
      $.when(
        App.users.length || App.users.fetch()
      ).done(function() {
        require(['views/user/list'], function(UserList) {
          App.mainRegion.show(new UserList({
            collection: App.users
          }));
        });
      });
    },

    userNew: function() {
      require(['views/user/form'], function(UserForm) {
        App.mainRegion.show(new UserForm({
          model: new App.users.model
        }));
      });
    },

    // Todo: do something if model wasn't found
    userEdit: function(id) {
      $.when(
        App.users.length || App.users.fetch()
      ).done(function () {
        require(['views/user/form'], function(Form) {
          var model = App.users.get(id);
          App.mainRegion.show(new Form({
            model: model
          }));
        });
      });
    },

    // events:
    eventList: function() {
      $.when(
        /* TODO: App.events.length ||*/ App.events.fetch()
      ).done(function() {
        require(['views/event/list'], function(EventList) {
          App.mainRegion.show(new EventList({
            collection : App.events
          }));
        });
      });
    },

    eventNew: function() {
      require(['views/event/form'], function(EventForm) {
        App.mainRegion.show(new EventForm({
          model: new App.events.model
        }));
      });
    },

    // Todo: do something if model wasn't found
    eventEdit: function(id) {
      $.when(
        App.events.length || App.events.fetch()
      ).done(function () {
        require(['views/event/form'], function(Form) {
          var model = App.events.get(id);
          App.mainRegion.show(new Form({
            model: model
          }));
        });
      });
    },

    // Todo: do something if model wasn't found!!!
    eventRead: function(id) {
      $.when(
        App.events.length || App.events.fetch()
      ).done(function () {
        require(['views/event/item'], function(Item) {
          var model = App.events.get(id);
          App.mainRegion.show(new Item({
            model: model
          }));
        });
      });
    },
    
    eventFilter: function(filter, value) {
      $.when(
        /* TODO: App.events.length || */ App.events.fetch()
      ).done(function () {
        App.events.filter(filter, value);
        require(['views/event/list'], function(EventList) {
          App.mainRegion.show(new EventList({
            collection : App.events
          }));
        });
      });
    },
    
    // Todo: rewrite
    /*userTools: function() {
        require(['views/modal/new-pass'], function(Form) {
          var form = new Form({
            model: App.webUser,
            header: 'Change password'
          });
          form.render();
        });
    },*/
    
    //END router
  });
});
