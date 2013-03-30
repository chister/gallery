define([
  "namespace",
  "use!backbone"
],

function(namespace, Backbone) {

  var Photo = namespace.module();

  // Router
  Photo.Router = Backbone.Router.extend({
    routes: {
      "photo/:p"   : "details"
    },

    details: function(hash){
      var view = new Photo.Views.Details({model: Library.get(hash)});
      view.render(function(el){
        $("#main").html(el);
      });
    }
  });

  // Instantiate Router
  var router = new Photo.Router();

  // Photo Model
  Photo.Model = Backbone.Model.extend({});

  // Photo Collection
  Photo.Collection = Backbone.Collection.extend({
    model: Photo.Model
  });  

  // This will fetch the book template and render it.
  Photo.Views.Details = Backbone.View.extend({
    template: "app/templates/photos/details.html",

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

  // This will fetch the photos list template and render it.
  Photo.Views.List = Backbone.View.extend({
    template: "app/templates/photos/list.html",

    render: function(done){
      var view = this;

      namespace.fetchTemplate(this.template, function(tmpl){
        view.el.innerHTML = tmpl({photos: view.collection.toJSON()});

        if (_.isFunction(done)){
          done(view.el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Photo;

});