import { Component, Input, OnInit } from '@angular/core';
// import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
})
export class ChartCardComponent implements OnInit {
  @Input({ required: true }) chartData: any;

  Highcharts: typeof Highcharts = Highcharts;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'areaspline',
        // height: 80,
        margin: [2, 2, 2, 2],
        style: {
          overflow: 'visible',
        },
        backgroundColor: 'transparent',
      },
      title: {
        text: '',
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
        startOnTick: false,
        endOnTick: false,
      },
      tooltip: {
        outside: true,
      },
      plotOptions: {
        series: {
          animation: false,
          lineWidth: 1,
          shadow: false,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          marker: {
            radius: 1,
            states: {
              hover: {
                radius: 2,
              },
            },
          },
          opacity: 1.0,
        },
        areaspline: {
          color: '#FF6961',
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#FF6961'],
              [1, '#FF696100'],
            ],
          },
          threshold: null,
          marker: {
            lineWidth: 1,
            fillColor: 'white',
          },
        },
      },
      series: [
        {
          type: 'areaspline',
          data: this.chartData.chartData,
        },
      ],
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
    };

    Highcharts.chart('analyticChart', chartOptions);
  }
}
