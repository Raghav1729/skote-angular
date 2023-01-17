import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import {OrdersModel} from './orders.model';
import { Orders } from './data';
import { OrdersService } from './orders.service';
import { NgbdOrdersSortableHeader, SortEvent } from './orders-sortable.directive';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersService, DecimalPipe]
})

/**
 * Ecommerce orders component
 */
export class OrdersComponent {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;

  ordersForm!: UntypedFormGroup;
  submitted = false;

  transactions;
  // Table data
  content?: any;
  orderes?: any;
  ordersList!: Observable<OrdersModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdOrdersSortableHeader) headers!: QueryList<NgbdOrdersSortableHeader>;

  constructor(private modalService: NgbModal,public service: OrdersService, private formBuilder: UntypedFormBuilder) {
    this.ordersList = service.countries$;
    this.total = service.total$;
   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Orders', active: true }];

    /**
     * Form Validation
     */
     this.ordersForm = this.formBuilder.group({
      id: "#VZ2101",
      ids: [''],
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      total: ['', [Validators.required]],
      status: ['', [Validators.required]],
      payment: ['', [Validators.required]]
    });

    /**
    * fetches data
    */
     this.ordersList.subscribe(x => {
      this.content = this.orderes;
      this.orderes =  Object.assign([], x);   
    });
  }

  /**
   * Open modal
   * @param content modal content
   */
   openViewModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev:any) {    
    this.orderes.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

  // Delete Data
  delete(id:any) {    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          document.getElementById('o_'+ id)?.remove();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  /**
   * Form data get
   */
   get form() {
    return this.ordersForm.controls;
  }

  /**
  * Save user
  */
   saveUser() {
    if (this.ordersForm.valid) {
      if (this.ordersForm.get('ids')?.value) {     
        this.orderes = this.orderes.map((data: { id: any; }) => data.id === this.ordersForm.get('ids')?.value ? { ...data, ...this.ordersForm.value } : data)        
      }else{
      const id = this.ordersForm.get('id')?.value;
      const name = this.ordersForm.get('name')?.value;
      const date =  this.ordersForm.get('date')?.value;
      const total =  this.ordersForm.get('total')?.value;
      const status =  this.ordersForm.get('status')?.value;
      const payment =  this.ordersForm.get('payment')?.value;
      const index = 100;
      this.orderes.push({
        id,
        name,
        date,
        total,
        status,
        payment,
        index
      }); 
      this.modalService.dismissAll();
    }
    }
    this.modalService.dismissAll();
    setTimeout(() => {
      this.ordersForm.reset();
    }, 2000);
    this.submitted = true
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
   editDataGet(id: any, content:any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Order';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";
    var listData = this.orderes.filter((data: { id: any; }) => data.id === id);      
    this.ordersForm.controls['name'].setValue(listData[0].name);    
    this.ordersForm.controls['date'].setValue(listData[0].date);
    this.ordersForm.controls['total'].setValue(listData[0].total);
    this.ordersForm.controls['status'].setValue(listData[0].status);
    this.ordersForm.controls['payment'].setValue(listData[0].payment);
    this.ordersForm.controls['ids'].setValue(listData[0].id);    
  }
  

}
