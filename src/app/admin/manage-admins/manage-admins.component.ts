import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin';
import { DialogData } from 'src/app/models/dialog-data';
import { AdminService } from 'src/app/services/admin.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit, OnDestroy {

  form: FormGroup;
  error: String = null;
  showSuccess: boolean = false;
  isLoading: boolean = false;
  private selectedAdmin: Admin = null;
  admins: Admin[] = [];
  private dialogSub: Subscription;

  constructor(
    private adminService: AdminService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.email, Validators.required, Validators.maxLength(50) ]}),
      name: new FormControl(null, { validators: [Validators.required, Validators.maxLength(80)]}),
      contact: new FormControl(null, {validators: [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(50)]})
    });
    this.fetchAdminData();
  }

  private fetchAdminData(){
    this.isLoading = true;
    this.adminService.getAdmins()
    .subscribe(
      response => {
        this.isLoading = false;
        const _admins : Admin[] = [];
        response.data.forEach(admin => { _admins.push(new Admin(admin)) });
        this.admins = [];
        this.admins.push(..._admins);
      },
      err => {
        this.isLoading = false;
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  onUpdate(){
    this.dialogSub = this.modalService.OpenConfirmCancelModal(ModalService.UPDATE_MESSAGE, false)
    .subscribe(
      result => {
        if(result){
          const data : any = {
            email: this.form.value.email,
            name: this.form.value.name,
            contact: this.form.value.contact
          }
          this.isLoading = true;
          this.adminService.updateAdminData(this.selectedAdmin.adminId, data)
          .subscribe(
            () => {
              this.isLoading = false;
              this.showSuccess = true;
              setInterval(() => {this.showSuccess = false}, 2000);
              this.fetchAdminData();
              this.selectedAdmin = null;
              this.form.reset();
            },
            err => {
              this.isLoading = false;
              this.error = err;
              setInterval(() => {this.error = null}, 5000);
            }
          )
        }
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
    this.dialogSub = this.modalService.OpenConfirmCancelModal(ModalService.DELETE_MESSAGE, true)
    .subscribe(
      result => {
        if(result){
          this.isLoading = true;
          this.adminService.deleteAdmin(this.selectedAdmin.adminId)
          .subscribe(
            () => {
              this.isLoading = false;
              this.showSuccess = true;
              setInterval(() => {this.showSuccess = false}, 2000);
              this.fetchAdminData();
              this.selectedAdmin = null;
              this.form.reset();
            },
            err => {
              this.isLoading = false;
              this.error = err;
              setInterval(() => {this.error = null}, 5000);
            }
          )
        }
      }
    )
  }

  onClear(){
    this.form.reset();
    this.selectedAdmin = null;
  }

  ngOnDestroy(){
    if(this.dialogSub) this.dialogSub.unsubscribe();
  }
}
