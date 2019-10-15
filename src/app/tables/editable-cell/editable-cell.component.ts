import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-cell',
  templateUrl: './editable-cell.component.html',
  styleUrls: ['./editable-cell.component.css']
})
export class EditableCellComponent implements OnInit {
  errorMessage = '';

  @Input() data: any;
  @Input() dataType: string;
  @Input() editable = false;
  @Input() dataFormats: {
    dateFormat?: string,
    dateTimeFormat?: string,
    timeFormat?: string
  };

  @Output() cellEdited = new EventEmitter<{ newData: string }>();

  constructor() {}

  ngOnInit() {
    if (!this.data || !this.dataType) {
      this.errorMessage = 'Insufficient inputs for editable table cell';
      return;
    }
  }
}
