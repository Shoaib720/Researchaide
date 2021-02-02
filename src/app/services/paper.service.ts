import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { Subject, BehaviorSubject } from "rxjs";
import { Paper } from "../models/paper";
import { ErrorService } from "./error.service";

@Injectable()

export class PaperService{

    private URL = 'http://localhost:3000/api/v1/papers';
    WAITING = 0;
    REJECTED = 1;
    APPROVED = 2;

    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ){}

    private papers: Paper[] = [
        // {
        //     paperId: '600be8a1e9034311d455101e',
        //     title: 'Test paper',
        //     keywords : [ 
        //         "AI", 
        //         "ML", 
        //         "Python"
        //     ],
        //     areaOfResearch : "Machine Learning",
        //     authors : [ 
        //         "Kashif", 
        //         "Shoaib", 
        //         "Rajkumar"
        //     ],
        //     uploadedBy : "shoaib@gmail.com",
        //     college: { cid: '5f3f9d42b58452716c44e5eb', name: 'Theem College of Engineering' },
        //     publicationDate: null,
        //     path: 'uploads/shoaib_1611393185061.pdf',
        //     status: 0
        // },
    ]

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

}