import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { SPOCModule } from './spoc/spoc.module';
import { PaperService } from './services/paper.service';
import { SuperUserModule } from './super-user/super-user.module';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TokenAuthGuard } from './guards/token-auth.guard';

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
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    StudentModule,
    SPOCModule,
    SuperUserModule
  ],
  providers: [
    PaperService, 
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
