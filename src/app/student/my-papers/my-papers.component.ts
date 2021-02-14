import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Paper } from 'src/app/models/paper';
import { AuthService } from 'src/app/services/auth.service';
import { PaperService } from 'src/app/services/paper.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-papers',
  templateUrl: './my-papers.component.html',
  styleUrls: ['./my-papers.component.css']
})
export class MyPapersComponent implements OnInit, OnDestroy {

  constructor(private paperService: PaperService, private authService: AuthService) { }

  error: string = null;
  papers: Paper[] = [];
  isApproved: boolean = false;
  isLoading: boolean = false;
  private URL = environment.backendURL + '/papers';
  private paperSub: Subscription;
  private delPaperSub: Subscription;

  ngOnInit(): void {
    this.fetchPapers();
  }

  private fetchPapers(){
    this.isLoading = true;
    this.paperSub = this.paperService.getPapersByUploader(this.authService.loggedUser.value.email)
    .subscribe(
      response => {
        this.isLoading = false;
        const _papers: Paper[] = []
        response.data.forEach(paper => { _papers.push(new Paper(paper)) });
        this.papers = [];
        this.papers.push(..._papers);
      },
      err => {
        this.isLoading = false;
        this.error = err;
        setInterval(_ => {this.error = null}, 5000);
      }
    )
  }

  onView(id: number){
    window.open(`${this.URL}/${this.papers[id].paperId}`);
  }

  onDelete(id: number){
    const paperId = this.papers[id].paperId
    this.isLoading = true;
    this.delPaperSub = this.paperService.deletePaper(paperId)
    .subscribe(
      _ => {
        this.isLoading = false;
        this.fetchPapers();
      },
      err => {
        this.isLoading = false;
        this.error = err;
        setInterval(_ => {this.error = null}, 5000);
      }
    )
  }

  ngOnDestroy(){
    if(this.paperSub) this.paperSub.unsubscribe();
    if(this.delPaperSub) this.delPaperSub.unsubscribe();
  }

}
