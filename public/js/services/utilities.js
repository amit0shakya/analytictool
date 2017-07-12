var utilities = angular.module('Services');
utilities.service('UtilitiesService', ['$rootScope',function($rootScope) {
	/* if input is 1234 it returns 1.23K */
	this.numberFormat = function(labelValue) {
		if (labelValue==undefined) {return 0};
		if (isNaN(labelValue)) {return 0};
		if (isNaN(Number(labelValue))) {return 0};
		var val = Math.abs(Number(labelValue)) >= 1.0e+9 ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
		   : Math.abs(Number(labelValue)) >= 1.0e+6 ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
		   : Math.abs(Number(labelValue)) >= 1.0e+3 ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"
		   : Math.abs(Number(labelValue))+"";
		if(labelValue<1000) {
			return Math.round(labelValue);
		}
		else {
			return parseFloat(val).toPrecision(3) + val.replace(/[^B|M|K]/g,"");
		}
	};

	this.CommaSeparatedNumberFormat = function(labelValue) {
		if (labelValue==undefined) {return 0};
		if (isNaN(labelValue)) {return 0};
		if (isNaN(Number(labelValue))) {return 0};
		// uncomment this line line to get comma separation after 3 digits.
	//	return labelValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		labelValue=Number(labelValue)
		x=labelValue.toFixed(0);
		var lastThree = x.substring(x.length-3);
		var otherNumbers = x.substring(0,x.length-3);
		if(otherNumbers != '')
  		lastThree = ',' + lastThree;
		return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
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
	this.ascending = function(data,noVar) {
		if(typeof data == 'string')
		{
			return data
		}
		data.sort(function(a,b) 
		{
			if(noVar == 2)
			{	
				var temp1 = Number(a.y)
				var temp2 = Number(b.y)
			}
			if(noVar == 3)
			{	
				var temp1 = Number(a.z)
				var temp2 = Number(b.z)
			}	
			if(temp1 > temp2) {
	    		return 1;
	    	}
	    	if(temp1 < temp2) {
	    		return -1;
	    	}
	    	return 0;
		});
		return data;
	};
	/* same as above function but in descending order */
	this.descending = function(data,noVar) {
		if(typeof data == 'string')
		{
			return data
		}
		data.sort(function(a,b) 
		{
			if(noVar == 2)
			{	
				var temp1 = Number(a.y)
				var temp2 = Number(b.y)
			}
			if(noVar == 3)
			{	
				var temp1 = Number(a.z)
				var temp2 = Number(b.z)
			}	
			if(temp1 < temp2) {
	    		return 1;
	    	}
	    	if(temp1 > temp2) {
	    		return -1;
	    	}
	    	return 0;
		});
		return data;
	};


	/* draws the chart in html elem with id as element_id and given width and height */
	this.draw_chart = function(data,chart,element_id,width,height) {

		var exportevent = 
	    {
	        "renderComplete": function (e, a) {

	        		   var ToPdf = element_id+"_exportpdf";
	        		   var ToPng = element_id+"_exportpng";
	                   
	                   // Cross-browser event listening
	                   var addListener = function (elem, evt, fn) {
	                       if (elem && elem.addEventListener) {
	                       		//elem.removeEventListener(evt, undefined);
	                           elem.addEventListener(evt, fn);
	                       }
	                       else if (elem && elem.attachEvent) {
	                       	   //elem.detachEvent("on" + evt, undefined);
	                           elem.attachEvent("on" + evt, fn);

	                       } 
	                       else {
	                           elem["on" + evt] = fn;
	                       }
	                   };

	                   var removeListener = function (el) {
	                   		elClone = el.cloneNode(true);

							el.parentNode.replaceChild(elClone, el);
	                   }
	                   
	                   // Export chart method
	                   var exportFC = function () {

	                       var types = { 
	                           'exportpdf': "pdf",
	                           'exportpng': "png"
	                       };
	                       if (e && e.sender && e.sender.exportChart) {
	                            e.sender.exportChart({
	                               exportFileName: element_id,
	                               exportFormat: types[(this.id).split('_').pop()]
	                           });
	                       }
	                   };
	                   
	                   // Remove events
	                   removeListener(document.getElementById(ToPdf))
	                   removeListener(document.getElementById(ToPng))
	                   // Attach events
	                   addListener(document.getElementById(ToPdf), "click", exportFC);
	                   addListener(document.getElementById(ToPng), "click", exportFC);
	               }
	    }

        var myChart = new FusionCharts( "fusionCharts/"+chart, element_id+"Chart", width, height, "0" ,{events: exportevent});
        myChart.setJSONData(data);
        myChart.render(document.getElementById(element_id))
	}
	/* returns the total count of an array  sums all values with key "y" */
	this.total_count = function(data) {
		sum = 0
		for(i=0;i<data.length;i++) {
			sum+=parseInt(data[i].y)
		}
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
				if(d_model in device_map) 
				{
					device_map[d_model].y = device_map[d_model].y + devices[j].y;
					device_map[d_model].x = devices[j].x2;
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

	this.session_split_2 = function(data,type){
        var mod_data = [];
		for(k=0;k<data.length;k++)
	    {
            
            if(type == 1)
            {
            	var sessions1 = parseInt((data[k].y).split('__')[0]);
            	var avg_session1 = parseFloat((data[k].y).split('__')[1]/60000).toFixed(2);
	       		mod_data = mod_data.concat({"x": data[k].x, "y": sessions1});
            }
	       	else if(type == 2)
	       	{
	       		var sessions1 = parseInt((data[k].z).split('__')[0]);
            	var avg_session1 = parseFloat((data[k].z).split('__')[1]/60000).toFixed(2);
	       		mod_data = mod_data.concat({"x": data[k].y+" "+data[k].x, "y": sessions1, "z":avg_session1});
	       	}
	        else if(type == 3)
	       	{
	       		var sessions1 = parseInt((data[k].z).split('__')[0]);
            	var avg_session1 = parseFloat((data[k].z).split('__')[1]/60000).toFixed(2);
	       		mod_data = mod_data.concat({"x": data[k].y+" "+data[k].x, "y": sessions1});
	       	}
	       	else
	       	{
	       		var sessions1 = parseInt((data[k].y).split('__')[0]);
            	var avg_session1 = parseFloat((data[k].y).split('__')[1]/60000).toFixed(2);
            	mod_data = mod_data.concat({"x": data[k].x, "y": sessions1, "z":avg_session1});
            }
	    }
	    return mod_data;
	}

	/*
	max - max size of array to be returned
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
					device_map[d_manu].y = device_map[d_manu].y + devices[j].x6;
					device_map[d_manu].z = device_map[d_manu].z + devices[j].x5;
					device_map[d_manu].a = device_map[d_manu].a + devices[j].x3;
				}
				else
				{
					device_map[d_manu] = { "y" : devices[j].x6, "z": devices[j].x5, "a": devices[j].x3, "m": devices[j].x1 };
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
				if(d_model in device_map) 
				{
					device_map[d_model].x = device_map[d_model].x + (devices[j].y*devices[j].k);
					device_map[d_model].y = device_map[d_model].y + devices[j].y;
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
// type is optional and pass it if you want to use clicklistener on map
// type==1 is for paid maps; tyoe==2 is for Organic maps
	this.draw_map = function(data,chart,element_id,width,height,type) {
		var entityClicked=null;
		if (type!==undefined) {
			
			if (type==1) 
			{
				entityClicked =
				{
					"entityClick" : data.entityclicked
			}
		}
		
			
	};
		
		
		var myMap = new FusionCharts(chart, element_id+"Chart", width, height, "0",{events: entityClicked} );
		myMap.setJSONData(data);
		myMap.setTransparent(true);
		myMap.render(document.getElementById(element_id));
	}

	var fill_map = function(elements,map,type){	
		for(j=0;j<elements.length;j++)
			{
				switch(type){
					case 2: 
						var d_manu = elements[j].x;
						if(d_manu in map) 
						{
							map[d_manu].y = map[d_manu].y + elements[j].y;
						}
						else
						{
							map[d_manu] = { "y" : elements[j].y };
						}
						break;
					case 3:
						var d_manu = elements[j].x2;
						if(d_manu in map) 
						{
							map[d_manu].y = map[d_manu].y + elements[j].y;
							map[d_manu].x = elements[j].x1;
						}
						else
						{
							map[d_manu] = {"x" : elements[j].x1, "y" : elements[j].y };
						}
						break;
					case 5:
						var d_manu = elements[j].x2;
						if(d_manu in map) 
						{
							map[d_manu].y = map[d_manu].y + elements[j].x6;
							map[d_manu].z = map[d_manu].z + elements[j].x5;
							map[d_manu].a = map[d_manu].a + elements[j].x3;
						}
						else
						{
							map[d_manu] = { "y" : elements[j].x6, "z": elements[j].x5, "a": elements[j].x3, "m": elements[j].x1 };
						}
						break;
				}
			}
	}

	this.top_cummulative_new = function(data,parse,type,max){
		var map = {};
		for(i=0;i<data.length;i++)
		{
			if(parse){
				elements = JSON.parse(data[i].a);
			}	
			else{
				elements = data[i].a;
			}
			fill_map(elements,map,type);
		}
		var array = [];
		for(a in map){
		 array.push([a,map[a].y])
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
			switch(type){

					case 2:
						var temp = { "x" : key, "y" : map[key].y };
						break;

					case 3:
						var temp = { "x" : key, "y" : map[key].x, "z" : map[key].y};
						break;

					case 5:
						var temp = { "x" : map[key].m+" "+ key, "y" : map[key].y, "z" : map[key].z, "a" : map[key].a };
						break;

			}
			top = top.concat(temp);
		}
		return top;
	}

	this.convertToMinutes = function(seconds){
		if (seconds<0 && $rootScope.user.username!='hello@rocq.io') {
			seconds=-seconds
		};
		
	    return Math.floor(seconds/60)+":"+("00"+seconds%60).slice(-2);
	}

	this.generateUUID = function(){
		var d = new Date().getTime();
	    var uuid = 'xxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    return uuid;
	}
}]);