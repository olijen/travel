define([
  'jquery', 
  'underscore', 
  'backbone',
  'models/event',
  'collections/event',
  'backboneRelational',
  ], function($, _, Backbone, EventModel, EventCollection) {

  var UserModel = Backbone.RelationalModel.extend({

    urlRoot: 'api/user',

  });

  return UserModel;
});
