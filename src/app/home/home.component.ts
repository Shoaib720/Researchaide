import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router) { }

  @ViewChild('searchBar', {static: false}) search: ElementRef;

  searchText = "";
  ngOnInit(): void {
  }

  onSearch() {
    this.searchText = this.search.nativeElement.value;
    if(this.searchText === ""){
      this.search.nativeElement.placeholder = "Please type something here...";
    }
    else{
      this.router.navigate([`search`,this.searchText]);
    }
  }

}
