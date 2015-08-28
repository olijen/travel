define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'visualsearch'
  ], function($, _, Backbone, App) {

  return Backbone.View.extend({

    initialize: function(options) {
      _.bindAll(this, 'render','search','valueMatches','facetMatches');

      this.vent = options.vent;

      this.events = options.events;
      this.comments = options.comments;

      var visualSearch = VS.init({
        container  : this.$el,
        query      : '',
        unquotable : ['text'],
        callbacks  : {
          search       : this.search,
          valueMatches : this.valueMatches,
          facetMatches : this.facetMatches
        }
      });
      $('#search-container').html(this.el);
    },

    search: function(query, searchCollection) {
      searchCollection.each(function(item) {
        switch(item.get('category')) {
          case 'event':
            var event = App.events.find(function(model) {
              return model.get('title') == item.get('value');
            });
            Backbone.history.navigate('event/read/' + event.id, true);
            break;
        }
      });
    },

    valueMatches: function(category, searchTerm, callback) {
      switch (category) {
        case 'event':
          this.loadevents();
          callback(App.events.pluck('title'));
          break;
        }
    },

    facetMatches: function(callback) {
      callback(['event']);
    },

    loadevents: _.once(function() {
      if (!App.events.length) App.events.fetch();
    })
  });

});
