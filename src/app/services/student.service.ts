import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { ErrorService } from "./error.service";

@Injectable({ providedIn: 'root' })
export class StudentService{
    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ){}

    private URL = 'http://localhost:3000/api/v1/users';

    signupStudent(student: any){
        return this.http.post<{message: String, data: String}>(`${this.URL}/student-signup`, student)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    getStudentsByCollegeId(collegeId: String){
        return this.http.get<{message: String, data: any}>(this.URL + '/students-by-college/' + collegeId)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    updateStudentData(studentId: String, data: any){
        return this.http.put<{message: String}>(this.URL + '/update-student/' + studentId, data)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }

    deleteStudent(studentId: String){
        return this.http.delete<{message: String}>(this.URL + '/student/' + studentId)
        .pipe(
            catchError(this.errorService.handleError)
        )
    }
}