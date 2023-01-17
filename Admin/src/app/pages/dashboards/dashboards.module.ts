import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from './saas/shared/shared.module'
import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular';

import { DefaultComponent } from './default/default.component';
import { SaasComponent } from './saas/saas.component';
import { CryptoComponent } from './crypto/crypto.component';
import { BlogComponent } from './blog/blog.component';
import { JobsComponent } from './jobs/jobs.component';

@NgModule({
  declarations: [DefaultComponent, SaasComponent, CryptoComponent, BlogComponent, JobsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbCarouselModule,
    WidgetModule,
    NgApexchartsModule,
    SharedModule,
    SimplebarAngularModule
  ]
})
export class DashboardsModule { }
