import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router) { }

  search = new FormGroup({
    searchBar : new FormControl('')
  });

  searchText = "";
  ngOnInit(): void {
  }

  onSearch() {
    this.searchText = this.search.value.searchBar;
    this.router.navigate([`search`,this.searchText]);
  }

}
