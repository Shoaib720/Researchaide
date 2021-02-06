import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ErrorService{
    constructor(){}

    handleError(error: HttpErrorResponse){
        var errorMessage: String = null;
        if(error.error instanceof ErrorEvent){
            errorMessage = `Client side error: ${error.error}`;
        }
        else{
            switch(error.error.message){
                case 'INTERNAL_SERVER_ERROR':
                    errorMessage = `${error.message}, Please try again later!`;
                    break;
                case 'NOT_FOUND':
                    errorMessage = "The resource you are trying to access is not found!";
                    break;
                case 'ROUTE_NOT_FOUND':
                    errorMessage = "The route you are trying to access is not found!";
                    break;
                case 'AUTHENTICATION_FAILED':
                    errorMessage = "Authentication failed. Try logging in, if the problem still persists contact our technical support team!";
                    break;
                case 'ACCESS_DENIED':
                    errorMessage = "You don't have permissions to access this resource. Try logging in, if the problem still persists contact our technical support team!";
                    break;
                case 'EMAIL_ALREADY_EXISTS':
                    errorMessage = "This email already exists!";
                    break;
                case 'USER_FIELD_MISSING':
                    errorMessage = "Unable to verifiy the user type. If the problem still persists contact our technical support team!";
                    break;
                case 'AUTHORIZATION_HEADER_MISSING':
                    errorMessage = "Authorization failed: Authorization header is missing. Try logging in, if the problem still persists contact our technical support team!";
                    break;
                case 'JWT_TOKEN_MISSING':
                    errorMessage = "Authorization failed: jwt token is missing. Try logging in, if the problem still persists contact our technical support team!";
                    break;
                default:
                    errorMessage = "Unknown error occured. Please try again later!";
                    break;
            }
        }
        return throwError(errorMessage);
    }
}