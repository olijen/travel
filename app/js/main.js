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
  App.users    = new UserCollection;
  App.events    = new EventCollection;

  // Web User
  App.vent.on('webUser:init', function(data) {
    $('body').removeClass('guest').addClass('logged-in');
    
    //TODO: set promise
    var webUser = new User({id: data.id});
    webUser.fetch();
    App.webUser = webUser;
    
    var model = data instanceof WebUser ? data : new WebUser(data);
    
    var view = new NavbarView({model: model});
    view.render();
    window.location.href='#event/filter/future';
    $('.list-view').html('');
    model.on('destroy',function() {
      view.close();
      App.vent.trigger('webUser:guest');
      view.render();
      window.location.href='#';
    });
    this.vent.on('logout', model.destroy, model);
  }, App);

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
  
  $('body').on('click', '#print', function() {
    $('.list-view div .row .print').appendTo('#for-print');
    window.print();
    $('.noprint').show();
    Backbone.history.navigate('event/filter/future', true);
    setTimeout(function(){$('#for-print').html('');}, 500);
  });

  // Load code defined on php side in main layout and start the Application.
  require(['onLoad'], function() {
    App.start();
    App.router = new Router();
    Backbone.history.start();
  });
});
