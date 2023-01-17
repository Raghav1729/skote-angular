import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})

/**
 * Toasts Component
 */
export class ToastsComponent implements OnInit {
  
  // bread crumb items
  breadCrumbItems: Array<{}>;
  show = true;
  translucent = true;
  stacking = true;
  stackingSec = true;
  polite= true;

  show1 = false;
  autohide = true;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Toasts', active: true }];
  }

}
