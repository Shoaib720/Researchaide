import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { ErrorService } from "./error.service";

@Injectable({ providedIn: 'root' })
export class AdminService{

    private PapersURL = 'http://localhost:3000/api/v1/papers';
    private UsersURL = 'http://localhost:3000/api/v1/users';
    private CollegesURL = 'http://localhost:3000/api/v1/colleges';

    WAITING = 0;
    REJECTED = 1;
    APPROVED = 2;

    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ){}

    public getPapersCount(){
        return this.http.get<{message: String, data: any}>(`${this.PapersURL}/counts`)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public getUsersCount(){
        return this.http.get<{message: String, data: any}>(`${this.UsersURL}/counts`)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public getCollegesCount(){
        return this.http.get<{message: String, data: any}>(`${this.CollegesURL}/counts`)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }
}