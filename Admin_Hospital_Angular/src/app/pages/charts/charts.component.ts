import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  private chart: am4charts.XYChart;


  constructor(@Inject(PLATFORM_ID) private platformId) { }

  ngOnInit(): void {

    this.barChart();
    this.pieChart();




  }

  pieChart() {
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    chart.data = [{
      "country": "Lithuania",
      "litres": 501.9
    }, {
      "country": "Czech Republic",
      "litres": 301.9
    }, {
      "country": "Ireland",
      "litres": 201.1
    }, {
      "country": "Germany",
      "litres": 165.8
    }, {
      "country": "Australia",
      "litres": 139.9
    }, {
      "country": "Austria",
      "litres": 128.3
    }, {
      "country": "UK",
      "litres": 99
    }, {
      "country": "Belgium",
      "litres": 60
    }, {
      "country": "The Netherlands",
      "litres": 50
    }];

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(40);

    // Disable ticks and labels
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    // Disable tooltips
    pieSeries.slices.template.tooltipText = "";

    // Add a legend
    chart.legend = new am4charts.Legend();
  }

  // barChart() {
  //   // Create chart instance
  //   var chart = am4core.create("bardiv", am4charts.XYChart);

  //   // Add data
  //   chart.data = [{
  //     "country": "Lithuania",
  //     "litres": 501.9,
  //     "units": 250
  //   }, {
  //     "country": "Czech Republic",
  //     "litres": 301.9,
  //     "units": 222
  //   }, {
  //     "country": "Ireland",
  //     "litres": 201.1,
  //     "units": 170
  //   }, {
  //     "country": "Germany",
  //     "litres": 165.8,
  //     "units": 122
  //   }, {
  //     "country": "Australia",
  //     "litres": 139.9,
  //     "units": 99
  //   }, {
  //     "country": "Austria",
  //     "litres": 128.3,
  //     "units": 85
  //   }, {
  //     "country": "UK",
  //     "litres": 99,
  //     "units": 93
  //   }, {
  //     "country": "Belgium",
  //     "litres": 60,
  //     "units": 50
  //   }, {
  //     "country": "The Netherlands",
  //     "litres": 50,
  //     "units": 42
  //   }];

  //   // Create axes
  //   let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  //   categoryAxis.dataFields.category = "country";
  //   categoryAxis.title.text = "Countries";

  //   let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  //   valueAxis.title.text = "Litres sold (M)";

  //   // Create series
  //   var series = chart.series.push(new am4charts.ColumnSeries());
  //   series.dataFields.valueY = "litres";
  //   series.dataFields.categoryX = "country";
  //   series.name = "Sales";
  //   series.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
  //   series.columns.template.fill = am4core.color("#104547");

  //   var series2 = chart.series.push(new am4charts.LineSeries());
  //   series2.name = "Units";
  //   series2.stroke = am4core.color("#CDA2AB");
  //   series2.strokeWidth = 3;
  //   series2.dataFields.valueY = "units";
  //   series2.dataFields.categoryX = "country";
  // }

  barChart() {
    let root = am5.Root.new("bardiv");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });

    xRenderer.grid.template.setAll({
      location: 1
    })

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "country",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1
      })
    }));


    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "country",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });


    // Set data
    let data = [{
      country: "USA",
      value: 2025
    }, {
      country: "China",
      value: 1882
    }, {
      country: "Japan",
      value: 1809
    }, {
      country: "Germany",
      value: 1322
    }, {
      country: "UK",
      value: 1122
    }, {
      country: "France",
      value: 1114
    }, {
      country: "India",
      value: 984
    }, {
      country: "Spain",
      value: 711
    }, {
      country: "Netherlands",
      value: 665
    }, {
      country: "South Korea",
      value: 443
    }, {
      country: "Canada",
      value: 441
    }];

    xAxis.data.setAll(data);
    series.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }


  ngOnDestroy() {
    am4core.disposeAllCharts();
  }




}
