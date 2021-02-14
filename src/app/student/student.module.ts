import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { MyPapersComponent } from "./my-papers/my-papers.component";
import { StudentRoutingModule } from "./student-routing.module";
import { UploadPapersComponent } from "./upload-papers/upload-papers.component";

@NgModule({
    declarations: [
        MyPapersComponent,
        UploadPapersComponent
    ],
    imports: [
        CommonModule,
        StudentRoutingModule,
        ReactiveFormsModule,
        AngularMaterialModule
    ],
    exports: [
        // MatProgressSpinner
    ]
})

export class StudentModule{}