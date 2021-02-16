import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { SpocComponent } from './spoc/spoc.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { SPOCModule } from './spoc/spoc.module';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TokenAuthGuard } from './guards/token-auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterFirstAdminComponent } from './register-first-admin/register-first-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ConfirmCancelModalComponent } from './shared/modals/confirm-cancel-modal/confirm-cancel-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SpocComponent,
    AdminComponent,
    StudentComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    PageNotFoundComponent,
    ChangePasswordComponent,
    RegisterFirstAdminComponent,
    ConfirmCancelModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    AdminModule,
    StudentModule,
    SPOCModule,
    BrowserAnimationsModule
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    TokenAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
