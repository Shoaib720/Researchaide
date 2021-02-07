import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthData } from "../models/auth-data";
import { IAuthToken } from "../models/auth-token";
import { ErrorService } from "./error.service";
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService{

    private URL = "http://localhost:3000/api/v1/users"
    loggedUser = new BehaviorSubject<AuthData>(null);
    private timer: any;
    
    constructor(
        private http: HttpClient,
        private errorService: ErrorService,
        private router: Router
    ){}

    tokenExists() {
        if(localStorage.getItem('token')) return true;
        else return false;
    }

    signupSuperUser(){}

    loginUser(credentials: { email: string, password: string }){
        return this.http.post<{data: string}>(`${this.URL}/login`, credentials)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    logoutUser(){
        this.loggedUser.next(null);
        localStorage.removeItem('token');
        if(this.timer){
            clearTimeout(this.timer)
        }
        this.timer = null;
        this.router.navigate(['/login']);
    }

    loginSuperUser(){}

    autoLoginUser(){
        if(localStorage.getItem('token')){
            const token: IAuthToken = jwt_decode(localStorage.getItem('token'));
            const user: AuthData = new AuthData(token, localStorage.getItem('token'));
            if(!token){
                this.router.navigate(['/home']);
            }
            if(user.token){
                this.loggedUser.next(user);
                const expDuration =  new Date(user.expirationDate).getTime() - new Date().getTime();
                this.autoLogoutUser(expDuration);
                if(user.role === 'admin'){
                    this.router.navigate(['/admin']);
                }
                else if(user.role === 'spoc'){
                    this.router.navigate(['/spoc'])
                }
                else if(user.role === 'student'){
                    this.router.navigate(['/student'])
                }
            }
        }
    }

    autoLogoutUser(duration: number){
        this.timer = setTimeout(() => { this.logoutUser() }, duration);
    }

    handleAuthentication(token: {data: string}){
        const userData: IAuthToken = jwt_decode(token.data);
        let authData: AuthData = new AuthData(userData, token.data);
        this.loggedUser.next(authData);
        localStorage.setItem('token', token.data);
        if(authData.role === 'admin'){
            this.router.navigate(['/admin']);
        }
        else if(authData.role === 'spoc'){
            this.router.navigate(['/spoc'])
        }
        else if(authData.role === 'student'){
            this.router.navigate(['/student'])
        }
        this.autoLogoutUser(userData.expiresIn * 1000);
    }

    changePassword(credentials: {email: string, oldPassword: string, newPassword: string}){
        return this.http.put<{message: string}>(`${this.URL}/update-password`, credentials)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

}