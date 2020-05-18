import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Feedback } from "./feedback";
import { catchError, retry } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    private api = 'http://kwmgegencorona.s1710456030.student.kwmhgb.at/api';

    constructor(private http: HttpClient) {
    }

    getFeedbackByID(id) {
        return this.http.get(`${this.api}/feedback/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    addFeedback(feedback: Feedback) {
        return this.http.post(`${this.api}/feedback`, feedback)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    private errorHandler(error: Error | any): Observable<any>{
        return throwError(error);
    }

}
