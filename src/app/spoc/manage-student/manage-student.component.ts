import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent implements OnInit, OnDestroy {

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private modalService: ModalService
  ) { }

  form: FormGroup;
  error: String = null;
  isLoading = false;
  showSuccess: boolean = false;
  private selectedStudent: Student = null;
  students: Student[] = [];
  private modalSub: Subscription;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.email, Validators.required, Validators.maxLength(50) ]}),
      name: new FormControl(null, { validators: [Validators.required, Validators.maxLength(80)]}),
      contact: new FormControl(null, {validators: [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(50)]})
    });
    this.fetchStudentData();
  }

  private fetchStudentData(){
    this.isLoading = true;
    this.studentService.getStudentsByCollegeId(this.authService.loggedUser.value.cid)
    .subscribe(
      response => {
        this.isLoading = false;
        const _students : Student[] = [];
        response.data.forEach(student => { _students.push(new Student(student)) });
        this.students = [];
        this.students.push(..._students);
      },
      err => {
        this.isLoading = false;
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  onUpdate(){
    this.modalSub = this.modalService.OpenConfirmCancelModal(ModalService.UPDATE_MESSAGE, false)
    .subscribe(result => {
      if(result){
        const data : any = {
          email: this.form.value.email,
          name: this.form.value.name,
          contact: this.form.value.contact
        }
        this.isLoading = true;
        this.studentService.updateStudentData(this.selectedStudent.studentId, data)
        .subscribe(
          () => {
            this.isLoading = false;
            this.showSuccess = true;
            setInterval(() => {this.showSuccess = false}, 2000);
            this.fetchStudentData();
            this.selectedStudent = null;
            this.form.reset();
          },
          err => {
            this.isLoading = false;
            this.error = err;
            setInterval(() => {this.error = null}, 5000);
          }
        )
      }
    })
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
    this.modalSub = this.modalService.OpenConfirmCancelModal(ModalService.DELETE_MESSAGE, true)
    .subscribe(result => {
      if(result){
        this.isLoading = true;
        this.studentService.deleteStudent(this.selectedStudent.studentId)
        .subscribe(
          () => {
            this.isLoading = false;
            this.showSuccess = true;
            setInterval(() => {this.showSuccess = false}, 2000);
            this.fetchStudentData();
            this.selectedStudent = null;
            this.form.reset();
          },
          err => {
            this.isLoading = false;
            this.error = err;
            setInterval(() => {this.error = null}, 5000);
          }
        )
      }
    });
  }

  onClear(){
    this.form.reset();
    this.selectedStudent = null;
  }

  ngOnDestroy(){
    if(this.modalSub) this.modalSub.unsubscribe();
  }

}
