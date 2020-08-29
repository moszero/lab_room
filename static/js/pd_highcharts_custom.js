var option_keep ={
    bar:{chart:{type: 'column'},tooltip:{
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        }},
    line:{chart:{zoomType: 'xy'},tooltip:{
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> (finished{point.prop}%)<br/>',
            valueDecimals: 0,
            split: true,
            valueSuffix: ' number'
        },plotOptions: {}},
        // &nbsp is space (non-breaking space)
    horizontal_bar:{chart:{type: 'bar'},tooltip:{
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm &nbsp&nbsp</b></td>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },plotOptions: {}},
    area:{chart:{zoomType: 'x',type: 'area'},tooltip: {
        pointFormat: '{series.name} y : <b>{point.y:,.0f}</b><br/>x : {point.x}'
    },plotOptions: {
        area: {
            pointStart: 1940,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    }},
    zoom_x:{chart:{zoomType: 'x'},tooltip: {
        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    },plotOptions: {}
    },
    line_with_label:{plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
            }
        }
    },
    stack_column:{chart:{zoomType: 'x',type: 'column'},tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
            }
        }
    },
    scatter:{chart:{type: 'scatter',zoomType: 'xy'},tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} cm, {point.y} kg'
            },plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            }
            }
        }
    },
    pie:{chart:{
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        }
    }
};



function change_type(selection){
    var chart=chartOptions.chart;
    var tooltip=chartOptions.tooltip;
    var plotOptions=chartOptions.plotOptions;
    if (selection == "") {
  } else if (selection == "bar") {
      chart = option_keep.bar.chart;
      tooltip = option_keep.bar.tooltip;
      plotOptions = option_keep.bar.plotOptions;
  } else if (selection == "line") {
      chart = option_keep.line.chart;
      tooltip = option_keep.line.tooltip;
      plotOptions = option_keep.line.plotOptions;
  } else if (selection == "horizontal_bar") {
      chart = option_keep.horizontal_bar.chart;
      tooltip = option_keep.horizontal_bar.tooltip;
      plotOptions = option_keep.horizontal_bar.plotOptions;
  } else if (selection == "area") {
      chart = option_keep.area.chart;
      tooltip = option_keep.area.tooltip;
      plotOptions = option_keep.area.plotOptions;
  } else if (selection == "zoom_x") {
      chart = option_keep.zoom_x.chart;
      tooltip = option_keep.area.tooltip;
      plotOptions = option_keep.area.plotOptions;
  } else if (selection == "line_with_label") {
      chart = option_keep.line.chart;
      tooltip = option_keep.line.tooltip;
      plotOptions = option_keep.line_with_label.plotOptions;
  } else if (selection == "stack_column") {
      chart = option_keep.stack_column.chart;
      tooltip = option_keep.stack_column.tooltip;
      plotOptions = option_keep.stack_column.plotOptions;
  } else if (selection == "scatter") {
      chart = option_keep.scatter.chart;
      tooltip = option_keep.scatter.tooltip;
      plotOptions = option_keep.scatter.plotOptions;
  } else if (selection == "pie") {
      chart = option_keep.pie.chart;
      tooltip = option_keep.pie.tooltip;
      plotOptions = option_keep.pie.plotOptions;
  }

chartOptions.chart = chart;
chartOptions.tooltip = tooltip;
chartOptions.plotOptions = plotOptions;
Highcharts.chart('main_container', chartOptions);
};
