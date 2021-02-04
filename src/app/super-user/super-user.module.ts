import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ManageAdminComponent } from "./manage-admin/manage-admin.component";
import { RegisterAdminComponent } from "./register-admin/register-admin.component";
import { SuLoginComponent } from "./su-login/su-login.component";
import { SuSignupComponent } from "./su-signup/su-signup.component";
import { SuperUserRoutingModule } from "./su-signup/super-user-routing.module";

@NgModule({
    declarations: [
        SuSignupComponent,
        SuLoginComponent,
        ManageAdminComponent,
        RegisterAdminComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SuperUserRoutingModule
    ]
})
export class SuperUserModule{}