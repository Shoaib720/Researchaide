import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";
import { ManageAdminComponent } from "../manage-admin/manage-admin.component";
import { RegisterAdminComponent } from "../register-admin/register-admin.component";
import { SuLoginComponent } from "../su-login/su-login.component";
import { SuperUserComponent } from "../super-user.component";
import { SuSignupComponent } from "./su-signup.component";

const routes: Routes = [
    { path: '', component: SuperUserComponent, children: [
        { path: '', redirectTo: 'manage-admin', pathMatch: 'full' },
        { path: 'manage-admin', component: ManageAdminComponent },
        { path: 'register-admin', component: RegisterAdminComponent },
        { path: 'login', component: SuLoginComponent },
        { path: 'signup', component: SuSignupComponent },
        { path: '**', component: PageNotFoundComponent }
    ] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SuperUserRoutingModule{}