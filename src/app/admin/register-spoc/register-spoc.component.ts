import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { College } from 'src/app/models/college';
import { AuthService } from 'src/app/services/auth.service';
import { CollegeService } from 'src/app/services/college.service';
import { SpocService } from 'src/app/services/spoc.service';

@Component({
  selector: 'app-register-spoc',
  templateUrl: './register-spoc.component.html',
  styleUrls: ['./register-spoc.component.css']
})
export class RegisterSpocComponent implements OnInit {
  
    constructor(
      private authService: AuthService,
      private spocService: SpocService,
      private collegeService: CollegeService
    ) { }

  form: FormGroup;
  error: String = null;
  isLoading = false;
  showSuccess: boolean = false;
  colleges: College[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.collegeService.getColleges()
    .subscribe(
      response => {
        this.isLoading = false;
        const _colleges: College[] = [];
        response.data.forEach(college => { _colleges.push(new College(college)) });
        this.colleges = [];
        this.colleges.push(..._colleges);
      },
      err => {
        this.isLoading = false;
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
    this.form = new FormGroup({
      fname : new FormControl(null, { validators: Validators.required}),
      mname : new FormControl(null, { validators: Validators.required}),
      lname : new FormControl(null, { validators: Validators.required}),
      email : new FormControl(null, { validators: [Validators.required, Validators.email]}),
      contact: new FormControl(null, {validators: [Validators.required, Validators.pattern(/^\d{10}$/)]}),
      college : new FormControl('Select College', { validators: Validators.required})
    })
  }

  onRegister(){
    const spoc: any = {
      email: this.form.value.email,
      name: `${this.form.value.fname} ${this.form.value.mname} ${this.form.value.lname}`,
      contact: this.form.value.contact,
      college: this.form.value.college,
      registeredBy: this.authService.loggedUser.value.email,
      password: this.form.value.contact
    };
    this.isLoading = true;
    this.spocService.signupSpoc(spoc)
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
