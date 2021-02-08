import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { College } from 'src/app/models/college';
import { CollegeService } from 'src/app/services/college.service';

@Component({
  selector: 'app-manage-colleges',
  templateUrl: './manage-colleges.component.html',
  styleUrls: ['./manage-colleges.component.css']
})
export class ManageCollegesComponent implements OnInit {

  form: FormGroup;
  error: String = null;
  showSuccess: boolean = false;
  private selectedCollege: College = null;
  colleges: College[] = [];

  constructor(private collegeService: CollegeService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required, Validators.maxLength(80)]}),
      regNo: new FormControl(null, {validators: [Validators.required, Validators.maxLength(50)]})
    });
    this.fetchCollegeData();
  }

  private fetchCollegeData(){
    this.collegeService.getColleges()
    .subscribe(
      response => {
        const _colleges : College[] = [];
        response.data.forEach(college => { _colleges.push(new College(college)) });
        this.colleges = [];
        this.colleges.push(..._colleges);
      },
      err => {
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  onUpdate(){
    const data : any = {
      name: this.form.value.name,
      regNo: this.form.value.regNo
    }
    this.collegeService.updateCollegeData(this.selectedCollege.cid, data)
    .subscribe(
      () => {
        this.showSuccess = true;
        setInterval(() => {this.showSuccess = false}, 2000);
        this.fetchCollegeData();
        this.selectedCollege = null;
        this.form.reset();
      },
      err => {
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  onCollegeSelected(id: number){
    const college= this.colleges[id];
    this.selectedCollege = college;
    this.form.setValue({
      name: college.name,
      regNo: college.regNo
    });
  }

  onDelete(){
    this.collegeService.deleteCollege(this.selectedCollege.cid)
    .subscribe(
      () => {
        this.showSuccess = true;
        setInterval(() => {this.showSuccess = false}, 2000);
        this.fetchCollegeData();
        this.selectedCollege = null;
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
    this.selectedCollege = null;
  }

}
