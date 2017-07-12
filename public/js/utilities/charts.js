var chart_style = 
        { 
        			"palette" : "1",
        			"anchorRadius" : "4",
        			"anchorBorderThickness":"2" ,
					"lineThickness":"1" ,
					"bgcolor":"FFFFFF" ,
					"canvasbgcolor":"66D6FF" ,
					"canvasbgalpha":"5" ,
					"canvasborderthickness":"0" ,
					"canvasborderalpha":"1" ,
					"legendshadow":"1" ,
					"showvalues":"0" ,
					"alternatehgridcolor":"888888" ,
					"alternatehgridalpha":"0" ,
					"showborder":"0" ,
					"legendborderalpha":"0" ,
					"legendiconscale":"1.5" ,
					"divlineisdashed":"0" ,
					"theme":"fint" ,
					"anchorBgHoverColor":"#96d7fa" ,
					"anchorBorderHoverThickness":"4" ,
					"anchorHoverRadius":"6" ,
					"paletteColors":" 0099FF , FF0000 , 008ee4 , 6baa01 , f8bd19 , e44a00 , 33bdda" ,
					"labelPadding":"15" ,
					"labelDisplay":"WRAP",
					"yAxisValuesPadding":"15",
					"canvasPadding":"15",
					"toolTipBgColor":"#D0F5A9",
					"toolTipBorderColor":"#D9E5F1",
					"labelStep":"1",
        }

var bar_graph_style =
		{
			        "yaxisname": "Count",
			        "bgcolor": "#FFFFFF",
			        "showalternatehgridcolor": "0",
			        "showvalues": "1",
			        "labeldisplay": "WRAP",
			        "divlinecolor": "#CCCCCC",
			        "divlinealpha": "70",
			        "useroundedges": "1",
			        "canvasbgcolor": "#FFFFFF",
			        "canvasbasecolor": "#CCCCCC",
			        "showcanvasbg": "0",
			        "animation": "0",
			        "palettecolors": "#008ee4,#6baa01,#f8bd19,#e44a00,#33bdda",
		        	"showborder": "0"
		}


var pie_chart_style =
		{

				  "paletteColors": "#FF3300,#FF6600,#9966FF,#0099FF,#00CC00,#ff3399,#33CC33",
			      "bgColor": "#ffffff",
			      "showBorder": "0",
			      "use3DLighting": "0",
			      "showShadow": "0",
			      "enableSmartLabels": "0",
			      "startingAngle": "310",
			      "showLabels": "0",
			      "showPercentValues": "1",
			      "showValues": "1",
			      "showLegend": "1",
			      "legendShadow": "0",
			      "legendBorderAlpha": "0",
			      "showTooltip": "0",
			      "decimals": "0",
			      // "captionFontSize": "14",
			      // "subcaptionFontSize": "14",
			      // "subcaptionFontBold": "0",
			      "useDataPlotColorForLabels": "1",
			      "pieRadius": "80",
			      "doughnutRadius": "40"
		}



var doughnut_2d_wifi_style = 
		{
			      // "caption": "Split of Revenue by Product Categories",
			      // "subCaption": "Last year",
			      // "numberPrefix": "$",
			      "paletteColors": "#33CC33,#ffffff",
			      "bgColor": "#ffffff",
			      "showBorder": "0",
			      "use3DLighting": "0",
			      "showShadow": "0",
			      "enableSmartLabels": "0",
			      "startingAngle": "310",
			      "showLabels": "0",
			      "showPercentValues": "0",
			      "showValues": "0",
			      "showLegend": "0",
			      "legendShadow": "0",
			      "legendBorderAlpha": "0",
			      "defaultCenterLabel": "Wifi",
			      // "centerLabel": "$label $value%",
			      "centerLabelBold": "0",
			      "centerLabelFontSize":"20",
			      "showTooltip": "0",
			      "decimals": "0",
			      // "captionFontSize": "14",
			      // "subcaptionFontSize": "14",
			      // "subcaptionFontBold": "0",
			      "useDataPlotColorForLabels": "1",
			      "pieRadius": "70",
			      "doughnutRadius": "60"
		}


var doughnut_2d_cellular_style = 
		{
			      // "caption": "Split of Revenue by Product Categories",
			      // "subCaption": "Last year",
			      // "numberPrefix": "$",
			      "paletteColors": "#ffffff,#ff3399",
			      "bgColor": "#ffffff",
			      "showBorder": "0",
			      "use3DLighting": "0",
			      "showShadow": "0",
			      "enableSmartLabels": "1",
			      "startingAngle": "310",
			      "showLabels": "0",
			      "showPercentValues": "0",
			      "showValues": "0",
			      "showLegend": "0",
			      "legendShadow": "0",
			      "legendBorderAlpha": "0",
			      "defaultCenterLabel": "Cellular",
			      // "centerLabel": "$label $value%",
			      "centerLabelBold": "0",
			      "centerLabelFontSize":"20",
			      "showTooltip": "0",
			      "decimals": "0",
			      // "captionFontSize": "14",
			      // "subcaptionFontSize": "14",
			      // "subcaptionFontBold": "0",
			      "useDataPlotColorForLabels": "1",
			      "pieRadius": "70",
			      "doughnutRadius": "60"
		}


function multiLine(json,num)
{
	var limit = 10;
	var gap = 1;
	var chart = 
	{
		"chart" : chart_style
	}
	
	var len = json.length;
   

	chart["categories"] = [];
	
	var category = [];
	
	for(i=0 ; i < len;i++)
    {
    	category_label = { "label" : json[i].z};	
    	category = category.concat(category_label);
    }

	chart["categories"] = chart["categories"].concat({"category":category});

	chart["dataset"] = [];

	for(i=0 ; i < num ;i++)
	{
		series = { "seriesname" : json[0].a[i].x };

		data = [];
	    for(j=0;j<len; j++)
	    {	
	    	data_point = { "value" : json[j].a[i].y };
	    	data = data.concat(data_point);
	    }
	    series["data"] = data ;
	    chart["dataset"] = chart["dataset"].concat(series);
	}	

	definition = [ {"name":"captionFont","type":"font","size":"15"}  ];
	application = [ { "toobject": "caption" , "styles": "captionfont" } ];

	chart["styles"] = { "definition" : definition , "application" : application};
	return chart;
}

function line(line_json) {
	var limit = 10;
    var len = line_json.length;
    if(len > limit)
        chart_style["labelStep"] = Math.ceil(len/limit).toString();

    var chart = 
    {
        "chart" : chart_style
    }
	    
    chart["data"] = [];
    var data_point;

    for(i=0;i<len;i++) {
        data_point = {"label" : line_json[i].x , "value":line_json[i].y }
        chart["data"] = chart["data"].concat(data_point);
    }

    return chart;
}

function bargraph(bar_json) {

	var len = bar_json.length;

	var chart = 
    {
        "chart" : bar_graph_style
    }


    chart["data"] = [];
    var data_point;

    for(i=0;i<len;i++) {
        data_point = {"label" : bar_json[i].x , "value":bar_json[i].y }
        chart["data"] = chart["data"].concat(data_point);
    }

    return chart;

}

function piechart(pie_json) {

	var len = pie_json.length;

	var chart = 
    {
        "chart" : pie_chart_style
    }


    chart["data"] = [];
    var data_point;

    for(i=0;i<len;i++) {
    	var length = pie_json[i].screenName.split(".").length;
        data_point = {"label" : pie_json[i].screenName.split(".")[length-1] , "value" : parseFloat(pie_json[i].avgTime) / 60000 }
        chart["data"] = chart["data"].concat(data_point);
    }

    return chart;

}

function piechart_op(pie_json) {

	var len = pie_json.length;

	var chart = 
    {
        "chart" : pie_chart_style
    }


    chart["data"] = [];
    var data_point;

    for(i=0;i<len;i++) {
    	if (pie_json[i].x != "") {
	        data_point = {"label" : pie_json[i].x , "value" : pie_json[i].y }
	        chart["data"] = chart["data"].concat(data_point);
	    }
    }

    return chart;

}

function doughnut2d(pie_json, style, val) {

	var len = pie_json.length;

	style.defaultCenterLabel = style.defaultCenterLabel + " \n" + val + "%";

	var chart = 
    {
        "chart" : style
    }


    chart["data"] = [];
    var data_point;

    for(i=0;i<len;i++) {
        data_point = {"label" : pie_json[i].x , "value" : pie_json[i].y }
        chart["data"] = chart["data"].concat(data_point);
    }

    return chart;

}
