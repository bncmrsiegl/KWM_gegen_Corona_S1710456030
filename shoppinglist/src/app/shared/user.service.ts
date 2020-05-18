import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {Feedback, User} from "./feedback";
import {Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private api = 'http://kwmgegencorona.s1710456030.student.kwmhgb.at/api';

    constructor(private http: HttpClient) {
    }

    getUserByID(id) {
        return this.http.get(`${this.api}/user/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    private errorHandler(error: Error | any): Observable<any> {
        return throwError(error);
    }


}
