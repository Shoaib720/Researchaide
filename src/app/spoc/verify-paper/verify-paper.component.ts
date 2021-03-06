import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Paper } from 'src/app/models/paper';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { PaperService } from 'src/app/services/paper.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-verify-paper',
  templateUrl: './verify-paper.component.html',
  styleUrls: ['./verify-paper.component.css']
})
export class VerifyPaperComponent implements OnInit, OnDestroy {

  constructor(
    private paperService: PaperService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  error: String = null;
  papers: Paper[] = [];
  isLoading = false;
  isApproved: boolean = false;
  private URL = environment.backendURL + '/papers';
  private modalSub: Subscription;

  ngOnInit(): void {
    this.getUnverifiedPapers(this.authService.loggedUser.value.cid);
  }

  private getUnverifiedPapers(cid: String){
    this.isLoading = true;
    this.paperService.getUnverifiedPapersByCollegeId(cid).subscribe(
      response => {
        this.isLoading = false;
        const _papers : Paper[] = [];
        response.data.forEach(paper => { _papers.push(new Paper(paper)) });
        this.papers = [];
        this.papers.push(..._papers);
      },
      err => {
        this.isLoading = false;
        this.error = err;
      }
    )
  }

  onApprove(id: number){
    const paperId = this.papers[id].paperId;
    this.isLoading = true;
    this.paperService.approvePaper(paperId)
    .subscribe(
      () => {
        this.isLoading = false;
        this.isApproved = true;
        this.getUnverifiedPapers(this.authService.loggedUser.value.cid);
        setInterval(() => { this.isApproved = false }, 2000);
      },
      err => {
        this.isLoading = false;
        this.error = err;
      }
    )
  }

  onReject(id: number){
    this.modalSub = this.modalService.OpenConfirmCancelModal(ModalService.REJECT_PAPER_MESSAGE, true)
    .subscribe(result => {
      if(result){
        const paperId = this.papers[id].paperId;
        this.isLoading = true;
        this.paperService.rejectPaper(paperId)
        .subscribe(
          () => {
            this.isLoading = false;
            this.getUnverifiedPapers(this.authService.loggedUser.value.cid);
          },
          err => {
            this.isLoading = false;
            this.error = err;
          }
        )
      }
    })
  }

  onView(id: number){
    window.open(`${this.URL}/${this.papers[id].paperId}`);
  }

  ngOnDestroy(){
    if(this.modalSub) this.modalSub.unsubscribe();
  }

}
