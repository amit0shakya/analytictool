module.exports = function(app) {
	var bookshelf = app.get('bookshelf');

	var Funnel = bookshelf.Model.extend({
	    tableName: 'funnel'
	});

	// create the model for users and expose it to our app
	return Funnel;
}