import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";
import { ManageSpocComponent } from "./manage-spoc/manage-spoc.component";
import { PaperAnalyticsComponent } from "./paper-analytics/paper-analytics.component";
import { RegisterSpocComponent } from "./register-spoc/register-spoc.component";
import { UserAnalyticsComponent } from "./user-analytics/user-analytics.component";

@NgModule({
    declarations: [
        ManageSpocComponent,
        PaperAnalyticsComponent,
        UserAnalyticsComponent,
        RegisterSpocComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule
    ]
})

export class AdminModule{}