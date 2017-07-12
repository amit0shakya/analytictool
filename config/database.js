module.exports = {
	  client: 'mysql',
	  connection: 
	  {
	    host     : '148.251.42.132',
	    user     : 'root',
	    password : 'IZIphjdoSS',
	    database : 'rocq',
	    charset  : 'utf8'
	   	// host     : '148.251.42.155',  
	    // user     : 'rq',
	    // password : 'rocq@123456',
	    // database : 'rocq2',
	    // charset  : 'utf8'

  	  }
};


// create table users (
// 	id int not null auto_increment,
// 	username varchar(150) not null,
// 	password varchar(150) not null,
// 	firstname varchar(150) not null,
// 	lastname varchar(150),
// 	phonenumber varchar(150),
// 	company varchar(150) not null,
// 	jobtitle varchar(150),
// 	primary key (id)
// );

// create table applications (
// 	id int not null auto_increment,
// 	application varchar(150) not null,
// 	category varchar(150) not null,
// 	username varchar(150) not null,
// 	app_secret varchar(150) not null,
// 	ostype varchar(150) not null,
// 	created_on varchar(150) not null,
// 	primary key (id)
// );

// create table segments (
// 	id int not null auto_increment,
// 	segmentname varchar(150) not null,
// 	domainname varchar(150) not null,
// 	app_secret varchar(150) not null,
// 	primary key (id)
// );

// create table campaigns (
// 	id int not null auto_increment,
// 	campaignname varchar(150) not null,
// 	campaignkey varchar(150) not null,
// 	app_secret varchar(150) not null,
// 	message varchar(150),
// 	segment varchar(150) not null,
// 	url varchar(150),
// 	primary key (id)
// );

// ALTER TABLE campaigns
// ADD landing varchar(150) not null

// INSERT INTO campaigns (campaignname, campaignkey, app_secret, message, segment, url)
// VALUES ('TEST15','548955f2-f9cf-4ce7-a2c2-d3b7323b8bc0','91c556949f','test','DormantThree','');

// INSERT INTO segments (segmentname, domainname, app_secret)
// VALUES 
// ('Test','TEST','2665c38c69');