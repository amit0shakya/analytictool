var utilities = angular.module('Services')
utilities.service('UtilitiesService', function() {
	/* if input is 1234 it returns 1.23K */
	this.numberFormat = function(labelValue) {
		var val = Math.abs(Number(labelValue)) >= 1.0e+9 ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
		   : Math.abs(Number(labelValue)) >= 1.0e+6 ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
		   : Math.abs(Number(labelValue)) >= 1.0e+3 ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"
		   : Math.abs(Number(labelValue));
		if(labelValue<1000) {
			return val;
		}
		else {
			return parseFloat(val).toPrecision(3) + val.replace(/[^B|M|K]/g,"");
		}
	};
	/** sorts the elements of array in ascending order
	  * input data : [ {
						"x" : "a",
						"y" : 30
		  			  },
		  			  {
						"x" : "b",
						"y" : 20
		  			  }
		  			]
		output data :  {
						"x" : "b",
						"y" : 20
		  			  },
		  			  {
						"x" : "a",
						"y" : 30
		  			  }
		  			]
	  */
	this.ascending = function(data) {
		data.sort(function(a,b) {
			if(Number(a.y) > Number(b.y)) {
	    		return 1;
	    	}
	    	if(Number(a.y) < Number(b.y)) {
	    		return -1;
	    	}
	    	return 0;
		});
		return data;
	};
	/* same as above function but in descending order */
	this.descending = function(data) {
		data.sort(function(a,b) {
			if(Number(a.y) < Number(b.y)) {
	    		return 1;
	    	}
	    	if(Number(a.y) > Number(b.y)) {
	    		return -1;
	    	}
	    	return 0;
		});
		return data;
	};
	/* draws the chart in html elem with id as element_id and given width and height */
	this.draw_chart = function(data,chart,element_id,width,height) {
        var myChart = new FusionCharts( "fusionCharts/"+chart, element_id+"Chart", width, height, "0" );
        myChart.setJSONData(data);
        myChart.render(document.getElementById(element_id))
	}
	/* returns the total count of an array  sums all values with key "y" */
	this.total_count = function(data) {
		sum = 0
		for(i=0;i<data.length;i++)
			sum+=parseInt(data[i].y)
		return sum
	}
	/** data is json array 
			data : [ {
						"z" : "Nov 3",
						"a" : [ {
									"x" : "Nexus 4",
									"y" : 300
								}
							  ]
					  },
					  {
						"z" : "Nov 4",
						"a" : [ {
									"x" : "Nexus 4",
									"y" : 200
								}
							  ]
					  }
					]
	  *	x can be any string (general function) ex : devicemodel, installsource, network op etc
	  * creating a map with x as key and y as value
	  		map : {
					"Nexus 4" : 500
	  			  }
	  */
	this.map_from_array = function(data) {
		var map = {};
		for(i=0;i<data.length;i++) {
			var arr = data[i].a;
			for(j=0;j<arr.length;j++) {
				var arr_x = arr[j].x;
				var arr_y = arr[j].y;
				/* x value already exists in the map */
				if(arr_x in map) {
					map.arr_x += arr_y; 
				}
				else {
					map.arr_x = arr_y;
				}
			}
		}
		return map;	
	};
	/** construct an array in the format
		top_data : [ {
						"x" : "Nexus 4",
						"y" : 500
					  },
					  {
						"x" : "Nexus 5",
						"y" : 200
					  }
					]
	  */
	this.array_from_map = function(map) {
		var data = [];
		for(key in map) {
			data = data.concat({"x":key,"y":map[key]});
		}
		return data;
	};
	/** Input : day wise top elements
	   	Output: top elements for the given days
	  */
	this.top_cummulative = function(data,num){
		var map = this.map_from_array(data);
		var mod_data = this.array_from_map(map);
		mod_data = this.descending(mod_data);
		top_data = mod_data.slice(0,num);
		return top_data;
	};	

	this.top_cummulative_3var = function(data,parse,max){
		var device_map = {};
		for(i=0;i<data.length;i++)
		{
			if(parse){
				devices = JSON.parse(data[i].a);
			}	
			else{
				devices = data[i].a;
			}
			for(j=0;j<devices.length;j++)
			{
				var d_model = devices[j].x1;
				console.log(d_model);
				if(d_model in device_map) 
				{
					device_map[d_model].y = device_map[d_model].y + devices[j].y;
					device_map[d_model].x = devices[j].x2;
					console.log(device_map[d_model].y);
				}
				else
				{
					device_map[d_model] = {"x" : devices[j].x2, "y" : devices[j].y };
				}
			}
		}
		var array = [];
		for(a in device_map){
		 array.push([a,device_map[a].y])
		}
		array.sort(function(a,b)
		{
			return b[1] - a[1];
		});
		var top20 = [];
		console.log(array);
		if(max == undefined)  ///if max is not required
		{
			max = array.length;
		}
		for(i=0;i<array.length && i<max;i++) {
			var key = array[i][0];
			var device = { "x" : key, "y" : device_map[key].x, "z" : device_map[key].y};
			top20 = top20.concat(device);
		}
		return top20;
	}
	/*
	max - max nsize of array to be returned
	parse - whether to parse json string or not
	*/
	this.top_cummulative_2var = function(data,parse,max){
		var device_map = {};
		for(i=0;i<data.length;i++)
		{
			if(parse){
				devices = JSON.parse(data[i].a);
			}	
			else{
				devices = data[i].a;
			}
				

			for(j=0;j<devices.length;j++)
			{
				var d_manu = devices[j].x;
				if(d_manu in device_map) 
				{
					device_map[d_manu].y = device_map[d_manu].y + devices[j].y;
				}
				else
				{
					device_map[d_manu] = { "y" : devices[j].y };
				}
			}
		}
		var array = [];
		for(a in device_map){
		 array.push([a,device_map[a].y])
		}
		array.sort(function(a,b)
		{
			return b[1] - a[1];
		});
		var top = [];
		if(max == undefined)  ///if max is not required
		{
			max = array.length;
		}
		for(i=0;i<array.length && i<max; i++) {
			var key = array[i][0];
			var manu = { "x" : key, "y" : device_map[key].y };
			top = top.concat(manu);
		}
		return top;
	}

	/* if type = 1 , number of sessions sent
	   if type = 0 , both avg session length and number of sessions sent
	*/	
	this.session_split = function(data,type){
        var mod_data = [];
		for(k=0;k<data.length;k++)
	    {
	        data1 = JSON.parse(data[k].a);
	        var dev_sessions1 = [];
	        for(j=0;j<data1.length;j++)
	        {
	            var avg_session1 = parseFloat((data1[j].y).split('__')[1]);
	            var sessions1 = parseInt((data1[j].y).split('__')[0]);
	            if(type)
	            	dev_sessions1 = dev_sessions1.concat({"x": data1[j].x, "y": sessions1});
	        	else
	        		dev_sessions1 = dev_sessions1.concat({"x": data1[j].x, "y": sessions1, "k": avg_session1});
	        }
	        mod_data = mod_data.concat({"z": data[k].z, "a": dev_sessions1});
	    }
	    return mod_data;
	}
	/*
	max - max nsize of array to be returned
	parse - whether to parse json string or not
	*/
	this.top_cummulative_5var = function(data,parse,max){
		var device_map = {};
		for(i=0;i<data.length;i++)
		{
			if(parse){
				devices = JSON.parse(data[i].a);
			}	
			else{
				devices = data[i].a;
			}
				

			for(j=0;j<devices.length;j++)
			{
				var d_manu = devices[j].x2;
				if(d_manu in device_map) 
				{
					device_map[d_manu].y = device_map[d_manu].y + devices[j].x5;
					device_map[d_manu].z = device_map[d_manu].z + devices[j].x4;
					device_map[d_manu].a = device_map[d_manu].a + devices[j].x3;
				}
				else
				{
					device_map[d_manu] = { "y" : devices[j].x5, "z": devices[j].x4, "a": devices[j].x3, "m": devices[j].x1 };
				}
			}
		}
		var array = [];
		for(a in device_map){
		 array.push([a,device_map[a].y])
		}
		array.sort(function(a,b)
		{
			return b[1] - a[1];
		});
		var top = [];
		if(max == undefined)  ///if max is not required
		{
			max = array.length;
		}
		for(i=0;i<array.length && i<max; i++) {
			var key = array[i][0];
			var manu = { "x" : device_map[key].m+" "+ key, "y" : device_map[key].y, "z" : device_map[key].z, "a" : device_map[key].a };
			top = top.concat(manu);
		}
		return top;
	}

	this.top_cummulative_forsessions = function(data,parse,max){
		var device_map = {};
		for(i=0;i<data.length;i++)
		{
			if(parse){
				devices = JSON.parse(data[i].a);
			}	
			else{
				devices = data[i].a;
			}
			for(j=0;j<devices.length;j++)
			{
				var d_model = devices[j].x;
				console.log(d_model);
				if(d_model in device_map) 
				{
					device_map[d_model].x = device_map[d_model].x + (devices[j].y*devices[j].k);
					device_map[d_model].y = device_map[d_model].y + devices[j].y;
					console.log(device_map[d_model].y);
				}
				else
				{
					device_map[d_model] = {"x" : devices[j].k*devices[j].y , "y" : devices[j].y };
				}
			}
		}
		var array = [];
		for(a in device_map){
		 array.push([a,device_map[a].y])
		}
		array.sort(function(a,b)
		{
			return b[1] - a[1];
		});
		var top = [];
		console.log(array);
		if(max == undefined)  ///if max is not required
		{
			max = array.length;
		}
		for(i=0;i<array.length && i<max;i++) {
			var key = array[i][0];
			var device = { "x" : key, "y" : device_map[key].y, "z" : ((device_map[key].x/device_map[key].y)/60000).toFixed(2)};
			top = top.concat(device);
		}
		return top;
	}
})