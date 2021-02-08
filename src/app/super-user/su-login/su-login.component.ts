import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-su-login',
  templateUrl: './su-login.component.html',
  styleUrls: ['./su-login.component.css']
})
export class SuLoginComponent implements OnInit, OnDestroy {

  error: string = null;

  private loginSub: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  loginForm = new FormGroup({
    email : new FormControl('', {validators: [Validators.required, Validators.email, Validators.maxLength(50)]}),
    password : new FormControl('', {validators: [Validators.required, Validators.maxLength(50)]})
  })

  ngOnInit(): void {
  }

  onLogin() {
    if(this.loginForm.value.email === '' || this.loginForm.value.password === ''){
      this.error = "Please fill all the fields!";
      setInterval(() => {this.error = null}, 5000);
    }
    else if(this.loginForm.valid){
      const email: string = this.loginForm.value.email;
      const password: string = this.loginForm.value.password;
      this.loginSub = this.authService.loginUser({email, password})
      .subscribe(
        response => { this.authService.handleAuthentication(response) },
        err => {
          this.error = err;
          setInterval(() => {this.error = null}, 5000);
        }
      )
    }
  }

  ngOnDestroy(){
    if(this.loginSub){
      this.loginSub.unsubscribe();
    }
  }
}
