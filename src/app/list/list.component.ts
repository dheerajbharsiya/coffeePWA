import { Coffee } from './../logic/coffee';
import { DataService } from './../data/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: [Coffee];
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getList(list=>{
      this.list = list;
    });
  }


}
