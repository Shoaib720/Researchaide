import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaperService } from 'src/app/services/paper.service';

@Component({
  selector: 'app-upload-papers',
  templateUrl: './upload-papers.component.html',
  styleUrls: ['./upload-papers.component.css']
})
export class UploadPapersComponent implements OnInit {

  constructor(
    private paperService: PaperService
  ) { }

  filePickerError: String = null;
  isInputFileValid: Boolean = false;
  uploadedPaperId: String = null;
  error: String = null;
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      title : new FormControl(null, {validators: [Validators.required]}),
      keywords : new FormControl(null, {validators: [Validators.required]}),
      areaOfResearch : new FormControl(null, {validators: [Validators.required]}),
      author1Name : new FormControl(null, {validators: [Validators.required]}),
      author2Name : new FormControl(null),
      author3Name : new FormControl(null),
      file : new FormControl(null, {validators: [Validators.required]})
    });
  }
  
  onFilePicked(e: any){
    if(e.target.files && e.target.files[0]){
      const file = (e.target as HTMLInputElement).files[0];
      const MAX_SIZE = 10485760;
      const ALLOWED_TYPE = 'application/pdf';
      if(file.size > MAX_SIZE){
        this.isInputFileValid = false;
        return this.filePickerError = "File size cannot exceed 10MB";
      }
      if(file.type !== ALLOWED_TYPE){
        this.isInputFileValid = false;
        return this.filePickerError = "Invalid file type. Only pdf files are valid!"
      }
      this.filePickerError = null;
      this.isInputFileValid = true;
      this.form.patchValue({file: file});
      this.form.get('file').updateValueAndValidity();
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  }

  onUpload(){
    let authors: string = '';
    let keywords: string = '';
    keywords += this.form.value.keywords.split(',').map((keyword: string) => {return keyword.trim().toLowerCase()}) + ',';
    keywords += this.form.value.title.split(' ').map((keyword: string) => {return keyword.trim().toLowerCase()}) + ',';
    keywords += this.form.value.areaOfResearch;
    var formData: FormData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('keywords', keywords);
    formData.append('areaOfResearch', this.form.value.areaOfResearch.toString());
    authors += this.form.value.author1Name;
    if(this.form.value.author2Name !== ''){
      authors += ',' + this.form.value.author2Name;
    }
    if(this.form.value.author3Name !== ''){
      authors += ',' + this.form.value.author3Name;
    }
    formData.append('authors', authors)
    formData.append('uploadedBy', "shoaib@gmail.com"),
    formData.append('college', '5f3f9d42b58452716c44e5eb'),
    formData.append('file', this.form.value.file);
    this.paperService.uploadPaper(formData)
    .subscribe(
      response => {
        this.uploadedPaperId = response.data.paperId;
        setInterval(() => {this.uploadedPaperId = null}, 3000);
      },
      err => {
        this.error = err,
        setInterval(() => {this.error = null}, 5000);
      }
    )
    this.form.reset();
  }

}
