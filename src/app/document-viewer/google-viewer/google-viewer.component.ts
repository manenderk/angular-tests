import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-google-viewer',
  templateUrl: './google-viewer.component.html',
  styleUrls: ['./google-viewer.component.css']
})
export class GoogleViewerComponent implements OnInit {

  documentForm: FormGroup;


  constructor() { }

  ngOnInit() {
    this.documentForm = new FormGroup({
      document: new FormControl()
    });
  }

  previewDocument() {

  }

}
