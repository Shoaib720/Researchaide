import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-spoc',
  templateUrl: './spoc.component.html',
  styleUrls: ['./spoc.component.css']
})
export class SpocComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logoutUser();
  }

}
