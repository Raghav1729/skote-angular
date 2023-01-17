import { Component, OnInit } from '@angular/core';

import { editableTable } from './data';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss']
})

/**
 * Editable Component
 */
export class EditableComponent implements OnInit {

  // bread crum data
  breadCrumbItems: Array<{}>;
  editableTable: any;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Editable Table', active: true }];

    /**
     * fetch data
     */
     this._fetchData();
  }

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Glenna Reichert', title: 'Glenna Reichert' },
              { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
              { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
            ],
          },
        },
      },
      email: {
        title: 'Email',
        filter: {
          type: 'completer',
          config: {
            completer: {
              data: editableTable,
              searchFields: 'email',
              titleField: 'email',
            },
          },
        },
      },
    },
  };

  /**
   * fetches the table value
   */
   _fetchData() {
    this.editableTable = editableTable;
  }

}
