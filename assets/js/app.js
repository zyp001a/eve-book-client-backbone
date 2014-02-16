define(["backbone.marionette", "misc/region.dialog"], function(Marionette){
	var BookManager = new Marionette.Application();
	BookManager.addRegions({
		headerRegion: "#header-region",
		mainRegion: "#main-region",
		dialogRegion: Marionette.Region.Dialog.extend({
			el: "#dialog-region"
		})
	});

	BookManager.navigate = function(route, options){
		options || (options = {});
		Backbone.history.navigate(route, options);
	};

	BookManager.getCurrentRoute = function(){
		return Backbone.history.fragment;
	};

	BookManager.on("initialize:after", function(){
		require(["book/model"], function(){
			var fetchingBooks = BookManager.request("book:collection");
			$.when(fetchingBooks).done(function(books){
				console.log(books);
			});
		});
		if(Backbone.history){
			Backbone.history.start();
			if(this.getCurrentRoute() === ""){
				BookManager.trigger("book:collection:show");
			}
		}
	});
	return BookManager;
});
