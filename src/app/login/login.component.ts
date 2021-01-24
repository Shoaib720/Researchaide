import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  loginForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  })

  ngOnInit(): void {
  }

  onSubmit() {
    
  }


}
