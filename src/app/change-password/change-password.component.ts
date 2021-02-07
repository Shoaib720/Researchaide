import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEventPattern, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  form: FormGroup;
  error: string = null;
  showSuccess: boolean = false;

  private changeSub: Subscription;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email, Validators.maxLength(50)]}),
      oldPwd: new FormControl(null, {validators: [Validators.required, Validators.maxLength(50)]}),
      newPwd: new FormControl(null, {validators: [Validators.required, Validators.maxLength(50), Validators.minLength(6)]}),
      confirmPwd: new FormControl(null, {validators: [Validators.required, Validators.maxLength(50), Validators.minLength(6)]})
    })
    
  }

  onChanged(){
    if(this.form.value.newPwd !== this.form.value.confirmPwd){
      this.error = 'New and confirm passwords must match!';
      setInterval(() => {this.error = null}, 3000);
      return;
    }
    const email: string = this.form.value.email;
    const oldPassword: string = this.form.value.oldPwd;
    const newPassword: string = this.form.value.newPwd;
    const credentials = {email, oldPassword, newPassword};
    this.authService.changePassword(credentials)
    .subscribe(
      () => {
        this.showSuccess = true;
        setInterval(() => {this.showSuccess = false}, 3000);
      },
      err => {
        this.error = err;
        setInterval(() => {this.error = null}, 3000);
      }
    )
    this.form.reset();
  }

  ngOnDestroy(){
    if(this.changeSub) this.changeSub.unsubscribe();
  }
}
