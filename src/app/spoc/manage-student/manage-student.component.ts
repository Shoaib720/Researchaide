import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent implements OnInit {

  constructor(
    private studentService: StudentService
  ) { }

  form: FormGroup;
  error: String = null;
  showSuccess: boolean = false;
  private selectedStudent: Student = null;
  students: Student[] = [];
  private collegeId = "5f3f9d42b58452716c44e5eb";

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.email, Validators.required, Validators.maxLength(50) ]}),
      name: new FormControl(null, { validators: [Validators.required, Validators.maxLength(80)]}),
      contact: new FormControl(null, {validators: [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(50)]})
    });
    this.fetchStudentData();
  }

  private fetchStudentData(){
    this.studentService.getStudentsByCollegeId(this.collegeId)
    .subscribe(
      response => {
        const _students : Student[] = [];
        response.data.forEach(student => { _students.push(new Student(student)) });
        this.students = [];
        this.students.push(..._students);
      },
      err => {
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  onUpdate(){
    const data : any = {
      email: this.form.value.email,
      name: this.form.value.name,
      contact: this.form.value.contact
    }
    this.studentService.updateStudentData(this.selectedStudent.studentId, data)
    .subscribe(
      () => {
        this.showSuccess = true;
        setInterval(() => {this.showSuccess = false}, 2000);
        this.fetchStudentData();
        this.selectedStudent = null;
        this.form.reset();
      },
      err => {
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  onStudentSelected(id: number){
    const student = this.students[id];
    this.selectedStudent = student;
    this.form.setValue({
      email : student.email,
      name: student.name,
      contact: student.contact
    });
  }

  onDelete(){
    this.studentService.deleteStudent(this.selectedStudent.studentId)
    .subscribe(
      () => {
        this.showSuccess = true;
        setInterval(() => {this.showSuccess = false}, 2000);
        this.fetchStudentData();
        this.selectedStudent = null;
        this.form.reset();
      },
      err => {
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  onClear(){
    this.form.reset();
    this.selectedStudent = null;
  }

}
