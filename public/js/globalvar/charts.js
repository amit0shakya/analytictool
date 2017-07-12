var chart_style =
        {
    			"palette" : "1",
    			"anchorRadius" : "4",
    			"anchorBorderThickness":"2" ,
					"lineThickness":"1" ,
					"bgcolor":"FFFFFF" ,
					"canvasbgcolor":"#EFF0F8" ,
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
					"paletteColors":" #B282C7 , #82AFE7 , #B8BFCF , #6baa01 , #f8bd19 , #e44a00 , #33bdda" ,
					"labelPadding":"15" ,

					//"labelDisplay":"WRAP",
					"yAxisValuesPadding":"15",
					"canvasPadding":"15",
					"toolTipBgColor":"#FEFEFE",
					"toolTipBorderColor":"#D9E5F1",
					"labelStep":"1",
					"divlinecolor": "#D6D8DA"

        }

var new_user_line_style=
        {           "yaxisname":"USERS",
                    "baseFontSize":"11",
                    "showAlternateHGridColor":"0",
                    "alternateHGridColor":"#F8F8F8",
                    "paletteColors":"#1199D5",
                    "showBorder":"0",
                    "bgcolor":"#FFFFFF",
                    "lineThickness":"1.5",
                    "showShadow":"0",
                    "showValues":"0",
                     "tickWidth": "10",
                    "showCanvasBorder":"1",
                    "canvasBorderColor":"#EFEFEF",
                    "canvasBorderThickness":"1.5",
                    "showLegend":"1",
                    "divLineColor":"#bfbfbf",


                    "numVDivLines":"6",
                    //"adjustDiv":"1",
                    "anchorRadius":"4",
                    "anchorBorderThickness":"2",
                    //"anchorAlpha":"0",
                    //"anchorHoverRadius":"4",
                    //"plotgradientcolor":"#5A5555",
                    //"plotFillAlpha":"1",
                     "anchorHoverRadius":"6",
                   // "plotFillHoverColor":"#1199D5",
                    "plotFillAlpha":"1",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

        }

  var new_user_device_multiline_style=
        {           "yaxisname":"USERS",
                    "baseFontSize":"11",
                    "showAlternateHGridColor":"1",
                    "alternateHGridColor":"#F8F8F8",
                    "paletteColors":"#1199D5, #e74c39,#2cc185",
                    "showBorder":"0",
                    "anchorHoverRadius":"6",
                    "bgcolor":"#FFFFFF",
                    "lineThickness":"1.5",
                    "showShadow":"0",
                    "showValues":"0",
                    "showCanvasBorder":"1",
                    "canvasBorderColor":"#EFEFEF",
                    "canvasBorderThickness":"1.5",
                    "showAlternateHGridColor":"0",
                    "showLegend":"1",
                    "divLineColor":"#bfbfbf",
                    //"showvDivLine":"1",
                     //"vDivLineColor":"#F0F0F0",
                    "numVDivLines":"6",
                    "divLineThickness":"1.2",
                    "adjustDiv":"1",
                    "anchorRadius":"4",
                    "anchorBorderThickness":"2",
                   //"plotFillHoverColor":"#1199D5",
                   // "anchorBorderColor": "#127fcb",
                    //"anchorAlpha":"100",
                       // "anchorBgColor": "#d3f7ff,#FEFEFE",
                  // "anchorbordercolor":"#FEFEFE",
                    "toolTipBgColor": "#FEFEFE",
                    "toolTipColor": "#000000",
                    "legendbgColor": "FEFEFE",
                    "legendBorderColor": "FEFEFE",
                    "legendShadow":"0",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

                }
     var acquisition_overview_installVsUninstall_multiline_style =
        {
            "yaxisname":"USERS",
            "baseFontSize":"13",
            "paletteColors": "#e5b021, #c82138",
            "showBorder": "0",
            "bgcolor": "#FFFFFF",
            "lineThickness": "1.5",
            "showShadow": "0",
            "showValues": "0",
            "showCanvasBorder": "0",
            "showAlternateHGridColor": "0",
            "showLegend": "1",
            "divLineColor": "#bfbfbf",
            "numVDivLines":"6",
            "showvDivLine": "0",
            "divLineThickness": "1.2",
            "adjustDiv": "1",
            "showLegend": "1",
            "legendBgColor": "#ffffff",
            "legendBorderColor": "#ffffff",
            "legendShadow": "0",
            "anchorRadius":"3",
               "anchorHoverRadius":"6",
            "anchorBorderThickness":"2",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }
     var acquisition_overview_paidVsOrganic_multiline_style =
        {    "yaxisname":"USERS",
            "baseFontSize":"11",
            "paletteColors": "#f8a20f, #32d2c9",
            "showBorder": "0",
            "bgcolor": "#FFFFFF",
            "lineThickness": "1.5",
            "showShadow": "0",
            "showValues": "0",
            "showCanvasBorder": "0",
            "showAlternateHGridColor": "0",
            "showLegend": "1",
            "divLineColor": "#bfbfbf",
            "showvDivLine": "0",
            "divLineThickness": "1.2",
            "adjustDiv": "1",
            "anchorRadius": "3",

            "anchorBorderThickness": "2",
            "anchorHoverRadius":"6",
           // "plotFillHoverColor": "#bfbfbf",
            "showvDivLine":"1",
            "vDivLineColor": "#bfbfbf",
            "numVDivLines":"6",
            "showLegend":"1",
            "legendBgColor": "#ffffff",
            "legendBorderColor": "#ffffff",
            "legendShadow":"0",
            //"labeldisplay": "WRAP",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }
  var dashboard_newusers_line_style=
        {          "yaxisname":" USERS",
                    "baseFontSize":"11",
                    "paletteColors":"#1199D5",
                    "showBorder":"0",
                    "showCanvasBorder":"0",
                    "bgcolor":"#FFFFFF",
                    "lineThickness":"1.5",
                    "showShadow":"0",
                    "showValues":"0",
                    "canvasBorderColor":"#EFEFEF",
                    "canvasBorderThickness":"1.5",
                    "showLegend":"1",
                    "divLineColor": "#bfbfbf",
                    "numVDivLines":"6",
                    "showPlotBorder":"0",
                    //"divLineDashed":"1",
                    "plotFillColor":"#edf7f9",
                    "showAnchor":"1",
                    "anchorRadius":"4",
                    "anchorBorderThickness":"2",
                    "anchorHoverRadius":"6",
                   // "plotFillHoverColor":"#1199D5",
                    "showAlternateHGridColor":"0",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "toolTipBgColor": "#FEFEFE",
                    "toolTipColor": "#000000",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

        }

    var dashboard_activeusers_line_style =
        {
            "yaxisname":"USERS",
            "baseFontSize":"11",
            "paletteColors": "#000000",
            "showBorder": "0",
            "bgcolor": "#FFFFFF",
            "lineThickness": "1.5",
            "showShadow": "0",
            "showValues": "0",
            "showCanvasBorder": "0",
            "showAlternateHGridColor": "0",
            "showLegend": "1",
            "divLineColor": "#bfbfbf",
            //"showvDivLine": "1",
            "divLineThickness": "1.2",
             "dynamicaxis": "1",
             "canvasbasecolor":"#EFEFEF",
             "canvasborderthickness":"1.5",
            "adjustDiv": "1",
            "showAnchor":"0",
            "anchorRadius": "3",
            "anchorBorderThickness": "2",
             "anchorHoverRadius":"6",
            //"plotFillHoverColor": "#32d4c9",
            "showvDivLine":"1",
            "numVDivLines":"6",
            //"vDivLineColor": "#bfbfbf",
            //"numVDivLines":"0",
            "showLegend":"1",
            "legendBgColor": "#ffffff",
            "legendBorderColor": "#ffffff",
            "legendShadow":"0",
           // "divLineDashed":"1",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }

    var dashboard_network_type_pie_chart_style=
    {
       // "paletteColors": "#8bb873, #597a9b, #009ece, #ae8d6d, #92d2c9",
         "paletteColors": "#597a9b , #3fbae4,#74d181,#a6825e,#1ad2d2",
              "bgColor": "#ffffff",
              "manageLabelOverflow":"0",
              "useEllipsesWhenOverflow":"0",
             "showBorder": "0",
              "showShadow": "0",
              "enableSmartLabels": "0",
              "enablemultislicing": "0",
              "pieRadius":"70",
              "doughnutRadius":"54",
              "showBorder":"0",
                "defaultCenterLabel":"Data Type",
                "centerLabelBold": "0",
               "centerLabel": "$label<br>$displayvalue",
               "centerLabelBold": "1",
               "showValues":"0",
               "showLabels":"0",
               "showPercentValues":"0",
               "showlegend": "1",
               "legendbgColor":"#ffffff",
               "legendShadow":"0",
               "legendBorderAlpha":"0",
               "legendposition": "bottom",
                "legendItemFontSize":"10",

             // "labelDistance":"-10",
              "use3DLighting":"0",
              "labelSepChar": ",",
              "labelFontItalic": "0",
             "baseFontSize": "13",
             //"baseFontColor": "#cbc9c9",
              //"labelFontSize": "11",
              "labelFontColor":"#5A5555",
              "showPlotBorder":"0",
              "animation":"0",
              "isSmartLineSlanted": "0",
              "showToolTip":"0",
             // "enableRotation": "0",
              "slicingDistance":"5",
              "skipOverlapLabels":"1",
              "exportEnabled":"1",
              "exportAtClient":"0",
              "exportShowMenuItem": "0",
              "exportHandler":"http://export.api3.fusioncharts.com/",
              "exportAction":"download"

          }


    var dashboard_installs_uninstalls_pie_chart_style=

        {
                "showPercentValues": "0",
                "bgColor": "#ffffff",
                "manageLabelOverflow": "1",
                "useEllipsesWhenOverflow": "1",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "use3DLighting": "0",
                "showShadow": "0",
                "enableSmartLabels": "0",
                "paletteColors":"#74d181, #2a8ec0",
                "placevaluesinside":"0",
                "showLabels":"0",
                "showValues":"0",
                "pieRadius":"50",
                "labelDistance":"0",
                "smartLabelClearance":"0",
                "showLegend":"1",
                "legendBgColor":"#ffffff",
                "legendBorderColor":"#ffffff",
                "legendPosition":"bottom",
                "legendShadow":"0",
                "showTooltip":"1",
                "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                 "toolTipBgAlpha":"0",
                "showToolTipShadow":"0",
                "toolTipBorderThickness": "0",
                "enableRotation":"0",
                "slicingDistance": "0",
                "labelFontItalic": "0",
                 "labelFontSize": "11",
                 "labelFontColor":"#5A5555",
                 "legendItemFontSize": "10",
                 "legendItemFontColor":"#5A5555",
                // "legendPosition":"right"

        }
    var dashboard_overview_paidVsOrganic_multiline_style =
        {
            "paletteColors": "#f8a20f, #32d2c9",
            "showBorder": "0",
            "bgcolor": "#FFFFFF",
            "lineThickness": "1.5",
            "showShadow": "0",
            "showValues": "0",
            "showCanvasBorder": "0",
            "showAlternateHGridColor": "0",
            "showLegend": "1",
            "divLineColor": "#bfbfbf",
            "showvDivLine": "0",
            "divLineThickness": "1.2",
            "adjustDiv": "1",
            "anchorRadius": "5.5",
            "anchorBorderThickness": "2",
            "anchorHoverRadius":"6",
           // "plotFillHoverColor": "#1199D5",
            "showvDivLine":"1",
            "vDivLineColor": "#bfbfbf",
            "numVDivLines":"6",
            "showLegend":"1",
            "legendBgColor": "#ffffff",
            "legendBorderColor": "#ffffff",
            "legendShadow":"0",
            //"labeldisplay": "WRAP"

        }

var dashboard_overview_revenuebysource_bar_style=
        {
            "yaxisname": "REVENUES",
            "baseFontSize":"11",
            "bgcolor": "#FFFFFF",
            "showalternatehgridcolor": "0",
            "showvalues": "1",
            //"labeldisplay": "WRAP",
            "divlinecolor": "#bfbfbf",
            "numVDivLines":"6",
            //"divlinealpha": "50",
            "useroundedges": "0",
            "canvasbgcolor": "#FFFFFF",
            "canvasbasecolor": "#CCCCCC",
            "showcanvasbg": "0",
            "animation": "0",
            "palettecolors": "#C1BC2B,#ED556E,#A6825E,#2B8EC1,#F8A20F,#32D2C9",
            "showborder": "0",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "showCanvasBorder": "0",
            "plotFillAlpha": "90",
            "plotSpacePercent":"65",
            // "labelFontColor": "#a5a5a5",
            // "labelFontBold":"1",
            "showValues":"0",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }

var new_user_source_installs_multiline_style=
        {           "yaxisname":"USERS",
                    "baseFontSize":"11",
                    "paletteColors":"#065194, #cb6175, #acb6c6,#a66bbe,#32d2c9",
                    "showBorder":"0",
                    "showCanvasBorder":"0",
                    "bgcolor":"#FFFFFF",
                    "lineThickness":"1.5",
                    "showShadow":"0",
                    "showValues":"0",
                    "canvasBorderColor":"#EFEFEF",
                    "canvasBorderThickness":"1.5",
                    "showLegend": "1",
                    "legendbgColor": "FEFEFE",
                    "legendBorderColor": "FEFEFE",
                    "legendShadow":"0",
                    "divLineColor":"#bfbfbf",
                    //"divLineThickness":"1.2",
                    "showPlotBorder":"0",
                    //"vDivLineColor":"#F0F0F0",
                    "numVDivLines":"6",
                    "adjustDiv": "1",
                     "anchorHoverRadius":"6",
                    "plotFillColor":"#edf7f9",
                    "showAnchor":"1",
                    "anchorRadius":"4",
                    "anchorBorderThickness":"2",
                    //"plotFillHoverColor":"#1199D5",
                    "showAlternateHGridColor":"0",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "toolTipBgColor": "#FEFEFE",
                    "toolTipColor": "#000000",
                    "exportEnabled": "1",
                    "exportAtClient": "0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"
                }
   var new_user_source_uninstalls_multiline_style =
        {   "yaxisname":"USERS",
            "baseFontSize":"11",
            "paletteColors": " #d0d7e1, #cdb5d6, #a5e8e4,#a66bbe,#32d2c9",
            "showBorder": "0",
            "showCanvasBorder": "0",
            "canvasBgColor": "#f9f9f9",
            "canvasbgalpha": "10",
            "bgcolor": "#f9f9f9",
            "lineThickness": "1.5",
            "showShadow": "0",
            "showValues": "0",
            "canvasBorderColor": "#d7d7d7",
            "canvasBorderThickness": "1.2",
            "showLegend": "1",
            "legendbgColor": "FEFEFE",
            "legendBorderColor": "FEFEFE",
            "legendShadow": "0",
            "divLineColor": "#bfbfbf",
            //"divLineAlpha":"10",
            //"divLineThickness": "1",
            "showPlotBorder": "0",
            //"vDivLineColor": "#F0F0F0",
            "numVDivLines": "6",
            "adjustDiv": "1",
            //"plotFillColor": "#edf7f9",
            "showAnchor": "1",
            "anchorRadius": "0",
            "anchorBorderThickness": "1.5",
             "anchorHoverRadius":"6",
            //"plotFillHoverColor": "#1199D5",
            "showAlternateHGridColor": "0",
            //"labeldisplay": "WRAP",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled": "1",
            "exportAtClient": "0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }
var organic_inorganic_pie_chart_style=
            {
                "showPercentValues": "1",
                "bgColor": "#ffffff",
                "manageLabelOverflow": "1",
                "useEllipsesWhenOverflow": "1",
                    "bgColor": "#ffffff",
                    "showBorder": "0",
                    "use3DLighting": "0",
                    "showShadow": "0",
                    "enableSmartLabels": "0",
                    "paletteColors":"#74d181, #2a8ec0",
                    "showLabels":"0",
                    "showValues":"0",
                    "pieRadius":"80",
                    "labelDistance":"0",
                    "smartLabelClearance":"0",
                    "showLegend":"1",
                    "legendBgColor":"#ffffff",
                    "legendBorderColor":"#ffffff",
                    "legendShadow":"0",
                    "showTooltip":"1",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "enableRotation":"0",
                    "slicingDistance": "5",
                    "labelFontColor":"5A5555",
                    "labelFontSize": "10",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"
                    //"placeValuesInside":"1"

            }

    var oa_overview_network_type_pie_chart_style=

    {
                "showPercentValues": "0",
                "bgColor": "#ffffff",
                "manageLabelOverflow": "1",
                "useEllipsesWhenOverflow": "1",
                    "bgColor": "#ffffff",
                    "showBorder": "0",
                    "use3DLighting": "0",
                    "showShadow": "0",
                    "enableSmartLabels": "0",
                    "paletteColors": "#597a9b , #3fbae4,#74d181,#a6825e,#1ad2d2",
                    "showLabels":"0",
                    "showvalues":"0",
                    "pieRadius":"80",
                    "labelDistance":"-5",
                    "smartLabelClearance":"1",
                    "showLegend":"1",
                    "legendBgColor":"#ffffff",
                    "legendBorderColor":"#ffffff",
                    "legendShadow":"0",
                   "showTooltip":"1",
                "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                 "toolTipBgAlpha":"0",
                "showToolTipShadow":"0",
                "toolTipBorderThickness": "0",

                    "enableRotation":"0",
                    "slicingDistance": "0",
                    "labelFontItalic": "0",
                     //"baseFontSize": "22",
                    "baseFontColor": "#cbc9c9",
                     "labelFontSize": "11",
                     "labelFontColor":"#5A5555",
                     "legendItemFontSize": "11",
                     "legendItemFontColor":"#5A5555",
                     "legendPosition":"bottom",
                     "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

    }
     var oa_network_network_type_pie_chart_style=

    {
                "showPercentValues": "0",
                "bgColor": "#ffffff",
                "manageLabelOverflow": "0",
                "useEllipsesWhenOverflow": "1",
                    "bgColor": "#ffffff",
                    "showBorder": "0",
                    "use3DLighting": "0",
                    "showShadow": "0",
                    "enableSmartLabels": "1",

                    "paletteColors": "#597a9b , #3fbae4,#74d181,#a6825e,#1ad2d2",
                    "showlabels":"1",
                    "showvalues":"0",
                    "pieRadius":"120",
                    "labelDistance":"-5",
                    "smartLabelClearance":"0",
                    "showLegend":"1",
                    "legendBgColor":"#ffffff",
                    "legendposition":"bottom",
                    "legendBorderColor":"#ffffff",
                    "legendShadow":"0",
                   "showTooltip":"1",
                "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                 "toolTipBgAlpha":"0",
                "showToolTipShadow":"0",
                "toolTipBorderThickness": "0",

                    "enableRotation":"0",
                    "slicingDistance": "5",
                    "labelFontItalic": "0",
                    //  "baseFontSize": "22",
                    "baseFontColor": "#cbc9c9",
                     "labelFontSize": "11",
                     "labelFontColor":"#5A5555",
                     "legendItemFontSize": "11",
                     "legendItemFontColor":"#5A5555",
                    // "legendiconscale":"4",
                     "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"


    }
var top_keywords_doughnut_style=
            {

              "paletteColors": "#FF7553,#E74C39,#F06050,#01B0D1,#2CC185,#0ACDC7,#4A8DC0",
                  "bgColor": "#ffffff",
                  "showBorder": "0",
                  "use3DLighting": "0",
                  "showShadow": "0",
                  "enableSmartLabels": "1",
                  "startingAngle": "310",
                  "showLabels": "0",
                 "showPercentValues": "1",
                  "showValues": "1",
				  "enablemultislicing": "0",
                  "showLegend": "1",
                  "legendItemFontColor":"5A5555",
                  "legendPosition":"bottom",
                  "legendbgColor":"#ffffff",
                  "legendShadow":"0",
                  "legendBorderAlpha":"0",
                  "showTooltip": "0",
                   "centerLabel":"$label<br>$displayvalue",
                   "centerLabelBold":"1",
                  "useDataPlotColorForLabels": "1",
                  "pieRadius": "80",
                  "doughnutRadius": "51",
                  "labelDistance":"-8",
                  "labelSepChar":" ",
                  "labelFontItalic":"1",
                  "baseFontSize":"13",
                  //"baseFontColor":"#cbc9c9",
                  "labelFontSize":"10",
                 "defaultCenterLabel":"Search Keywords",
                   "legendNumColumns":"2",
                  "isSmartLineSlanted":"0",
                  "showPlotBorder":"0",
                  "animation":"0",
                  "skipOverlapLabels":"1",
                  "legendItemFontSize":"10.5",
                  "enableRotation":"0",
                  "slicingDistance":"2",
                  "manageLabelOverflow":"1",
                  "useEllipsesWhenOverflow":"1",
                  "exportEnabled":"1",
                  "exportAtClient":"0",
                  "exportShowMenuItem":"0",
                  "exportHandler":"http://export.api3.fusioncharts.com/",
                  "exportAction":"download",

            }
            var acquisition_overview_organic_installs_doughnut_style =
		{

				  "paletteColors": "#FF7553,#E74C39,#F06050,#01B0D1,#2CC185,#0ACDC7,#4A8DC0",
			      "bgColor": "#ffffff",
			      "showBorder": "0",
			      "use3DLighting": "0",
			      "showShadow": "0",
			      "enableSmartLabels": "1",
			      "startingAngle": "310",
			      "showLabels": "0",
			      "showPercentValues": "1",
			     // "showValues": "1",
			      "showLegend": "1",
                  "legendNumColumns":"2",
                  "legendPosition":"bottom",
                  "legendBgColor":"ffffff",
                  "legendBorderColor":"ffffff",
                  "legendItemFontColor":"5A5555",
                 // "legendScrollBgColor": "#cccccc",
                 // "legendScrollBarColor": "#999999",
			      "legendShadow": "0",
			      "legendBorderAlpha": "0",
			      "showTooltip": "0",
			      "decimals": "0",
			      "useDataPlotColorForLabels": "1",
			      "pieRadius": "60",
			      "doughnutRadius": "40",
                 // "labelDistance":"-8",
                  "defaultCenterLabel":"Search Keywords",
                 "centerLabel": "$label<br>$displayvalue",
                "centerLabelBold": "1",
                  "baseFontSize": "11",
                  //"baseFontColor": "#cbc9c9",
                  //"labelFontSize": "10",
                  "showPlotBorder":"0",
                  "enablemultislicing": "0",
                  "animation":"0",
                  "isSmartLineSlanted": "1",
                  "showToolTip":"0",
                  "enableRotation": "0",
                  "slicingDistance":"2",
                  "skipOverlapLabels":"1",
                  "legendItemFontSize":"10.5",
                  "exportEnabled":"1",
                  "exportAtClient":"0",
                  "exportShowMenuItem": "0",
                  "exportHandler":"http://export.api3.fusioncharts.com/",
                  "exportAction":"download"
		}
var new_user_device_manu_share=
            {
                "paletteColors": "#FF7553,#E74C39,#F06050,#01B0D1,#2CC185,#0ACDC7,#4A8DC0",
                  "bgColor": "#e6eaed",
                  "showBorder": "0",
                  "use3DLighting": "0",
                  "showShadow": "0",
                  "enableSmartLabels": "1",
                  "startingAngle": "310",
                  "showLabels": "0",
                  "showPercentValues": "1",
                  "showValues": "1",
                  "showLegend": "1",
                  //"legendNumColumns":"2",
                  "legendPosition":"bottom",
                  "legendBgAlpha": 0,
                  "enablemultislicing": "0",
                  //"legendScrollBgColor":"#CCCCCC",
                 // "legendScrollBarColor":"#999999",
                  "legendItemFontColor":"5A5555",
                  "legendShadow":"0",
                  "legendBorderAlpha":"0",
                  "showTooltip": "0",
                  "defaultCenterLabel":"Device Manufacturer",
                  "centerLabel": "$label<br>$displayvalue",
                  "centerLabelBold": "1",
                  "useDataPlotColorForLabels": "1",
                  "pieRadius": "80",
                  "doughnutRadius": "50",
                   //"baseFontSize":"20",
                  "labelDistance":"-8",
                  "labelSepChar":" ",
                  "labelFontItalic":"1",
                  "baseFontSize":"12",
                 // "baseFontColor":"#cbc9c9",
                  "labelFontSize":"10",
                  //"isSmartLineSlanted":"0",
                  "showPlotBorder":"0",
                  "animation":"0",
                  "decimals":"0",
                  "skipOverlapLabels":"1",
                  "legendItemFontSize":"9",
                  "enableRotation":"0",
                  "slicingDistance":"2",
                  "manageLabelOverflow":"1",
                  "useEllipsesWhenOverflow":"1",
                  "exportEnabled":"1",
                  "exportAtClient":"0",
                  "exportShowMenuItem":"0",
                  "exportHandler":"http://export.api3.fusioncharts.com/",
                  "exportAction":"download",
            }

var bar_graph_style =
		{
			        "yaxisname": "Count",
			        "bgcolor": "#FFFFFF",
			        "showalternatehgridcolor": "0",
			        "showvalues": "1",
			        //"labeldisplay": "WRAP",
			        "divlinecolor": "#D6D8DA",
			        //"divlinealpha": "50",
			        "useroundedges": "0",
			        "canvasbgcolor": "#FFFFFF",
			        "canvasbasecolor": "#CCCCCC",
			        "showcanvasbg": "0",
			        "animation": "0",
			        "palettecolors": "#C1BC2B,#ED556E,#A6825E,#2B8EC1,#F8A20F,#32D2C9",
		        	"showborder": "0",
                    "usePlotGradientColor": "0",
                    "showPlotBorder": "0",
                    "showCanvasBorder": "0",
                    "plotFillAlpha": "90"
                }
var dashboard_top_devices_bar_style=
        {
            "yaxisname": "Count",
            "bgcolor": "#FFFFFF",
            "showalternatehgridcolor": "0",
            "showvalues": "1",
            //"labeldisplay": "WRAP",
            "divlinecolor": "#D6D8DA",
            //"divlinealpha": "50",
            "useroundedges": "0",
            "canvasbgcolor": "#FFFFFF",
            "canvasbasecolor": "#CCCCCC",
            "showcanvasbg": "0",
            "animation": "0",
            "palettecolors": "#C1BC2B,#ED556E,#A6825E,#2B8EC1,#F8A20F,#32D2C9",
            "showborder": "0",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "showCanvasBorder": "0",
            "plotFillAlpha": "90",
            "plotSpacePercent":"65",
            "labelFontColor": "#a5a5a5",
            "labelFontBold":"1",
            "showValues":"0"
        }
        var acquisition_installs_bar_graph_style=
        {
            "yaxisname": "USERS",
            "baseFontSize":"11",
            "bgcolor": "#FFFFFF",
            "showalternatehgridcolor": "0",
            "showvalues": "1",
            //"labeldisplay": "WRAP",
            "divlinecolor": "#D6D8DA",
            //"divlinealpha": "50",
            "useroundedges": "0",
            "canvasbgcolor": "#FFFFFF",
            "canvasbasecolor": "#CCCCCC",
            "showcanvasbg": "0",
            "animation": "0",
            "palettecolors": "#ea7600,#4a79d1,#af41c6,#f1563a,#137f12,#af7c07,#00bafc",
            "showborder": "0",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "showCanvasBorder": "0",
            "plotFillAlpha": "90",
            "plotSpacePercent":"50",
            "labelFontColor": "#a5a5a5",
            "labelFontBold":"0",
            "labelFontColor":"5A5555",
            "showValues":"0",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$value</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
           // "canvasPadding":"200",
            //"chartRightMargin":"400"

        }

 var new_user_location_bar_style =
        {
            "yaxisname": "USERS",
            "baseFontSize":"11",
            "bgcolor": "#FFFFFF",
            "showalternatehgridcolor": "0",
            //"labeldisplay": "rotate",
            "useroundedges": "0",
            "canvasbgcolor": "#FFFFFF",
            "canvasbasecolor": "#CCCCCC",
            "showcanvasbg": "0",
            "animation": "0",
            "palettecolors": "#42b49b",
            "showborder": "0",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "showCanvasBorder": "0",
            "plotFillAlpha": "90",
            "divLineColor": "#ffffff",
            "showHDivLines":"0",
            "showValues":"0",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span> $value</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"

        }


var pie_chart_style =
		{

				  "paletteColors": "#FF7553,#E74C39,#F06050,#01B0D1,#2CC185,#0ACDC7,#4A8DC0",
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
                  "legendPosition":"right",
                  "legendScrollBgColor": "#cccccc",
                  "legendScrollBarColor": "#999999",
			      "legendShadow": "0",
			      "legendBorderAlpha": "0",
			      "showTooltip": "0",
			      "decimals": "0",
			      // "captionFontSize": "14",
			      // "subcaptionFontSize": "14",
			      // "subcaptionFontBold": "0",
			      "useDataPlotColorForLabels": "1",
			      "pieRadius": "80",
			      "doughnutRadius": "40",
                  "labelDistance":"-25"
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

                   "showlegend": "0",

			     // "defaultCenterLabel": "Wifi",
			      // "centerLabel": "$label $value%",
			      "centerLabelBold": "1",
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

var bar_graph_multi_Series =
		{
			      "showlabels": "1",
			      "showvalues": "1",
			      "decimals": "0",
			      "placevaluesinside": "1",
			      "rotatevalues": "1",
			      "bgcolor": "#FFFFFF",
			      "legendshadow": "0",
			      "legendborderalpha": "50",
			      "canvasborderthickness": "1",
		          "canvasborderalpha": "50",
	  	          "palettecolors": "#5e7a92,#01b0d1,#ff7553",
			      "showBorder": "0",
                  "showalternatehgridcolor": "0",
                  "showCanvasBorder":"0",
                  "usePlotGradientColor": "0",
                  //"plotFillAlpha": "95",
                  "showPlotBorder": "0",
                  "divlinecolor": "#D6D8DA",
			      "divlinealpha": "50",
                  "showToolTip":"1",
                  "valueFontColor":"ffffff"
		}

var bar_graph_and_line =
		{
		          "bgcolor": "FFFFFF",
		          "plotgradientcolor": "",
		          "showalternatehgridcolor": "0",
		          "showplotborder": "0",
		          "divlinecolor": "CCCCCC",
		          "showvalues": "0",
		          "showcanvasborder": "0",
		          "pyaxisname": "",
		          "syaxisname": "",
		          "sNumberSuffix": " Minutes",
		          //"labeldisplay": "STAGGER",
		          "slantlabels": "1",
		          "canvasborderalpha": "0",
		          "legendshadow": "0",
		          "legendborderalpha": "0",
		          "showborder": "0",

		}

    var test_map_style =
    		{

    				"entityFillHoverColor": "#3467ab",
                    "nullEntityColor":"#d6e3ed",
                    "borderColor":"f3f7fa",
                    "showLegend":"0",
    				"showShadow":"0",
                    "bgColor":"#ff0000",
                    "bgalpha":"0,0",
                    "showlabels":"0",
                    "borderColor":"#ffffff",
                //    "borderThickness":"1.5",
                    "entityToolText":"<div class='tooltipborder'><div class='toottipheader'>$lName</div><div class='tooltipvalue'>Users : $displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",

                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download",
                    "showCanvasBorder": "0",
                 //   "mapTopMargin":"60",

    		}


    var session_map_style =
            {

                    "entityFillHoverColor": "#3467ab",
                    "nullEntityColor":"#d6e3ed",
                    "borderColor":"f3f7fa",
                    "showLegend":"0",
                    "showShadow":"0",
                    "bgColor":"#ff0000",
                    "bgalpha":"0,0",
                    "showlabels":"0",
                    "borderColor":"#ffffff",
                //    "borderThickness":"1.5",
                    "entityToolText":"<div class='tooltipborder'><div class='toottipheader'>$lName</div><div class='tooltipvalue'>Sessions : $displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",

                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download",
                    "showCanvasBorder": "0",
                 //   "mapTopMargin":"60",

            }

var new_user_device_top_share_style =
	{
			    "showValues":"0",
                "paletteColors": "#00C794,#F1F1F1",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "use3DLighting": "0",
                "showShadow": "0",
                "enableSmartLabels": "0",
                "startingAngle": "70",
                "showLabels": "0",
                "showPercentValues": "0",
				//"defaultCenterLabel":"Top Devices",
                "baseFontSize":"13",
                "enableSmartLabels": "0",
              "enablemultislicing": "0",
                "centerLabel": "$label<br>$displayvalue",
                 "enableRotation":"0",
                 "enablemultislicing": "0",
                "centerLabelBold": "0",
                "showTooltip": "0",
                "decimals": "0",
                "pieRadius":"80",
                "doughnutRadius": "70",
                "baseFontSize":"19",
                "baseFontColor": "#4f4f4f",
                "exportEnabled":"1",
                "exportAtClient":"0",
                "exportShowMenuItem": "0",
                "exportHandler":"http://export.api3.fusioncharts.com/",
                "exportAction":"download"

    }

var acquisition_installs_multiline_style =
                {   "yaxisname":"USERS",
                    "baseFontSize":"11",
                    "paletteColors": "#8d9fbe, #70a4e7, #a267bd",
                    "showBorder": "0",
                    "showCanvasBorder": "0",
                    "bgcolor": "#FFFFFF",
                    "lineThickness": "1.5",
                    "showShadow": "0",
                    "showValues": "0",
                    "canvasBorderColor": "#EFEFEF",
                    "canvasBorderThickness": "1.5",
                    "showLegend": "1",
                    "legendBorderColor": "#ffffff",
                    "legendShadow":"0",
                    "divLineColor": "#bfbfbf",
                    "numVDivLines":"6",
                    "divLineThickness": "2",
                    "showPlotBorder": "0",
                    "adjustDiv": "1",

                    "showAnchor": "1",
                    "anchorRadius": "4",
                    "anchorBorderThickness": "2",
                    "anchorHoverRadius":"6",
                    "showAlternateHGridColor": "0",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

                }

var acquisition_installs_device_doughnut_style =
            {

                "paletteColors": "#FF7553,#E74C39,#F06050,#01B0D1,#2CC185,#0ACDC7,#4A8DC0",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "use3DLighting": "0",
                "showShadow": "0",
                "enableSmartLabels": "0",
                //"startingAngle": "310",
                "showLabels": "0",
                "showPercentValues": "1",
                "showValues": "1",
                "showLegend": "1",
                "legendBgColor":"#ffffff",
                "legendBorderColor":"#ffffff",
                "legendShadow":"0",
                "legendItemFontSize":"8",
                "legendNumColumns":"2",
                "legendItemFontColor":"5A5555",
                "showTooltip": "0",
                "decimals": "0",
                "enablemultislicing": "0",
                "useDataPlotColorForLabels": "1",
                "pieRadius": "65",
                "doughnutRadius": "45",
                "labelDistance": "-5",
                "labelSepChar": " ",
                "labelFontItalic": "1",
                "baseFontSize": "9",
                //"baseFontColor": "#cbc9c9",
                "labelFontSize": "8",
               // "defaultCenterLabel": "Install Devices",

                "centerLabel": "$label<br>$displayvalue",
                "centerLabelBold": "1",
                "isSmartLineSlanted": "1",
                "manageLabelOverflow":"1",
                 "useEllipsesWhenOverflow":"1",
                 "enableRotation":"0",
                 "slicingDistance":"5"
            }

var acquisition_installs_Paid_device_multibar_style =
                {   "yaxisname":"USERS",
                    "baseFontSize":"11",
                    "showlabels": "1",
                    "showvalues": "1",
                    "decimals": "0",
                    //"placevaluesinside": "1",
                    "rotatevalues": "1",
                    "bgcolor": "#FFFFFF",
                    "legendshadow": "0",
                    "legendborderalpha": "50",
                    "canvasborderthickness": "1",
                    "canvasborderalpha": "50",
                    "palettecolors": "#5e7a92,#01b0d1,#ff7553, #e0504e",
                    "showBorder": "0",
                    "showalternatehgridcolor": "0",
                    "showCanvasBorder": "0",
                    "usePlotGradientColor": "0",
                    //"plotFillAlpha": "95",
                    "showPlotBorder": "0",
                    "divlinecolor": "#D6D8DA",
                    "divlinealpha": "50",
                    "showToolTip": "1",
                    "valueFontColor":"ffffff",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"
                }
    var acquisition_installs_Organic_device_multibar_style =
                {   "yaxisname":"USERS",
                    "baseFontSize":"11",
                    "showlabels": "1",
                    "showvalues": "1",
                    "decimals": "0",
                    //"placevaluesinside": "1",
                    "rotatevalues": "1",
                    "bgcolor": "#FFFFFF",
                    "legendshadow": "0",
                    "legendborderalpha": "50",
                    "canvasborderthickness": "1",
                    "canvasborderalpha": "50",
                    "palettecolors": "#3f98c6 ,#8896cf, #9d7da4, #e0504e",
                    "showBorder": "0",
                    "showalternatehgridcolor": "0",
                    "showCanvasBorder": "0",
                    "usePlotGradientColor": "0",
                    //"plotFillAlpha": "95",
                    "showPlotBorder": "0",
                    "divlinecolor": "#D6D8DA",
                    "divlinealpha": "50",
                    "showToolTip": "1",
                    "valueFontColor":"ffffff",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"
                }
    var acquisition_uninstalls_Organic_device_multibar_style =
                {
                    "showlabels": "1",
                    "showvalues": "1",
                    "decimals": "0",
                    "placevaluesinside": "1",
                    "rotatevalues": "1",
                    "bgcolor": "#FFFFFF",
                    "legendshadow": "0",
                    "legendborderalpha": "50",
                    "canvasborderthickness": "1",
                    "canvasborderalpha": "50",
                    "palettecolors": "#3f98c6 ,#8896cf, #9d7da4, #e0504e",
                    "showBorder": "0",
                    "showalternatehgridcolor": "0",
                    "showCanvasBorder": "0",
                    "usePlotGradientColor": "0",
                    //"plotFillAlpha": "95",
                    "showPlotBorder": "0",
                    "divlinecolor": "#D6D8DA",
                    "divlinealpha": "50",
                    "showToolTip": "1",
                    "valueFontColor":"ffffff"
                }

var acquisition_uninstalls_multiline_style =
                {
                    "paletteColors": "#8d9fbe, #70a4e7, #a267bd",
                    "showBorder": "0",
                    "showCanvasBorder": "0",
                    "bgcolor": "#FFFFFF",
                    "lineThickness": "1.5",
                    "showShadow": "0",
                    "showValues": "0",
                    "canvasBorderColor": "#EFEFEF",
                    "canvasBorderThickness": "1.5",
                    "showLegend": "1",
                    "legendBorderColor": "#ffffff",
                    "legendShadow":"0",
                    "divLineColor": "#e6e6e6",
                    "divLineThickness": "2",
                    "showPlotBorder": "0",
                    "adjustDiv": "1",
                     "anchorHoverRadius":"6",
                    "showAnchor": "1",
                    "anchorRadius": "4",
                    "anchorBorderThickness": "2",

                    "showAlternateHGridColor": "0"

                }

var acquisition_uninstalls_device_doughnut_style =
            {
                "paletteColors": "#FF7553,#E74C39,#F06050,#01B0D1,#2CC185,#0ACDC7,#4A8DC0",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "use3DLighting": "0",
                "showShadow": "0",
                "enableSmartLabels": "0",
                //"startingAngle": "310",
                "showLabels": "0",
                "showPercentValues": "1",
                "showValues": "1",
                "showLegend": "1",
                "legendBgColor":"#ffffff",
                "legendBorderColor":"#ffffff",
                "legendPosition":"bottom",
                "legendNumColumns":"2",
                "legendShadow":"0",
                "legendItemFontSize":"10",
                "legendItemFontColor":"5A5555",
                "enablemultislicing": "0",
                "showTooltip": "0",
                "decimals": "0",
                "useDataPlotColorForLabels": "1",
                "pieRadius": "70",
                "doughnutRadius": "20",
                "centerLabel": "$label<br>$displayvalue",
                "centerLabelBold": "1",
                //"labelDistance": "-5",
                //"labelSepChar": " ",
                //"labelFontItalic": "1",
                "baseFontSize": "11",
               // "baseFontColor": "#cbc9c9",
                "labelFontSize": "9",
                //"defaultCenterLabel": "Uninstall Devices",
                "isSmartLineSlanted": "1",
                "manageLabelOverflow":"1",
                 "useEllipsesWhenOverflow":"1",
                 "enableRotation":"0",
                 "slicingDistance":"5"
            }

var acquisition_uninstalls_Paid_device_multibar_style =
                {
                    "showlabels": "1",
                    "showvalues": "1",
                    "decimals": "0",
                    "placevaluesinside": "1",
                    "rotatevalues": "1",
                    "bgcolor": "#FFFFFF",
                    "legendshadow": "0",
                    "legendborderalpha": "50",
                    "canvasborderthickness": "1",
                    "canvasborderalpha": "50",
                    "palettecolors": "#5e7a92,#01b0d1,#ff7553",
                    "showBorder": "0",
                    "showalternatehgridcolor": "0",
                    "showCanvasBorder": "0",
                    "usePlotGradientColor": "0",
                    //"plotFillAlpha": "95",
                    "showPlotBorder": "0",
                    "divlinecolor": "#D6D8DA",
                    "divlinealpha": "50",
                    "showToolTip": "1",
                    "valueFontColor":"ffffff"
                }

var oa_network_operator_pie_chart_style =
  {

      "paletteColors": "#FF7553,#E74C39,#F06050,#01B0D1,#2CC185,#0ACDC7,#4A8DC0",
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
      "legendPosition": "bottom",
      "legendItemFontSize":"10",
      "legendScrollBgColor": "#cccccc",
      "legendScrollBarColor": "#999999",
      "legendShadow": "0",
      "legendBorderAlpha": "0",
      "showTooltip": "0",
      "decimals": "0",
      "enablemultislicing": "0",
       "slicingDistance":"5",
      "centerLabel": "$label<br>$displayvalue",
        "centerLabelBold": "1",
      //"defaultCenterLabel": "airtel",
      "labelSepChar": " ",
      //"labelFontItalic": "1",
      "baseFontSize": "12",
      //"baseFontColor": "#cbc9c9",
      "labelFontSize": "1",

      "legendItemFontColor":"#5A5555",
      "useDataPlotColorForLabels": "0",
      "pieRadius": "80",
      "labelFontColor":"#5A5555",
      "doughnutRadius": "50",
      "labelDistance": "-25",
      "exportEnabled":"1",
      "exportAtClient":"0",
      "exportShowMenuItem": "0",
      "exportHandler":"http://export.api3.fusioncharts.com/",
      "exportAction":"download"
  }
  var oa_device_bar_style =
        {
            "yaxisname": "USERS",
            "baseFontSize":"11",
            "bgcolor": "#FFFFFF",
            "showalternatehgridcolor": "0",
            "showvalues": "1",
            //"labeldisplay": "WRAP",
            "divlinecolor": "#D6D8DA",
            //"divlinealpha": "50",
            "useroundedges": "0",
            "canvasbgcolor": "#FFFFFF",
            "canvasbasecolor": "#5A5555",
            "showcanvasbg": "0",
            "animation": "0",
            "palettecolors": "#95cde8,#47a4e9,#ed556e,#a6825e,#f8a20f,#32d2ca, #9d7da4",
            "showborder": "0",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "showCanvasBorder": "0",
            "plotFillAlpha": "90",
            "plotSpacePercent": "50",
            "labelFontColor": "#5A5555",
            "labelFontBold": "0",
            "showValues": "0",
            "showLegend": "1",
            "legendPosition": "right",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$value</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
           // "chartLeftMargin":"100",
           // "chartRightMargin":"100"
        }

var oa_network_operator_bar_style=
        {
            "yaxisname": "USERS",
            "baseFontSize":"11",
            "bgcolor": "#FFFFFF",
            "showalternatehgridcolor": "0",
            "showvalues": "1",
            //"labeldisplay": "WRAP",
            "divlinecolor": "#D6D8DA",
            //"divlinealpha": "50",
            "useroundedges": "0",
            "canvasbgcolor": "#FFFFFF",
            "canvasbasecolor": "#CCCCCC",
            "showcanvasbg": "0",
            "animation": "0",
            "palettecolors": "#C1BC2B,#ED556E,#A6825E,#2B8EC1,#F8A20F,#32D2C9",
            "showborder": "0",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "showCanvasBorder": "0",
            "plotFillAlpha": "90",
            "plotSpacePercent":"65",
            "labelFontColor": "#5A5555",
            "labelFontBold":"0",
            "showValues":"0",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$value</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }

var active_user_line_style=
        {
                   "showAlternateHGridColor":"1",
                    "alternateHGridColor":"#F8F8F8",
                    "paletteColors":"#1199D5",
                    "showBorder":"0",

                    "bgcolor":"#FFFFFF",
                    "lineThickness":"1.5",
                    "showShadow":"0",
                    "showValues":"0",
                    "showCanvasBorder":"1",
                    "canvasBorderColor":"#EFEFEF",
                    "canvasBorderThickness":"1.5",
                    "showLegend":"1",
                    "divLineColor":"#F3F3F3",
                    "showvDivLine":"1",
                    "vDivLineColor":"#F0F0F0",
                    "numVDivLines":"6",
                    "adjustDiv":"1",
                    "anchorRadius":"4",
                    "anchorBorderThickness":"2",
                    "anchorHoverRadius":"6",
                   // "plotFillHoverColor":"#1199D5"

        }

var active_user_device_multiline_style=
        {

                    "paletteColors":"#1199D5, #e74c39,#2cc185",
                    "showBorder":"0",

                    "bgcolor":"#FFFFFF",
                    "lineThickness":"1.5",
                    "showShadow":"0",
                    "showValues":"0",
                    "showCanvasBorder":"0",
                    "showAlternateHGridColor":"0",
                    "showLegend":"1",
                    "divLineColor":"#bfbfbf",
                    "showvDivLine":"0",
                    "divLineThickness":"1.2",
                    "adjustDiv":"1",
                    "anchorRadius":"4",
                    "anchorBorderThickness":"2",
                     "anchorHoverRadius":"6",
                   // "plotFillHoverColor":"#1199D5",
                    "toolTipBgColor": "#FEFEFE",
                    "toolTipColor": "#000000",
                    "legendbgColor": "FEFEFE",
                    "legendBorderColor": "FEFEFE",
                    "legendShadow":"0"
                }

var active_user_device_manu_share=
            {
                  "paletteColors": "#FF7553,#E74C39,#F06050,#01B0D1,#2CC185,#0ACDC7,#4A8DC0",
			      "bgColor": "#ffffff",
			      "showBorder": "0",
			      "use3DLighting": "0",
			      "showShadow": "0",
			      "enableSmartLabels": "1",
			      "startingAngle": "170",
			      "showLabels": "1",
			      "showPercentValues": "1",
			      "showValues": "1",
			      "showLegend": "0",
                  "legendBgAlpha":0,
			      "showTooltip": "0",
			      "decimals": "0",
			      "useDataPlotColorForLabels": "1",
			      "pieRadius": "80",
			      "doughnutRadius": "42",
                  "labelDistance":"-25",
                  "labelSepChar":" ",
                  "labelFontItalic":"1",
                  "baseFontSize":"30",
                  "baseFontColor":"#cbc9c9",
                  "labelFontSize":"13",
                  "defaultCenterLabel":"OA",
                  "isSmartLineSlanted":"0",
                  "enableRotation":"0",
                  "slicingDistance":"5",
                  "manageLabelOverflow":"1",
                  "useEllipsesWhenOverflow":"1"

            }
var active_user_device_top_share_style =
    {
                "showValues":"0",
                "paletteColors": "#00C794,#F1F1F1",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "use3DLighting": "0",
                "showShadow": "0",
                "enableSmartLabels": "0",
                "startingAngle": "70",
                "showLabels": "0",
                "showPercentValues": "0",
                "centerLabel": "$label: $value",
                "centerLabelBold": "0",
                "showTooltip": "0",
                "decimals": "0",
                "pieRadius":"80",
                "doughnutRadius": "70",
                "baseFontSize":"19",
                "baseFontColor": "#4f4f4f"

    }

var active_user_source_multiline_style=
        {
                    "paletteColors":"#065194, #cb6175, #acb6c6,#a66bbe,#32d2c9",
                    "showBorder":"0",
                    "showCanvasBorder":"0",
                    "bgcolor":"#FFFFFF",
                    "lineThickness":"1.5",
                    "showShadow":"0",
                    "showValues":"0",
                    "canvasBorderColor":"#EFEFEF",
                    "canvasBorderThickness":"1.5",
                    "showLegend": "1",
                    "legendbgColor": "FEFEFE",
                    "legendBorderColor": "FEFEFE",
                    "legendShadow":"0",
                    "divLineColor":"#e6e6e6",
                    "divLineThickness":"1.2",
                    "showPlotBorder":"0",
                    "vDivLineColor":"#F0F0F0",
                    "numVDivLines":"6",
                    "adjustDiv": "1",

                    "plotFillColor":"#edf7f9",
                    "showAnchor":"1",
                    "anchorRadius":"4",
                    "anchorBorderThickness":"2",
                     "anchorHoverRadius":"6",
                    //"plotFillHoverColor":"#1199D5",
                    "showAlternateHGridColor":"0",
                    //"labeldisplay": "WRAP",

                    "toolTipBgColor": "#FEFEFE",
                    "toolTipColor": "#000000"
            }

var active_user_location_bar_style =
        {
            "yaxisname": "Count",
            "bgcolor": "#FFFFFF",
            "showalternatehgridcolor": "0",
            //"labeldisplay": "rotate",
            "useroundedges": "0",
            "canvasbgcolor": "#FFFFFF",
            "canvasbasecolor": "#CCCCCC",
            "showcanvasbg": "0",
            "animation": "0",
            "palettecolors": "#42b49b",
            "showborder": "0",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "showCanvasBorder": "0",
            "plotFillAlpha": "90",
            "divLineColor": "#ffffff",
            "showHDivLines":"0",
            "showValues":"0"

        }

 var session_duration_doughnut_style=
            {
                "paletteColors": "#008cc9, 34b3e4, 68c7ec, 9bdaf3, cfedfb, f1f7f9",
                "use3DLighting": "0",
                "usePlotGradientColor": "0",
                //"plotGradientColor": "",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "bgImage": "img6.png",
               // "startAngle":"50",
                "showShadow": "0",
                "enableSmartLabels": "0",
                //"startingAngle": "310",
                "showLabels": "1",
                "showPercentValues": "0",
                "showValues": "1",
                // "showlegend": "1",
                //"legendborder": "0",
                //"legendposition": "bottom",
                "showTooltip": "0",
                "decimals": "0",
                "useDataPlotColorForLabels": "0",
                "pieRadius": "90",
                "doughnutRadius": "70",
                "labelDistance": "0",
                "labelSepChar": ",",
                "labelFontItalic": "0",
                "baseFontSize":"14",
                "defaultCenterLabel":"Duration",
                "baseFontColor": "#444444",
                "labelFontSize": "13",
                "centerLabel":"$label<br>$displayvalue",
                "centerLabelBold":"1",
                "isSmartLineSlanted": "1",
                "enableRotation":"0",
                "enablemultislicing": "0",
                "slicingDistance":"5",
                "manageLabelOverflow": "1",
                "useEllipsesWhenOverflow": "1",
                "exportEnabled":"1",
                "exportAtClient":"0",
                "exportShowMenuItem": "0",
                "exportHandler":"http://export.api3.fusioncharts.com/",
                "exportAction":"download"



            }

    var session_source_doughnut_style =
    {
        "paletteColors": "#FF7553,#E74C39,#F06050,#01B0D1,#2CC185,#0ACDC7,#4A8DC0",
        "use3DLighting": "0",
        "usePlotGradientColor": "0",
        //"plotGradientColor": "",
        "bgColor": "#ffffff",
        "showBorder": "0",
        "bgImage": "public\images\img6.jpg",
        "showShadow": "0",
        "enableSmartLabels": "1",
        "enablemultislicing": "0",
        "startingAngle": "310",
        "showLabels": "0",
        "showPercentValues": "1",
        "showValues": "1",
        "showlegend": "1",
        "useDataPlotColorForLabels": "1",
        "legendbgColor":"#ffffff",
        "legendShadow":"0",
        "legendBorderAlpha":"0",
        "legendposition": "bottom",
        "legendItemFontSize":"10",
       // "legendiconscale":"1",
        "showTooltip": "0",
        "decimals": "0",
        "legendNumColumns":"2",
        "pieRadius": "90",
        "doughnutRadius": "70",
        "labelDistance": "-5",
        "labelSepChar": ",",
        "labelFontItalic": "0",
        "baseFontSize": "14",
        "baseFontColor": "#444444",
        "labelFontSize": "13",
       // "labelFontColor": "6b6b6b",
        "centerLabel":"$label<br>$displayvalue",
        "centerLabelBold":"1",
        "defaultCenterLabel": "Source",
        "isSmartLineSlanted": "1",
        "enableRotation":"0",
        "slicingDistance":"5",
        "manageLabelOverflow": "1",
        "useEllipsesWhenOverflow": "auto",
        "exportEnabled":"1",
        "exportAtClient":"0",
        "exportShowMenuItem": "0",
        "exportHandler":"http://export.api3.fusioncharts.com/",
        "exportAction":"download"

    }
var session_line_style=
    {            "yaxisname":"SESSIONS",
                "baseFontSize":"11",
                "paletteColors":"#1199D5",
                "showBorder":"0",
                "showCanvasBorder":"0",
                "bgcolor":"#FFFFFF",
                "lineThickness":"1.5",
                "showShadow":"0",
                "showValues":"0",
                "canvasBorderColor":"#EFEFEF",
                "canvasBorderThickness":"1.5",
                "showLegend":"1",
                "numVDivLines":"6",
                "divLineColor": "#bfbfbf",
                "showPlotBorder":"0",
               //"divLineDashed":"1",
                "plotFillColor":"#edf7f9",
                "showAnchor":"1",
                "anchorRadius":"4",
                "anchorBorderThickness":"2",
                 "anchorHoverRadius":"6",
                //"plotFillHoverColor":"#1199D5",
                "showAlternateHGridColor":"0",

                "toolTipBgColor": "#FEFEFE",
                "toolTipColor": "#000000",
                "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Sessions:</span>$displayvalue</div></div>",
                "toolTipBgAlpha":"0",
                "showToolToipShadow":"0",
                "toolTipBorderThickness": "0",
                "exportEnabled":"1",
                "exportAtClient":"0",
                "exportShowMenuItem": "0",
                "exportHandler":"http://export.api3.fusioncharts.com/",
                "exportAction":"download"

    }

var session_source_bar_style =
        {
            "yaxisname": "SESSIONS",
              //"yaxisnamewidth":"10",
            "baseFontSize":"11",
            "bgcolor": "#FFFFFF",
            "showalternatehgridcolor": "0",
            "showvalues": "1",
            //"labeldisplay": "WRAP",
            "divlinecolor": "#bfbfbf",

            //"divlinealpha": "50",
            "useroundedges": "0",
            "canvasbgcolor": "#FFFFFF",
            "canvasbasecolor": "#CCCCCC",
            "showcanvasbg": "0",
            "animation": "0",
            "palettecolors": "#95cde8,#47a4e9,#ed556e,#a6825e,#f8a20f,#32d2ca, #9d7da4",
            "showborder": "0",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "showCanvasBorder": "0",
            "plotFillAlpha": "90",
            "plotSpacePercent": "50",
            "labelFontColor": "#5A5555",
            "labelFontBold": "0",
            "showValues": "0",
            "showLegend": "1",
            "legendPosition": "right",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Sessions:</span> $value</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }

var trends_overview_newusers_trend_line_style=
        {           "yaxisname":"USERS",
                    "baseFontSize":"11",
                    "paletteColors":"#1199D5",
                    "showBorder":"0",
                    "showCanvasBorder":"0",
                    "bgcolor":"#FFFFFF",
                    "lineThickness":"1.5",
                    "showShadow":"0",
                    "showValues":"0",
                    "canvasBorderColor":"#EFEFEF",
                    "canvasBorderThickness":"1.5",
                    "showLegend":"1",
                    "numVDivLines":"6",
                    "divLineColor": "#bfbfbf",
                    "showPlotBorder":"0",
                    //"divLineDashed":"1",
                    "plotFillColor":"#edf7f9",
                    "showAnchor":"1",
                    "anchorRadius":"4",
                    "anchorBorderThickness":"2",
                     "anchorHoverRadius":"6",
                    //"plotFillHoverColor":"#1199D5",
                    "showAlternateHGridColor":"0",

                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                   // "toolTipBorderRadius": "5",
                   // "toolTipBorderColor":"#ffffff",
                   // "showToolTipShadow":"100",
                   // "toolTipBgAlpha":"50",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

        }

var trends_overview_activeusers_trend_multiline_style =
        {    "yaxisname":"USERS",
        "baseFontSize":"11",
            "paletteColors": "#32d4c9",
            "showBorder": "0",
            "bgcolor": "#FFFFFF",
            "lineThickness": "1.5",
            "showShadow": "0",
            "showValues": "0",
            "showCanvasBorder": "0",
            "showAlternateHGridColor": "0",
            "showLegend": "1",
            "divLineColor": "#bfbfbf",
             "divLineThickness": "1.2",
             "numVDivLines":"6",
            "adjustDiv": "1",
            "anchorRadius": "4",
            "anchorBorderThickness": "2",
             "anchorHoverRadius":"6",
            //"plotFillHoverColor": "#32d4c9",
             "showvDivLine":"1",
            //"vDivLineColor": "#bfbfbf",
            //"numVDivLines":"6",
            "showLegend":"1",
            "legendBgColor": "#ffffff",
            "legendBorderColor": "#ffffff",
            "legendShadow":"0",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            //"labeldisplay": "WRAP",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }

var trends_overview_session_time_line_style =
                {   "yaxisname":"AVERAGE TIME (MINUTES)",
                    "baseFontSize":"11",
                    "paletteColors": "#b78bce",
                    "showAlternateHGridColor": "0",
                    "alternateHGridColor": "#F8F8F8",
                    "showBorder": "0",
                    "showCanvasBorder": "0",
                    "bgcolor": "#FFFFFF",
                    "lineThickness": "1.5",
                    "showShadow": "0",
                    "showValues": "0",
                    "canvasBorderColor": "#EFEFEF",
                    "canvasBorderThickness": "1.5",
                    "showLegend": "1",
                    "numVDivLines":"6",
                    "divLineColor": "#bfbfbf",
                    "showPlotBorder": "0",
                    //"divLineDashed": "1",
                    "plotFillColor": "#b7bfce",
                    "showAnchor": "1",
                    "anchorRadius": "4",
                    "anchorBorderThickness": "2",
                    "anchorHoverRadius":"6",
                   // "plotFillHoverColor": "#b78bce",

                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Average Time:</span>$displayValue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    //"labelDisplay":"WRAP",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

                }

    var acquisition_source_uninstalls_bar_style=
        {
           // "yaxisname": "Count",
            "bgcolor": "#FFFFFF",
            "showalternatehgridcolor": "0",
            "showValues": "1",
            //"labeldisplay": "WRAP",
            "numDivLines":"0",
            "divlinecolor": "#ffffff",
            //"divlinealpha": "50",
            "useroundedges": "0",
            "canvasbgcolor": "#FFFFFF",
            "canvasbasecolor": "#CCCCCC",
            "showcanvasbg": "0",
            "animation": "0",
            "palettecolors": "#f8a20f,#c6c13f,#ae8d6c,#4098c6,#0acdc7",
            "showborder": "0",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "showCanvasBorder": "0",
            "plotFillAlpha": "90",
            "plotSpacePercent":"55",
            "labelFontColor": "#a5a5a5",
            "labelFontBold":"1",
            "valueFontColor":"585858",
            "placevaluesInside":"0"
        }

var sessions_device_multibar_style =
                {
                    "showlabels": "1",
                    "showvalues": "1",
                    "decimals": "0",
                    "placevaluesinside": "1",
                    "rotatevalues": "1",
                    "bgcolor": "#FFFFFF",
                    "legendshadow": "0",
                    "legendborderalpha": "50",
                    "canvasborderthickness": "1",
                    "canvasborderalpha": "50",
                    "palettecolors": "#3f98c6 ,#8896cf, #9d7da4, #e0504e",
                    "showBorder": "0",
                    "showalternatehgridcolor": "0",
                    "showCanvasBorder": "0",
                    "usePlotGradientColor": "0",
                    //"plotFillAlpha": "95",
                    "showPlotBorder": "0",
                    "divlinecolor": "#D6D8DA",
                    "divlinealpha": "50",
                    "showToolTip": "1",
                    "valueFontColor":"ffffff",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'>Users : $displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                }


    var revenue_TotalVsOrganicvsInorganic_multiline_style =
        {
            "yaxisname": "REVENUE",
            "paletteColors": "#f9b33a, #8bb873, #009ece",
            "showBorder": "0",
            "bgcolor": "#FFFFFF",
            "lineThickness": "3",
            "showShadow": "0",
            "showValues": "0",
            "showCanvasBorder": "0",
            "showAlternateHGridColor": "0",
            "showLegend": "1",
            "divLineColor": "#bfbfbf",
            "showvDivLine": "0",
            "divLineThickness": "1.2",
            "adjustDiv": "1",
            "showLegend": "1",
            "legendBgColor": "#ffffff",
            "legendBorderColor": "#ffffff",
            "legendShadow": "0",
           "anchorRadius": "4",
            "anchorBorderThickness": "2",
             "anchorHoverRadius":"6",
            //"labeldisplay": "WRAP",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Revenue:</span> &#8377 $displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }

        var CampaignReportClickVSInstall_multiline_style =
        {
            "yaxisname": "USERS",
            "paletteColors": "#f9b33a, #8bb873, #009ece",
            "showBorder": "0",
            "bgcolor": "#FFFFFF",
            "lineThickness": "3",
            "showShadow": "0",
            "showValues": "0",
            "showCanvasBorder": "0",
            "showAlternateHGridColor": "0",
            "showLegend": "1",
            "divLineColor": "#bfbfbf",
            "showvDivLine": "0",
            "divLineThickness": "1.2",
            "adjustDiv": "1",
            "showLegend": "1",
            "legendBgColor": "#ffffff",
            "legendBorderColor": "#ffffff",
            "legendShadow": "0",
           "anchorRadius": "4",
            "anchorBorderThickness": "2",
             "anchorHoverRadius":"6",
            //"labeldisplay": "WRAP",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }

        var revenue_OneVsTwoVsThreeRepeatedUser_stackedbar_style =
        {
            "yaxisname": "REVENUE",
            "showvalues": "0",
            "plotgradientcolor": "",
            "formatnumberscale": "0",
            "showplotborder": "0",
            "palettecolors": "#3f98c6,#597a9b,#8bb873",
            "canvaspadding": "0",
            "bgcolor": "FFFFFF",
            "showalternatehgridcolor": "0",
            "divlinecolor": "CCCCCC",
            "showcanvasborder": "0",
            "legendborderalpha": "0",
            "legendshadow": "0",
            "interactivelegend": "0",
            "showpercentvalues": "1",
            "showsum": "1",
            "canvasborderalpha": "0",
            "showborder": "0",
            "showlabels":"1",
            //"labeldisplay": "WRAP",
            "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Revenue:</span> &#8377 $displayvalue</div></div>",
            "toolTipBgAlpha":"0",
            "showToolTipShadow":"0",
            "toolTipBorderThickness": "0",
            "exportEnabled":"1",
            "exportAtClient":"0",
            "exportShowMenuItem": "0",
            "exportHandler":"http://export.api3.fusioncharts.com/",
            "exportAction":"download"
        }

        var revenue_source_multiline_style =
                {
                    "yaxisname": "REVENUE",
                    "paletteColors": "#f9b33a, #8bb873, #009ece",
                    "showBorder": "0",
                    "showCanvasBorder": "0",
                    "bgcolor": "#FFFFFF",
                    "lineThickness": "1.5",
                    "showShadow": "0",
                    "showValues": "0",
                    "canvasBorderColor": "#EFEFEF",
                    "canvasBorderThickness": "1.5",
                    "showLegend": "1",
                    "legendBorderColor": "#ffffff",
                    "legendShadow":"0",
                    "divLineColor": "#e6e6e6",
                    "divLineThickness": "2",
                    "showPlotBorder": "0",
                    "adjustDiv": "1",

                    "showAnchor": "1",
                    "anchorRadius": "4",
                    "anchorBorderThickness": "2",
                    "anchorHoverRadius":"6",
                    "showAlternateHGridColor": "0",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Revenue:</span> &#8377 $displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

                }

                 var revenue_location_multiline_style =
                {
                    "yaxisname": "REVENUE",
                    "paletteColors": "#f9b33a, #8bb873, #009ece, #ae8d6d, #32d2c9",
                    "showBorder": "0",
                    "showCanvasBorder": "0",
                    "bgcolor": "#FFFFFF",
                    "lineThickness": "1.5",
                    "showShadow": "0",
                    "showValues": "0",
                    "canvasBorderColor": "#EFEFEF",
                    "canvasBorderThickness": "1.5",
                    "showLegend": "1",
                    "legendBorderColor": "#ffffff",
                    "legendShadow":"0",
                    "divLineColor": "#e6e6e6",
                    "divLineThickness": "2",
                    "showPlotBorder": "0",
                    "adjustDiv": "1",

                    "showAnchor": "1",
                    "anchorRadius": "4",
                    "anchorBorderThickness": "2",
                    "anchorHoverRadius":"6",
                    "showAlternateHGridColor": "0",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Revenue:</span> &#8377 $displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

                }

                var push_report_funnel_style =
                {
                    "paletteColors": "#216dce, #d64033,#ceba39,#299639,#c67521",
                "bgColor": "#ffffff",
                "decimals": "1",
                "showBorder": "0",
                "isHollow": "1",
                "labelDistance": "15",
                "is2D": "0",
                "isSliced": "1",
                "animation":"0",
                "baseFontSize":"12",
                "funnelYScale": "5",
                "slicingDistance":"5",
                //"percentOfPrevious":"1",
                //"streamlinedData":"1",
                "plotTooltext": "Success : $percentOfPrevValue",
                "showPercentValues": "1",
                    "useSameSlantAngle" : "1",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

                }

                var event_line_style=
        {           "yaxisname":"EVENTS",
                    "baseFontSize":"11",
                    "showAlternateHGridColor":"0",
                    "alternateHGridColor":"#F8F8F8",
                    "paletteColors":"#1199D5",
                    "showBorder":"0",
                    "bgcolor":"#FFFFFF",
                    "lineThickness":"1.5",
                    "showShadow":"0",
                    "showValues":"0",
                     "tickWidth": "10",
                    "showCanvasBorder":"1",
                    "canvasBorderColor":"#EFEFEF",
                    "canvasBorderThickness":"1.5",
                    "showLegend":"1",
                    "divLineColor":"#bfbfbf",


                    "numVDivLines":"6",
                    //"adjustDiv":"1",
                    "anchorRadius":"4",
                    "anchorBorderThickness":"2",
                    //"anchorAlpha":"0",
                    //"anchorHoverRadius":"4",
                    //"plotgradientcolor":"#5A5555",
                    //"plotFillAlpha":"1",
                     "anchorHoverRadius":"6",
                   // "plotFillHoverColor":"#1199D5",
                    "plotFillAlpha":"1",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Events:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"

        }

var campaign_report_comparison_multibar_style =
                {   "yaxisname":"USERS",
                    "baseFontSize":"11",
                    "showlabels": "1",
                    "showvalues": "1",
                    "decimals": "0",
                    //"placevaluesinside": "1",
                    "rotatevalues": "1",
                    "bgcolor": "#FFFFFF",
                    "legendshadow": "0",
                    "legendborderalpha": "50",
                    "canvasborderthickness": "1",
                    "canvasborderalpha": "50",
                    "palettecolors": "#00A3EF,#00D5C3,#FE465A,#FF9E00,#8896cf",
                    "showBorder": "0",
                    "showalternatehgridcolor": "0",
                    "showCanvasBorder": "0",
                    "usePlotGradientColor": "0",
                    //"plotFillAlpha": "95",
                    "showPlotBorder": "0",
                    "divlinecolor": "#D6D8DA",
                    "divlinealpha": "50",
                    "showToolTip": "1",
                    "valueFontColor":"ffffff",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$displayvalue</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$value</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"
                }

var campaign_report_multibar_style =
                {   "yaxisname":"USERS",
                    "baseFontSize":"11",
                    "showlabels": "1",
                    "showvalues": "1",
                    "decimals": "0",
                    //"placevaluesinside": "1",
                    "rotatevalues": "1",
                    "bgcolor": "#FFFFFF",
                    "legendshadow": "0",
                    "legendborderalpha": "50",
                    "canvasborderthickness": "1",
                    "canvasborderalpha": "50",
                    "palettecolors": "#00A3EF,#00D5C3,#FE465A,#FF9E00,#8896cf",
                    "showBorder": "0",
                    "showalternatehgridcolor": "0",
                    "showCanvasBorder": "0",
                    "usePlotGradientColor": "0",
                    //"plotFillAlpha": "95",
                    "showPlotBorder": "0",
                    "divlinecolor": "#D6D8DA",
                    "divlinealpha": "50",
                    "showToolTip": "1",
                    "valueFontColor":"ffffff",
                    "plottooltext":"<div class='tooltipborder'><div class='toottipheader'>$label</div><div class='tooltipvalue'><span class='tooltip-subheader'>Users:</span>$displayvalue</div></div>",
                    "toolTipBgAlpha":"0",
                    "showToolTipShadow":"0",
                    "toolTipBorderThickness": "0",
                    "exportEnabled":"1",
                    "exportAtClient":"0",
                    "exportShowMenuItem": "0",
                    "exportHandler":"http://export.api3.fusioncharts.com/",
                    "exportAction":"download"
                }


function multiLine(json,num,style)
{
	var limit = 10;
	var gap = 1;
	var chart =
	{
	    "chart": style
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
	    	data_point = { "value" : json[j].a[i].y , "displayvalue":CommaSeparatedNumberFormat(json[j].a[i].y)};
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
/* Example for sample json
	[ { "z" : "set1",
		"a" : [ {"x" : Nov 3, "y" : 20},{"x" : Nov 4, "y" : 30},{"x" : Nov 5, "y" : 40}]}]
*/
function multiLine2(json,style)
{
	var chart =
	{
		"chart" : style
	}

	var len = json[0].a.length;
	var num = json.length;


	chart["categories"] = [];

	var category = [];

	for(i=0 ; i < len;i++)
    {
    	category_label = { "label" : json[0].a[i].x};
    	category = category.concat(category_label);
    }

	chart["categories"] = chart["categories"].concat({"category":category});

	chart["dataset"] = [];

	for(i=0 ; i < num ;i++)
	{
		series = { "seriesname" : json[i].z };

		data = [];
	    for(j=0;j<len; j++)
	    {
	    	data_point = { "value" : parseInt(json[i].a[j].y) ,"displayvalue":CommaSeparatedNumberFormat(parseInt(json[i].a[j].y))};
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

function multiLineCampaignReport(json,style)
{
    var chart =
    {
        "chart" : style
    }

    var len = json[0].a.length;
    var num = json.length;


    chart["categories"] = [];

    var category = [];

    for(i=0 ; i < len;i++)
    {
        category_label = { "label" : json[0].a[i].x};
        category = category.concat(category_label);
    }

    chart["categories"] = chart["categories"].concat({"category":category});

    chart["dataset"] = [];

    for(i=0 ; i < num ;i++)
    {
        series = { "seriesname" : json[i].z };

        data = [];
        for(j=0;j<len; j++)
        {
            data_point = { "value" : parseInt(json[i].a[j].y) ,"displayvalue":json[i].goalname};
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

function line(line_json,style)
{
	var limit = 10;
    var len = line_json.length;
    if(len > limit)
        chart_style["labelStep"] = Math.ceil(len/limit).toString();

    var chart =
    {
        "chart" : style
    }

    chart["data"] = [];
    var data_point;

    for(i=0;i<len;i++) {
        data_point = {"label" : line_json[i].x , "value":line_json[i].y,"displayvalue":CommaSeparatedNumberFormat(line_json[i].y)}
        chart["data"] = chart["data"].concat(data_point);
    }

    return chart;
}

function line_session_length(line_json,style)
{
    var limit = 10;
    var len = line_json.length;
    if(len > limit)
        chart_style["labelStep"] = Math.ceil(len/limit).toString();

    var chart =
    {
        "chart" : style
    }

    chart["data"] = [];
    var data_point;
    var dv;
    for(i=0;i<len;i++) {
        data_point = {"label" : line_json[i].x , "value":line_json[i].y, "displayValue":Math.floor(line_json[i].y)+":"+Math.round((line_json[i].y*60)%60)+" min"}
        chart["data"] = chart["data"].concat(data_point);
    }

    return chart;
}

function bargraph(bar_json,style) {

	var len = bar_json.length;

	var chart =
    {
        "chart": style
    }


    chart["data"] = [];
    var data_point;

    for(i=0;i<len;i++) {
        data_point = {"label" : bar_json[i].x , "value":bar_json[i].y ,"displayvalue":bar_json[i].x+', '+CommaSeparatedNumberFormat(bar_json[i].y)}
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
        data_point = {"label" : pie_json[i].screenName.split(".")[length-1] , "value" : parseFloat(pie_json[i].avgTime) / 60000 ,"displayvalue":CommaSeparatedNumberFormatparseFloat(parseFloat(pie_json[i].avgTime) / 60000) }
        chart["data"] = chart["data"].concat(data_point);
    }

    return chart;

}

function piechart_op(pie_json,style) {

	var len = pie_json.length;

	var chart =
    {
       "chart" :style



    }


    chart["data"] = [];
    var data_point;

    for(i=0;i<len;i++) {
    	if (pie_json[i].x != "") {
	        data_point = {"label" : pie_json[i].x , "value" : pie_json[i].y ,"displayvalue":CommaSeparatedNumberFormat(pie_json[i].y)}
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
        data_point = {"label" : pie_json[i].x , "value" : pie_json[i].y ,"displayvalue":CommaSeparatedNumberFormat(pie_json[i].y)}
        chart["data"] = chart["data"].concat(data_point);
    }

    return chart;

}

function bargraph_multi(json,num,style){
	var len = json.length;

	var chart =
    {
        "chart" : style
    }

    chart["categories"] = [];

	var category = [];

	for(i=0 ; i < len;i++)
    {
    	category_label = { "label" : json[i].z};
    	category = category.concat(category_label);
    }

	chart["categories"] = chart["categories"].concat({"category":category});

	chart["dataset"] = [];

	var serial = ["st","nd","rd"];
	for(i=0 ; i < num ;i++)
	{
		series = { "seriesname" : i+1+serial[i] };

		data = [];
	    for(j=0;j<len; j++)
	    {
	    	if(json[j].a[i])
	    	{
	    		data_point = { "value" : json[j].a[i].y ,"displayvalue":CommaSeparatedNumberFormat(json[j].a[i].y)};
	    	}
	    	else
	    	{
	    		data_point = { "value" : 0 };
	    	}
	    	data = data.concat(data_point);
	    }
	    series["data"] = data ;
	    chart["dataset"] = chart["dataset"].concat(series);
	}

	return chart;
}

function bargraph_line(json){

	var len = json.length;

	var chart =
    {
        "chart" : bar_graph_and_line
    }

    chart["categories"] = [];

	var category = [];

	for(i=0 ; i < len;i++)
    {
    	category_label = { "label" : json[i].x};
    	category = category.concat(category_label);
    }

	chart["categories"] = chart["categories"].concat({"category":category});

	chart["dataset"] = [];

	data = [];
	series = { "seriesname" : "Number of sessions" };
	for(i=0 ; i < len ;i++)
	{
	    data = data.concat({ "value" : json[i].y ,"displayvalue":CommaSeparatedNumberFormat(json[i].y)});
	}
	series["data"] = data ;
	chart["dataset"] = chart["dataset"].concat(series);

	data = [];
	series1 = { "seriesname" : "Average session length" };
	for(i=0 ; i < len ;i++)
	{
	    data = data.concat({ "value" : json[i].z ,"displayvalue":CommaSeparatedNumberFormat(json[i].z)});
	}
	series1["data"] = data ;
	series1["parentyaxis"] = "S";
	series1["renderas"] = "Line";
	chart["dataset"] = chart["dataset"].concat(series1);

	return chart;
}

function map(data, avgValue, maxValue,style){

	var chart =
	{
		"chart" : style
	}

	chart["colorrange"] =
		{
			"minvalue": "0",
			"startlabel": "Low",
			"endlabel": "High",
			"code": "#d8e5ef",
			"gradient": "1",
			"color": [
			 {
			    "maxvalue": avgValue.toFixed(2),
			    "displayvalue": "Average",
			    "code": "#bcc6c7"
			 },
			 {
			    "maxvalue": maxValue,
			    "code": "#22c6ef"
			 }
			]
		}

	chart["data"] = [];
    var data_point;

    for(i=0;data!=null && i<data.length;i++) {
        data_point = {"id" : data[i].x , "value" : data[i].y, "displayvalue":CommaSeparatedNumberFormat(data[i].y)}
        chart["data"] = chart["data"].concat(data_point);
    }
	return chart;
}

function piechart_singlediv(json,style){
	var len = json.length;

	var chart =
    {
        "chart": style
    }


    chart["data"] = [];
    var data_point;
     var max_index = 0;
      var max_value = 0;
        for(i=0;i<len;i++) {
            if (max_value< json[i].y) {
                if (json[i].x!="Others") {
                     max_index=i;
                     max_value=json[i].y;
                };
            };
        }

        for(i=0;i<len;i++) {
            data_point = {"label" : json[i].x , "value" : json[i].y ,"displayvalue":CommaSeparatedNumberFormat(json[i].y) }
            if (max_index==i) {data_point.isSliced=true};
            chart["data"] = chart["data"].concat(data_point);
        }
     chart.chart.defaultCenterLabel = (json[max_index].x || '') +"<br>"+ (CommaSeparatedNumberFormat(json[max_index].y) || '');


    return chart;
}

CommaSeparatedNumberFormat = function(labelValue) {
        if (labelValue==undefined) {return 0};
        if (isNaN(labelValue)) {return 0};
        if (isNaN(Number(labelValue))) {return 0};
        // uncomment this line line to get comma separation after 3 digits.
    //  return labelValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        labelValue=Number(labelValue)
        x=labelValue.toFixed(0);
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
        lastThree = ',' + lastThree;
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    };
