import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SPOC } from 'src/app/models/spoc';
import { SpocService } from 'src/app/services/spoc.service';

@Component({
  selector: 'app-manage-spoc',
  templateUrl: './manage-spoc.component.html',
  styleUrls: ['./manage-spoc.component.css']
})
export class ManageSpocComponent implements OnInit {

  form: FormGroup;
  error: String = null;
  isLoading = false;
  showSuccess: boolean = false;
  private selectedSpoc: SPOC = null;
  spocs: SPOC[] = [];

  constructor(private spocService: SpocService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.email, Validators.required, Validators.maxLength(50) ]}),
      name: new FormControl(null, { validators: [Validators.required, Validators.maxLength(80)]}),
      contact: new FormControl(null, {validators: [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(50)]})
    });
    this.fetchSpocData();
  }

  private fetchSpocData(){
    this.isLoading = true;
    this.spocService.getSpocs()
    .subscribe(
      response => {
        this.isLoading = false;
        const _spocs : SPOC[] = [];
        response.data.forEach(spoc => { _spocs.push(new SPOC(spoc)) });
        this.spocs = [];
        this.spocs.push(..._spocs);
      },
      err => {
        this.isLoading = false;
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
    this.isLoading = true;
    this.spocService.updateSpocData(this.selectedSpoc.spocId, data)
    .subscribe(
      () => {
        this.isLoading = false;
        this.showSuccess = true;
        setInterval(() => {this.showSuccess = false}, 2000);
        this.fetchSpocData();
        this.selectedSpoc = null;
        this.form.reset();
      },
      err => {
        this.isLoading = false;
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  onSpocSelected(id: number){
    const spoc= this.spocs[id];
    this.selectedSpoc = spoc;
    this.form.setValue({
      email : spoc.email,
      name: spoc.name,
      contact: spoc.contact
    });
  }

  onDelete(){
    this.isLoading = true;
    this.spocService.deleteSpoc(this.selectedSpoc.spocId)
    .subscribe(
      () => {
        this.isLoading = false;
        this.showSuccess = true;
        setInterval(() => {this.showSuccess = false}, 2000);
        this.fetchSpocData();
        this.selectedSpoc = null;
        this.form.reset();
      },
      err => {
        this.isLoading = false;
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  onClear(){
    this.form.reset();
    this.selectedSpoc = null;
  }
}
