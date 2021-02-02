import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Paper } from '../models/paper';
import { PaperService } from '../services/paper.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  constructor(
    private paperService: PaperService
  ) { }

  papers : Paper[] = [];
  error: String = null;

  ngOnInit(): void {
    this.retrievePapers();
  }

  private retrievePapers(){
    this.paperService.getVerifiedPapers().subscribe(
      (response: {message: String, data: Paper[]}) => {
        this.papers.push(...response.data);
      },
      error => {
        this.error = error;
      }
    );
  }

  ngOnDestroy(){
  }

}
