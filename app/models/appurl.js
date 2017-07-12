module.exports = function(app) {
	var bookshelf = app.get('bookshelf');

	var AppURL = bookshelf.Model.extend({
	    tableName: 'appurl'
	});

	return AppURL;
}