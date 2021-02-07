import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { MyPapersComponent } from "./my-papers/my-papers.component";
import { StudentComponent } from "./student.component";
import { UploadPapersComponent } from "./upload-papers/upload-papers.component";

const routes: Routes = [
    { path: '', component: StudentComponent, children: [
        { path: '', redirectTo: 'my-papers', pathMatch: 'full' },
        { path: 'my-papers', component: MyPapersComponent },
        { path: 'upload-papers', component: UploadPapersComponent },
        { path: 'change-pwd', component: ChangePasswordComponent },
        { path: '**', component: PageNotFoundComponent }
    ] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StudentRoutingModule{}