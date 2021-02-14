import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Paper } from '../models/paper';
import { PaperService } from '../services/paper.service';
import { environment } from '../../environments/environment';

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
  isLoading: boolean = false;
  private URL = environment.backendURL + '/papers';

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
  private searchByAreaSub: Subscription;

  private retrievePapers(){
    this.isLoading = true;
    this.retrievePaperSub = this.paperService.getVerifiedPapers().subscribe(
      (response: {message: String, data: Paper[]}) => {
        let _papers: Paper[] = [];
        response.data.forEach(paper => { _papers.push(new Paper(paper)) });
        this.papers = [];
        this.papers.push(..._papers);
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.error = error;
        setInterval(() => { this.error = null }, 5000);
      }
    );
  }

  onSearch(){
    if(this.keywords.nativeElement.value !== ''){
      this.onSearchByKeywords(this.keywords.nativeElement.value);
    }
  }

  private onSearchByKeywords(keywords: string){
    this.isLoading = true;
    this.searchByKeywordsSub = this.paperService.getPapersByKeywords(keywords)
      .subscribe(
        response => {
          this.isLoading = false;
          if(response.data.length !== 0){
            let _papers : Paper[] = [];
            response.data.forEach(paper => { _papers.push(new Paper(paper)) });
            this.papers = [];
            this.papers.push(..._papers);
          }
        },
        err => {
          this.isLoading = false;
          this.error = err;
          setInterval(() => { this.error = null }, 5000);
        }
      )
  }

  onView(id: number){
    window.open(`${this.URL}/${this.papers[id].paperId}`);
  }

  onAreaOfResearchSelected(){
    const area = this.areaOfResearch.nativeElement.value;
    this.searchByAreaSub = this.paperService.getPapersByAreaOfResearch(area)
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

  ngOnDestroy(){
    if(this.retrievePaperSub) this.retrievePaperSub.unsubscribe();
    if(this.searchByKeywordsSub) this.searchByKeywordsSub.unsubscribe();
    if(this.searchByAreaSub) this.searchByAreaSub.unsubscribe();
  }

}
