import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Paper } from '../models/paper';
import { PaperService } from '../services/paper.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  constructor(
    private paperService: PaperService,
    private route: ActivatedRoute
  ) { }

  papers : Paper[] = [];
  error: String = null;
  keywordsString: String = null;
  form: FormGroup;
  private URL = 'http://localhost:3000/api/v1/papers';

  ngOnInit(): void {
    if(this.route.snapshot.params.keywords !== ''){
      this.onSearchByKeywords(this.route.snapshot.params.keywords);
    }
    else{
      this.retrievePapers();
    }
  }

  @ViewChild('areaOfResearch', {static: false}) areaOfResearch: ElementRef;
  @ViewChild('keywords', {static: false}) keywords: ElementRef;

  private retrievePaperSub: Subscription;
  private searchByKeywordsSub: Subscription;

  private retrievePapers(){
    this.retrievePaperSub = this.paperService.getVerifiedPapers().subscribe(
      (response: {message: String, data: Paper[]}) => {
        let _papers: Paper[] = [];
        response.data.forEach(paper => { _papers.push(new Paper(paper)) });
        this.papers = [];
        this.papers.push(..._papers);
      },
      error => {
        this.error = error;
      }
    );
  }

  onSearch(){
    if(this.keywords.nativeElement.value !== ''){
      this.onSearchByKeywords(this.keywords.nativeElement.value);
    }
  }

  private onSearchByKeywords(keywords: string){
    this.searchByKeywordsSub = this.paperService.getPapersByKeywords(keywords)
      .subscribe(
        response => {
          if(response.data.length !== 0){
            let _papers : Paper[] = [];
            response.data.forEach(paper => { _papers.push(new Paper(paper)) });
            this.papers = [];
            this.papers.push(..._papers);
          }
        },
        err => {
          this.error = err;
          setInterval(() => { this.error = null }, 5000);
        }
      )
  }

  onView(id: number){
    console.log(this.papers)
    window.open(`${this.URL}/${this.papers[id].paperId}`);
  }

  onAreaOfResearchSelected(){
    console.log(this.areaOfResearch.nativeElement.value)
  }

  ngOnDestroy(){
    if(this.retrievePaperSub) this.retrievePaperSub.unsubscribe();
    if(this.searchByKeywordsSub) this.searchByKeywordsSub.unsubscribe();
  }

}
