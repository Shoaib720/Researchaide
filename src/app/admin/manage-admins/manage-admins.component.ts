import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit {

  form: FormGroup;
  error: String = null;
  showSuccess: boolean = false;
  private selectedAdmin: Admin = null;
  admins: Admin[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.email, Validators.required, Validators.maxLength(50) ]}),
      name: new FormControl(null, { validators: [Validators.required, Validators.maxLength(80)]}),
      contact: new FormControl(null, {validators: [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(50)]})
    });
    this.fetchAdminData();
  }

  private fetchAdminData(){
    this.adminService.getAdmins()
    .subscribe(
      response => {
        const _admins : Admin[] = [];
        response.data.forEach(admin => { _admins.push(new Admin(admin)) });
        this.admins = [];
        this.admins.push(..._admins);
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
    this.adminService.updateAdminData(this.selectedAdmin.adminId, data)
    .subscribe(
      () => {
        this.showSuccess = true;
        setInterval(() => {this.showSuccess = false}, 2000);
        this.fetchAdminData();
        this.selectedAdmin = null;
        this.form.reset();
      },
      err => {
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  onAdminSelected(id: number){
    const admin= this.admins[id];
    this.selectedAdmin = admin;
    this.form.setValue({
      email : admin.email,
      name: admin.name,
      contact: admin.contact
    });
  }

  onDelete(){
    this.adminService.deleteAdmin(this.selectedAdmin.adminId)
    .subscribe(
      () => {
        this.showSuccess = true;
        setInterval(() => {this.showSuccess = false}, 2000);
        this.fetchAdminData();
        this.selectedAdmin = null;
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
    this.selectedAdmin = null;
  }
}
