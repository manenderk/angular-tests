import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-modules-container',
  templateUrl: './sample-modules-container.component.html',
  styleUrls: ['./sample-modules-container.component.css']
})
export class SampleModulesContainerComponent implements OnInit {
  users = ['John', 'Salvador', 'Nick', 'Sherry'];

  constructor() {}

  ngOnInit() {}
}
