import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
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
    // { path: 'admin', canLoad: [TokenAuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
    { path: 'admin', canLoad: [TokenAuthGuard], loadChildren: './admin/admin.module#AdminModule' },
    { path: 'student', canLoad: [TokenAuthGuard], loadChildren: './student/student.module#StudentModule' },
    { path: 'spoc', canLoad: [TokenAuthGuard], loadChildren: './spoc/spoc.module#SPOCModule' },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule{}