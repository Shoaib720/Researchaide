import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  form: FormGroup;
  private collegeId = "5f3f9d42b58452716c44e5eb";
  error: String = null;
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
      college: this.collegeId,
      registeredBy: 'shoaib@gmail.com',
      password: this.form.value.contact
    };
    
    this.adminService.signupAdmin(admin)
    .subscribe(
      () => {
        this.showSuccess = true;
        this.form.reset();
        setInterval(() => {this.showSuccess = false}, 2000);
      },
      err => {
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    );
  }

}
