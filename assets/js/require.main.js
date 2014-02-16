requirejs.config({
  baseUrl: "assets/js/vendor",
	paths: {
		book: "../book", 
		app: "../app", 
		jquery: "jquery-1.11.0"
	},
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["underscore", "jquery", "json2"],
      exports: "Backbone"
    },
    "backbone.picky": ["backbone"],
    "backbone.syphon": ["backbone"],
    "backbone.localstorage": ["backbone"],
    "backbone.marionette": {
      deps: ["backbone"],
      exports: "Marionette"
    },
    "jquery-ui": ["jquery"],
    "jquery.spin": ["spin", "jquery"]
  }
});
require(["app"], function(BookManager){
	BookManager.start();
});

