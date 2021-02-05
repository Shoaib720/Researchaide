import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthData } from "../models/auth-data";
import { IAuthResponse } from "../models/auth-response";
import { ErrorService } from "./error.service";

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

    signupSuperUser(){}

    loginUser(credentials: { email: string, password: string }){
        this.http.post<IAuthResponse>(`${this.URL}/login`, credentials)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    logoutUser(){
        this.loggedUser.next(null);
        localStorage.removeItem('userData');
        if(this.timer){
            clearTimeout(this.timer)
        }
        this.timer = null;
        this.router.navigate(['/home']);
    }

    loginSuperUser(){}

    autoLoginUser(){
        const user: AuthData = JSON.parse(localStorage.getItem('userData'));
        if(!user){
            return;
        }
        if(user._token){
            this.loggedUser.next(user);
            const expDuration =  new Date(user._expirationDate).getTime() - new Date().getTime();
            this.autoLogoutUser(expDuration);
            if(user._role === 'admin'){
                this.router.navigate(['/admin']);
            }
            else if(user._role === 'spoc'){
                this.router.navigate(['/spoc'])
            }
            else if(user._role === 'student'){
                this.router.navigate(['/student'])
            }
        }
    }

    autoLogoutUser(duration: number){
        this.timer = setTimeout(() => { this.logoutUser }, duration);
    }

    handleAuthentication(authRes: IAuthResponse){
        let authData: AuthData = new AuthData(authRes);
        this.loggedUser.next(authData);
        localStorage.setItem('userData', JSON.stringify(authData));
        if(authData._role === 'admin'){
            this.router.navigate(['/admin']);
        }
        else if(authData._role === 'spoc'){
            this.router.navigate(['/spoc'])
        }
        else if(authData._role === 'student'){
            this.router.navigate(['/student'])
        }
        this.autoLogoutUser(authRes.expiresIn * 1000);
    }

}