import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { ManageStudentComponent } from "./manage-student/manage-student.component";
import { RegisterStudentComponent } from "./register-student/register-student.component";
import { SPOCRoutingModule } from "./spoc-routing.module";
import { VerifyPaperComponent } from "./verify-paper/verify-paper.component";

@NgModule({
    declarations: [
        VerifyPaperComponent,
        ManageStudentComponent,
        RegisterStudentComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SPOCRoutingModule,
        AngularMaterialModule
    ]
})

export class SPOCModule{}