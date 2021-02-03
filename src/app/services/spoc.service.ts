import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { ErrorService } from "./error.service";

@Injectable({ providedIn: 'root' })
export class SpocService{
    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ){}

    private URL = 'http://localhost:3000/api/v1/users';

    signupSpoc(spoc: any){
        return this.http.post<{message: String, data: String}>(`${this.URL}/spoc-signup`, spoc)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    getSpocs(){
        return this.http.get<{message: String, data: any}>(this.URL + '/spocs')
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    updateSpocData(spocId: String, data: any){
        return this.http.put<{message: String}>(this.URL + '/update-spoc/' + spocId, data)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    deleteSpoc(spocId: String){
        return this.http.delete<{message: String}>(this.URL + '/spoc/' + spocId)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }
}