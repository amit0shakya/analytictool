//While deploying on production Jenkins replaces the "/config/database.js" file with "/prod/database.js" file
module.exports = {
	  client: 'mysql',
	  connection: 
	  {
	    host     : 'localhost',
	    user     : 'rocq',
	    password : '6vs1qLBhUq1n8',
	    database : 'rocq',
	    charset  : 'utf8'
  	  }
};