import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TokenAuthGuard } from "../guards/token-auth.guard";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { AdminComponent } from "./admin.component";
import { ManageSpocComponent } from "./manage-spoc/manage-spoc.component";
import { PaperAnalyticsComponent } from "./paper-analytics/paper-analytics.component";
import { RegisterSpocComponent } from "./register-spoc/register-spoc.component";
import { UserAnalyticsComponent } from "./user-analytics/user-analytics.component";

const routes: Routes = [
    { path: '', component: AdminComponent, children: [
        { path: '', redirectTo: 'paper-analytics', pathMatch: 'full' },
        { path: 'paper-analytics', component: PaperAnalyticsComponent },
        { path: 'user-analytics', component: UserAnalyticsComponent },
        { path: 'manage-spoc', component: ManageSpocComponent },
        { path: 'register-spoc', component: RegisterSpocComponent },
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