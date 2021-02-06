import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class TokenInterceptorService implements HttpInterceptor{

    constructor(private injector: Injector){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authService = this.injector.get(AuthService);
        return authService.loggedUser.pipe(
            take(1),
            exhaustMap(user => {
                if(!user) return next.handle(req);
                if(user.token){
                    const tokenizedReq = req.clone({ setHeaders: {'Authorization': `Bearer ${user.token}`} });
                    return next.handle(tokenizedReq)
                }
            })
        )
    }
}