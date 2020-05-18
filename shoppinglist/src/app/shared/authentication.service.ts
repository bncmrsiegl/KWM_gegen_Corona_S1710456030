import {Injectable} from '@angular/core';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from "rxjs/operators";
import {ShoppinglistStoreService} from "./shoppinglist-store.service";

interface User {
    result: {
        created_at: Date,
        email: string,
        id: number,
        name: string,
        updated_at: Date
    }
}

@Injectable()
export class AuthenticationService {

    private api:string = 'http://kwmgegencorona.s1710456030.student.kwmhgb.at/api/auth';

    constructor(private http: HttpClient, private sl: ShoppinglistStoreService) {
    }

    login(email: string, password: string) {
        return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
    }

    public setCurrentUserId(){
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res => {
            localStorage.setItem('userId', res.result.toString());
        })
    };

    public getCurrentUserId(){
        return Number.parseInt(localStorage.getItem('userId'));
    }

    /*public setCurrentUserRole(id: number){
        this.sl.getUserByID(id).subscribe(res => {
            localStorage.setItem('is_helper', res.is_helper.toString());
        })
    }*/

    public getCurrentUserRole(){
        return String(localStorage.getItem('is_helper'));
    }

    public setLocalStorage(token: string) {
        console.log("Storing token");
        console.log(token);
        const decodedToken = decode(token);
        console.log(decodedToken);
        console.log(decodedToken.user.id);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
    }

    logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        console.log('logged out');
    }

    public isLoggedIn() {
        if(isNotNullOrUndefined(localStorage.getItem('token'))) {
            let token : string = localStorage.getItem('token');
            //console.log(token);
            const decodedToken = decode(token);
            let expirationDate:Date = new Date(0);
            expirationDate.setUTCSeconds(decodedToken.exp);
            if(expirationDate < new Date()) {
                console.log('token expired');
                localStorage.removeItem('token');
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    isHelper(){
        const user = this.sl.getUserByID(2);
        //console.log('user: ' + user);

        const test = this.sl.getUserByID(this.getCurrentUserId())[0];
        //console.log('isHelper: ' + test);

        const role = this.getCurrentUserRole();
        //console.log('role: ' + role);
    }
}
