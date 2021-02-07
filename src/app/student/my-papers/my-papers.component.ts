import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Paper } from 'src/app/models/paper';
import { AuthService } from 'src/app/services/auth.service';
import { PaperService } from 'src/app/services/paper.service';

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
  private URL = 'http://localhost:3000/api/v1/papers';
  private collegeId = "5f3f9d42b58452716c44e5eb";
  private paperSub: Subscription;

  ngOnInit(): void {
    this.paperSub = this.paperService.getPapersByUploader(this.authService.loggedUser.value.email)
    .subscribe(response => {
      const _papers: Paper[] = []
      response.data.forEach(paper => { _papers.push(new Paper(paper)), console.log(paper) });
      this.papers = [];
      console.log(this.papers)
      this.papers.push(..._papers);
    })
  }

  onView(id: number){
    window.open(`${this.URL}/${this.papers[id].paperId}`);
  }

  onDelete(id: number){}

  ngOnDestroy(){
    if(this.paperSub) this.paperSub.unsubscribe();
  }

}
