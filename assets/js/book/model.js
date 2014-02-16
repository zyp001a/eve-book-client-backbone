define(["app"], function(BookManager){
  BookManager.module("Model", function(Model, BookManager, Backbone, Marionette, $, _){
    Model.Book = Backbone.Model.extend({
      urlRoot: "/books",

			idAttribute: "_id",

      defaults: {
        title: "",
        authors: "",
        description: "",
				"_id": ""
      },

      validate: function(attrs, options) {
        var errors = {};
        if (! attrs.title) {
          errors.title = "can't be blank";
        }

        if( ! _.isEmpty(errors)){
          return errors;
        }
				return {};
      }

    });


    Model.BookCollection = Backbone.Collection.extend({
      url: "/books",
      model: Model.Book,
      comparator: "title"
    });

    var API = {
      getBookCollection: function(){
        var books = new Model.BookCollection();
        var defer = $.Deferred();
        books.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });
        var promise = defer.promise();
        $.when(promise).done(function(books){
          if(books.length === 0){
            // if we don't have any books yet, create some for convenience
            var models = initializeBooks();
            books.reset(models);
          }
        });
        return promise;
      },

      getBook: function(bookId){
        var book = new Model.Book({id: bookId});
        var defer = $.Deferred();
        setTimeout(function(){
          book.fetch({
            success: function(data){
              defer.resolve(data);
            },
            error: function(data){
              defer.resolve(undefined);
            }
          });
        }, 2000);
        return defer.promise();
      }
    };

    BookManager.reqres.setHandler("book:collection", function(){
      return API.getBookCollection();
    });

    BookManager.reqres.setHandler("book", function(id){
      return API.getBook(id);
    });

    BookManager.reqres.setHandler("book:new", function(id){
      return new Model.Book();
    });
  });

  return ;
});
