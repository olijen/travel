define([
  'jquery',
  'underscore',
  'backbone',
  'models/event',
  'datejs'
  ], function($, _, Backbone, EventModel){

  return Backbone.Collection.extend({
    model: EventModel,
    url: 'api/event',
    
    comparator: function(a, b) { //TODO: do something
        return Date.parse(a.get('start')) < Date.parse(b.get('start'));
    },
    
    filter: function(filter, value) {
        var resultModel = [];
        //console.log('lets filter! ' + filter);
        switch (filter) {
            
            case 'last':
                _.forEach(this.models, function(model) {
                    if (model.get('daysToStart') < 0)
                        resultModel.push(model);
                }, this);
            break;
            
            case 'name':
                _.forEach(this.models, function(model) {
                    if (model.get('place') === value)
                        resultModel.push(model);
                }, this);
            break;
            
            case 'next_month':
                _.forEach(this.models, function(model) {
                    if ((model.get('daysToStart') >= 0 && model.get('daysToStart') <= 30) ||
                        (model.get('daysToEnd')   >= 0 && model.get('daysToEnd') <= 30)
                    )
                        resultModel.push(model);
                }, this);
            break;
            
            case 'between':
                return;
            break;
            
            case 'future': default:
                _.forEach(this.models, function(model) {
                    if (model.get('daysToStart') >= 0)
                        resultModel.push(model);
                }, this);
            break;
        }
        
        this.reset(resultModel);
    },
});
});
