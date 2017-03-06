import { Component, Input, OnChanges } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sd-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnChanges {
  @Input() public lineChartTitle: string;
  // lineChart
  public lineChartData: Array<any> = [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  ];
  public lineChartLabels: Array<any> = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];
  public lineChartOptions: any = {
    responsive: true,
    title: {
      display: true,
      text: this.lineChartTitle
    }
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  public updateData(chartData: Array<any>) {
    this.lineChartData = chartData.slice();
  }

  ngOnChanges() {
    this.lineChartOptions.title.text = this.lineChartTitle;
  }
}
