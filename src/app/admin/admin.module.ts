import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";
import { ManageSpocComponent } from "./manage-spoc/manage-spoc.component";
import { PaperAnalyticsComponent } from "./paper-analytics/paper-analytics.component";
import { RegisterSpocComponent } from "./register-spoc/register-spoc.component";
import { UserAnalyticsComponent } from "./user-analytics/user-analytics.component";
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { RegisterCollegeComponent } from './register-college/register-college.component';
import { ManageCollegesComponent } from './manage-colleges/manage-colleges.component';

@NgModule({
    declarations: [
        ManageSpocComponent,
        PaperAnalyticsComponent,
        UserAnalyticsComponent,
        RegisterSpocComponent,
        ManageAdminsComponent,
        RegisterAdminComponent,
        RegisterCollegeComponent,
        ManageCollegesComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule
    ]
})

export class AdminModule{}