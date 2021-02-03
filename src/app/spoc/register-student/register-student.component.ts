import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {

  constructor(private studentService: StudentService) { }

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
    const student: any = {
      email: this.form.value.email,
      name: `${this.form.value.fname} ${this.form.value.mname} ${this.form.value.lname}`,
      contact: this.form.value.contact,
      college: this.collegeId,
      registeredBy: 'shoaib@gmail.com',
      password: this.form.value.contact
    };
    
    this.studentService.signupStudent(student)
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
