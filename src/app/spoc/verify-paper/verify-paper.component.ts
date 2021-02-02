import { Component, OnInit } from '@angular/core';
import { Paper } from 'src/app/models/paper';
import { PaperService } from 'src/app/services/paper.service';

@Component({
  selector: 'app-verify-paper',
  templateUrl: './verify-paper.component.html',
  styleUrls: ['./verify-paper.component.css']
})
export class VerifyPaperComponent implements OnInit {

  constructor(
    private paperService: PaperService
  ) {}

  error: String = null;
  papers: Paper[] = [];
  isApproved: boolean = false;
  private URL = 'http://localhost:3000/api/v1/papers';
  private collegeId = "5f3f9d42b58452716c44e5eb";

  ngOnInit(): void {
    this.getUnverifiedPapers(this.collegeId);
  }

  private getUnverifiedPapers(cid: String){
    this.paperService.getUnverifiedPapersByCollegeId(cid).subscribe(
      response => {
        const _papers : Paper[] = [];
        response.data.forEach(paper => { _papers.push(new Paper(paper)) });
        this.papers = [];
        this.papers.push(..._papers);
      },
      err => {
        this.error = err;
      }
    )
  }

  onApprove(id: number){
    const paperId = this.papers[id].paperId;
    this.paperService.approvePaper(paperId)
    .subscribe(
      () => {
        this.isApproved = true;
        this.getUnverifiedPapers(this.collegeId);
        setInterval(() => { this.isApproved = false }, 2000);
      },
      err => {
        this.error = err;
      }
    )
  }

  onReject(id: number){
    const paperId = this.papers[id].paperId;
    this.paperService.approvePaper(paperId)
    .subscribe(
      () => {
        this.getUnverifiedPapers(this.collegeId);
      },
      err => {
        this.error = err;
      }
    )
  }

  onView(id: number){
    window.open(`${this.URL}/${this.papers[id].paperId}`);
  }

}
