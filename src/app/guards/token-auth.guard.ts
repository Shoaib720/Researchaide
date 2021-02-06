import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenAuthGuard implements CanLoad{

    constructor(private authService: AuthService, private router: Router){}
    
    canLoad(): boolean {
        if(this.authService.tokenExists()){
            return true;
        }
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}