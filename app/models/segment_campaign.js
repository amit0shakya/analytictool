module.exports = function(app) {
	var bookshelf = app.get('bookshelf');

	var Application = bookshelf.Model.extend({
	    tableName: 'segment_campaign'
	});

	// create the model for users and expose it to our app
	return Application;
}