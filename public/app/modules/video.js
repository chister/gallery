define([
  "namespace",
  "use!backbone"
],

function(namespace, Backbone) {

  var Video = namespace.module();

  // Router
  Video.Router = Backbone.Router.extend({
    routes: {
      "video/:p"   : "details"
    },
    details: function(hash){
      //var view = new Video.Views.Details({model: {_id:'2', headline: 'headline', caption:'caption', originalPublishDate:'orig'}});
      var v = new Video.Model();
      v.set("id", hash);
      v.fetch();
      var view = new Video.Views.Details({model: v});
      view.render(function(el){
        $("#main").html(el);
      });
    }
  });

  // Instantiate Router
  var router = new Video.Router();

  // Video Model
  Video.Model = Backbone.Model.extend({
  	urlRoot: "/video" 
  });

  // Video Collection
  Video.Collection = Backbone.Collection.extend({
  	model: Video.Model,
  	url: "/videos",
  	initialize: function() {
  		this.fetch();
  	}
  });  

  // This will fetch the book template and render it.
  Video.Views.Details = Backbone.View.extend({
    template: "app/templates/videos/details.html",

    render: function(done) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) { 
      	view.el.innerHTML = tmpl(view.model.toJSON());

        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  // This will fetch the videos list template and render it.
  Video.Views.List = Backbone.View.extend({
    template: "app/templates/videos/list.html",

    render: function(done){
      var view = this;
           
      namespace.fetchTemplate(this.template, function(tmpl){      	      	

        view.el.innerHTML = tmpl({videos: view.collection.toJSON()});

        if (_.isFunction(done)){
          done(view.el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Video;

});