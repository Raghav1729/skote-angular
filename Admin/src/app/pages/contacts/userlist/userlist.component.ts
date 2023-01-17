import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, UntypedFormControl, Validators } from '@angular/forms';


import { userListModel } from './userlist.model';
import { userList } from './data';
import { userListService } from './userlist.service';
import { NgbdUserListSortableHeader, SortEvent } from './userlist-sortable.directive';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
  providers: [userListService, DecimalPipe]
})

/**
 * Contacts user-list component
 */
export class UserlistComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Table data
  contactsList!: Observable<userListModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdUserListSortableHeader) headers!: QueryList<NgbdUserListSortableHeader>;

  // constructor(){}

  constructor(private modalService: NgbModal,public service: userListService, private formBuilder: UntypedFormBuilder) {
    this.contactsList = service.countries$;
    this.total = service.total$;        
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Users List', active: true }];
  }
}
