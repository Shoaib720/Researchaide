import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { TokenAuthGuard } from "../guards/token-auth.guard";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { AdminComponent } from "./admin.component";
import { ManageAdminsComponent } from "./manage-admins/manage-admins.component";
import { ManageCollegesComponent } from "./manage-colleges/manage-colleges.component";
import { ManageSpocComponent } from "./manage-spoc/manage-spoc.component";
import { PaperAnalyticsComponent } from "./paper-analytics/paper-analytics.component";
import { RegisterAdminComponent } from "./register-admin/register-admin.component";
import { RegisterCollegeComponent } from "./register-college/register-college.component";
import { RegisterSpocComponent } from "./register-spoc/register-spoc.component";
import { UserAnalyticsComponent } from "./user-analytics/user-analytics.component";

const routes: Routes = [
    { path: '', component: AdminComponent, children: [
        { path: '', redirectTo: 'paper-analytics', pathMatch: 'full' },
        { path: 'paper-analytics', component: PaperAnalyticsComponent },
        { path: 'user-analytics', component: UserAnalyticsComponent },
        { path: 'manage-spocs', component: ManageSpocComponent },
        { path: 'register-spoc', component: RegisterSpocComponent },
        { path: 'manage-admins', component: ManageAdminsComponent },
        { path: 'register-admin', component: RegisterAdminComponent },
        { path: 'manage-colleges', component: ManageCollegesComponent },
        { path: 'register-college', component: RegisterCollegeComponent },
        { path: 'change-pwd', component: ChangePasswordComponent },
        { path: '**', component: PageNotFoundComponent }
    ] }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutingModule{}