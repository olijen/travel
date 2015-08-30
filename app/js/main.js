// Define jQuery as AMD module
define.amd.jQuery = true;

define([
  'jquery',
  'underscore',
  'backbone',
  'domReady',
  'router',
  'app',
  'models/login',
  'models/webUser',
  'models/user',
  'collections/user',
  'collections/event',
  'views/navbar',
  'views/login',
  'bootstrapDropdown',
  'bootstrapModal',
  'backboneRelational',
  'datejs'
], function($, _, Backbone, domReady,
            Router, App,
            LoginModel, WebUser, User,
            UserCollection, EventCollection,
            NavbarView, LoginView) {

  $.ajaxSetup({
    dataFilter: function(data, dataType) {
      if ('Login Required!' === data) {
        App.vent.trigger('alert', {
          msg: 'Login Required',
          type: 'error'
        });
        // Return something not json parsable to
        // stop event triggering and all current ajax requests.
        // Looking for better solution.
        return ';';
      }
      return data;
    }
  });
  // Cross app collections
  App.users  = new UserCollection;
  App.events = new EventCollection;

  // New Web User
  App.vent.on('webUser:init', function(data) {
    l('init');
    App.webUser = App.webUser instanceof WebUser ? App.webUser : new User({id: data.id});
    if (App.webUser.isNew()) App.webUser.fetch();
    
    $('body').removeClass('guest').addClass('logged-in');

    var model = data instanceof WebUser ? data : new WebUser(data);
    
    var view = new NavbarView({model: model});
    view.render();
    //Backbone.history.navigate('event/list', true);
    
    model.on('destroy',function() {
      view.close();
      App.vent.trigger('webUser:guest');
      $(".list-view").html('');
    });
    this.vent.on('logout', model.destroy, model);
    
  }, App);
  
  App.vent.on('webUser:afterLogin', function(data) {
    l('afterLogin');
    Backbone.history.navigate('event/filter/future', true);
  }, App);
  
  //Guest
  App.vent.on('webUser:guest', function() {
    $('body').removeClass('logged-in').addClass('guest');
    var view = new LoginView();
    view.render();
    $('.login').html(view.el);
  }, App);

  // Alerts

  App.vent.on('alert', function (options) {
    require(['views/alert'], function(AlertView) {
      var alertView = new AlertView(options);
      App.headRegion.show(alertView);
    });
  });

  // Load code defined on php side in main layout and start the Application.
  require(['onLoad'], function() {
    App.start();
    App.router = new Router();
    Backbone.history.start();
  });
});
