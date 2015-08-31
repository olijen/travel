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
    
    /*relations: [
      {
        type: Backbone.HasOne, 
        key: 'events',
        relatedModel: EventModel,
        collectionType: EventCollection, 
        reverseRelation: {
          key: 'user',
          keySource: 'user_id',
          includeInJSON: Backbone.Model.prototype.idAttribute,
        }
      },
    ],*/

  });

  return UserModel;
});
