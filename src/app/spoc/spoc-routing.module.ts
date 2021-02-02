import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { ManageStudentComponent } from "./manage-student/manage-student.component";
import { RegisterStudentComponent } from "./register-student/register-student.component";
import { SpocComponent } from "./spoc.component";
import { VerifyPaperComponent } from "./verify-paper/verify-paper.component";

const routes : Routes = [
    { path: '', component: SpocComponent, children: [
        { path: '', redirectTo: 'verify-papers', pathMatch: 'full' },
        { path: 'verify-papers', component: VerifyPaperComponent },
        { path: 'register-student', component: RegisterStudentComponent },
        { path: 'manage-student', component: ManageStudentComponent },
        { path: '**', component: PageNotFoundComponent }
    ]}
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class SPOCRoutingModule{}