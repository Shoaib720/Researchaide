import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SuperUserComponent } from './super-user/super-user.component';
import { SpocComponent } from './spoc/spoc.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SuLoginComponent } from './super-user/su-login/su-login.component';
import { SuSignupComponent } from './super-user/su-signup/su-signup.component';
import { RegisterAdminComponent } from './super-user/register-admin/register-admin.component';
import { ManageAdminComponent } from './super-user/manage-admin/manage-admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { SPOCModule } from './spoc/spoc.module';
import { PaperService } from './services/paper.service';

@NgModule({
  declarations: [
    AppComponent,
    SuperUserComponent,
    SpocComponent,
    AdminComponent,
    StudentComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    PageNotFoundComponent,
    SuLoginComponent,
    SuSignupComponent,
    RegisterAdminComponent,
    ManageAdminComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    StudentModule,
    SPOCModule
  ],
  providers: [PaperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
