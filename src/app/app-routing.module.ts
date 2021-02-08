import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { TokenAuthGuard } from "./guards/token-auth.guard";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegisterFirstAdminComponent } from "./register-first-admin/register-first-admin.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'search/:keywords', component: SearchComponent },
    { path: 'login', component: LoginComponent },
    { path: 'first-admin', component: RegisterFirstAdminComponent },
    { path: 'admin', canLoad: [TokenAuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
    // { path: 'admin', loadChildren: './admin/admin.module.ts#AdminModule'},
    { path: 'student', canLoad: [TokenAuthGuard], loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
    { path: 'spoc', canLoad: [TokenAuthGuard], loadChildren: () => import('./spoc/spoc.module').then(m => m.SPOCModule) },
    { path: 'su', canLoad: [TokenAuthGuard], loadChildren: () => import('./super-user/super-user.module').then(m => m.SuperUserModule) },
    // { path: 'change-pwd', component: ChangePasswordComponent },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}