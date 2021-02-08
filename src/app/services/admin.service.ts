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

    public getAdmins(){
        return this.http.get<{message: String, data: any}>(this.UsersURL + '/admins')
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

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

    public signupAdmin(admin: any){
        return this.http.post<{message: String, data: String}>(`${this.UsersURL}/admin-signup`, admin)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public updateAdminData(adminId: String, data: any){
        return this.http.put<{message: String}>(this.UsersURL + '/update-admin/' + adminId, data)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public deleteAdmin(adminId: String){
        return this.http.delete<{message: String}>(this.UsersURL + '/admin/' + adminId)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public signupFirstAdmin(admin: any){
        return this.http.post<{message: String, data: String}>(`${this.UsersURL}/first-admin-signup`, admin)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }
}