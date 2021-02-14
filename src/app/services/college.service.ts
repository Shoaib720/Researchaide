import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { ErrorService } from "./error.service";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class CollegeService{

    private URL = environment.backendURL + "/colleges"

    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ){}

    public registerCollege(college: any){
        return this.http.post<{message: string, data: string}>(`${this.URL}/`, college)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public updateCollegeData(cid: string, data: string){
        return this.http.put<{message: String}>(this.URL + '/update/' + cid, data)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public getColleges(){
        return this.http.get<{message: String, data: any}>(`${this.URL}/`)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public getCollegesCount(){
        return this.http.get<{message: String, data: any}>(`${this.URL}/counts`)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public deleteCollege(cid: string){
        return this.http.delete<{message: string}>(this.URL + '/college/' + cid)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }
}