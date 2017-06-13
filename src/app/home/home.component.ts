import { Component, OnInit } from '@angular/core';
import * as vars from '../variables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = vars.app;
  constructor() { }

  ngOnInit() {
  }

}
