import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Paper } from "../models/paper";
import { ErrorService } from "./error.service";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })

export class PaperService{

    private URL = environment.backendURL + '/papers';
    
    WAITING = 0;
    REJECTED = 1;
    APPROVED = 2;

    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ){}

    public getVerifiedPapers(){
        return this.http.get<{message: String, data: Paper[]}>(this.URL)
        .pipe(
            catchError(this.errorService.handleError)
        );
    }

    public uploadPaper(form: FormData){
        return this.http.post<{message: String, data: Paper}>(`${this.URL}/upload`, form)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public getPapersByUploader(id: string){
        return this.http.get<{message: String, data: Paper[]}>(`${this.URL}/uploadedBy/${id}`)
        .pipe(
            catchError(this.errorService.handleError)
        );
    }

    public getPapersCount(){
        return this.http.get<{message: String, data: any}>(`${this.URL}/counts`)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public getPapersByKeywords(keywords: string){
        return this.http.get<{message: String, data: Paper[]}>(`${this.URL}/keywords/${keywords}`)
        .pipe(
            catchError(this.errorService.handleError)
        );
    }

    public getPapersByAreaOfResearch(area: string){
        return this.http.get<{message: String, data: Paper[]}>(`${this.URL}/area/${area}`)
        .pipe(
            catchError(this.errorService.handleError)
        );
    }

    public getUnverifiedPapersByCollegeId(cid: String){
        return this.http.get<{message: String, data: Paper[]}>(`${this.URL}/unverifiedByCollege/${cid}`)
        .pipe(
            catchError(this.errorService.handleError)
        );
    }

    public approvePaper(paperId: String){
        return this.http.put<{message: String}>(`${this.URL}/updateStatus/${paperId}`, {status: this.APPROVED}, {headers: {'Content-Type': 'application/json'}})
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public rejectPaper(paperId: String){
        return this.http.put<{message: String}>(`${this.URL}/updateStatus/${paperId}`, {status: this.REJECTED}, {headers: {'Content-Type': 'application/json'}})
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public deletePaper(paperId: string){
        return this.http.delete<{message: string}>(`${this.URL}/${paperId}`)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

}