import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

/**
 * Notification Component
 */
export class NotificationComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor(public toastService: ToastService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Notifications', active: true }];
  }

  /**
   * Standard message
   */
   showStandard() {
    var itemAmount = document.querySelector('.product-price') as HTMLInputElement;
    var text = itemAmount?.value ? itemAmount?.value : 'Welcome';
    
    var checkboxes:any = document.getElementsByName('toast-type-radio');
    var result = '';
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
          result = checkboxes[i].value;
        }
      }  
    this.toastService.show(text, { classname: 'bg-'+result+' text-center text-white', delay: 10000 });
  }



}
