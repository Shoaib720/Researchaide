import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { ErrorService } from "./error.service";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AdminService{

    private URL = environment.backendURL + '/users';

    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ){}

    public getAdmins(){
        return this.http.get<{message: String, data: any}>(this.URL + '/admins')
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public getUsersCount(){
        return this.http.get<{message: String, data: any}>(`${this.URL}/counts`)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public signupAdmin(admin: any){
        return this.http.post<{message: String, data: String}>(`${this.URL}/admin-signup`, admin)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public updateAdminData(adminId: String, data: any){
        return this.http.put<{message: String}>(this.URL + '/update-admin/' + adminId, data)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public deleteAdmin(adminId: String){
        return this.http.delete<{message: String}>(this.URL + '/admin/' + adminId)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    public signupFirstAdmin(admin: any){
        return this.http.post<{message: String, data: String}>(`${this.URL}/first-admin-signup`, admin)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }
}