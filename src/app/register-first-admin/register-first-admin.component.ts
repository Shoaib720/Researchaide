import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-register-first-admin',
  templateUrl: './register-first-admin.component.html',
  styleUrls: ['./register-first-admin.component.css']
})
export class RegisterFirstAdminComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  form: FormGroup;
  error: String = null;
  showSuccess: boolean = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      fname : new FormControl(null, { validators: Validators.required}),
      mname : new FormControl(null, { validators: Validators.required}),
      lname : new FormControl(null, { validators: Validators.required}),
      email : new FormControl(null, { validators: [Validators.required, Validators.email]}),
      contact: new FormControl(null, {validators: [Validators.required, Validators.pattern(/^\d{10}$/)]}),
      secretKey : new FormControl(null, { validators: Validators.required}),
    })
  }

  onRegister(){
    const admin: any = {
      email: this.form.value.email,
      name: `${this.form.value.fname} ${this.form.value.mname} ${this.form.value.lname}`,
      contact: this.form.value.contact,
      password: this.form.value.contact,
      secretKey: this.form.value.secretKey
    };
    
    this.adminService.signupFirstAdmin(admin)
    .subscribe(
      () => {
        this.showSuccess = true;
        this.form.reset();
        setInterval(() => {this.showSuccess = false}, 2000);
      },
      err => {
        this.error = err;
        setInterval(() => {this.error = null}, 10000);
      }
    );
  }

}
