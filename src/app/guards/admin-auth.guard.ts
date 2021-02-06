import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import decode from 'jwt-decode';
import { IAuthToken } from "../models/auth-token";

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanLoad{

    constructor(private authService: AuthService, private router: Router){}
    
    canLoad(): boolean {
        // this.authService.loggedUser.subscribe(
        //     user => {
        //         if(user.role !== 'admin'){
        //             this.router.navigate(['/login']);
        //             return false;
        //         }
        //         return true;
        //     }
        // )
        // console.log(this.authService.loggedUser.value)
        // return false;

        if(localStorage.getItem('token')){
            const userData: IAuthToken = decode(localStorage.getItem('token'));
            if(userData){
                if(userData.role === 'admin'){
                    return true;
                }
            }
        }
        this.router.navigate(['/login']);
        return false;
    }
}