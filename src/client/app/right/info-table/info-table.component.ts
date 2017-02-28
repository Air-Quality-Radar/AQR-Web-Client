import { Component, OnInit } from '@angular/core';
import { TableData } from './table-data';

@Component({
  moduleId: module.id,
  selector: 'sd-info-table',
  templateUrl: 'info-table.component.html',
  styleUrls: ['info-table.component.css']
})
export class InfoTableComponent {
  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Index', name: 'index'},
    {title: 'Value', name: 'value'},
  ];
  public length: number = 0;

  public config: any = {
    className: ['table-striped', 'table-bordered']
  };

  private data: Array<any>;

  public constructor() {
    this.data = TableData;

    this.length = this.data.length;
    this.rows = this.data;
  }
}
