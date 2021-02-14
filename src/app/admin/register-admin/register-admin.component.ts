import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-admins',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  constructor(private authService: AuthService, private adminService: AdminService) { }

  form: FormGroup;
  error: String = null;
  isLoading = false;
  showSuccess: boolean = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      fname : new FormControl(null, { validators: Validators.required}),
      mname : new FormControl(null, { validators: Validators.required}),
      lname : new FormControl(null, { validators: Validators.required}),
      email : new FormControl(null, { validators: [Validators.required, Validators.email]}),
      contact: new FormControl(null, {validators: [Validators.required, Validators.pattern(/^\d{10}$/)]}),
    })
  }

  onRegister(){
    const admin: any = {
      email: this.form.value.email,
      name: `${this.form.value.fname} ${this.form.value.mname} ${this.form.value.lname}`,
      contact: this.form.value.contact,
      registeredBy: this.authService.loggedUser.value.email,
      password: this.form.value.contact
    };
    this.isLoading = true;
    this.adminService.signupAdmin(admin)
    .subscribe(
      () => {
        this.isLoading = false;
        this.showSuccess = true;
        this.form.reset();
        setInterval(() => {this.showSuccess = false}, 2000);
      },
      err => {
        this.isLoading = false;
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    );
  }

}
