import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'search/:keywords', component: SearchComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
    { path: 'spoc', loadChildren: () => import('./spoc/spoc.module').then(m => m.SPOCModule) },
    { path: 'su', loadChildren: () => import('./super-user/super-user.module').then(m => m.SuperUserModule) },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}