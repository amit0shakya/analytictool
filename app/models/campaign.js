module.exports = function(app) {
	var bookshelf = app.get('bookshelf');

	var Campaign = bookshelf.Model.extend({
	    tableName: 'campaigns'
	});

	// create the model for users and expose it to our app
	return Campaign;
}