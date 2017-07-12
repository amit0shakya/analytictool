module.exports = function(app) {
	var bookshelf = app.get('bookshelf');

	var Segment = bookshelf.Model.extend({
	    tableName: 'segments'
	});

	// create the model for users and expose it to our app
	return Segment;
}