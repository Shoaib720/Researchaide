import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CollegeService } from 'src/app/services/college.service';

@Component({
  selector: 'app-register-college',
  templateUrl: './register-college.component.html',
  styleUrls: ['./register-college.component.css']
})
export class RegisterCollegeComponent implements OnInit {

  form: FormGroup;
  error: String = null;
  showSuccess: boolean = false;

  constructor(private collegeService: CollegeService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name : new FormControl(null, { validators: Validators.required}),
      regNo : new FormControl(null, { validators: Validators.required})
    })
  }

  onRegister(){
    const college: any = {
      name: this.form.value.name,
      regNo: this.form.value.regNo
    };
    
    this.collegeService.registerCollege(college)
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
