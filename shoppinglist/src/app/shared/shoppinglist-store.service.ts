import { Injectable } from '@angular/core';
import {Shoppinglist, User, Item, Feedback} from "./shoppinglist";

import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable()
export class ShoppinglistStoreService {

  private api = 'http://kwmgegencorona.s1710456030.student.kwmhgb.at/api';

  //shoppinglists: Shoppinglist[];
  /*constructor() {
      this.shoppinglists = [

          new Shoppinglist(1,
              "Einkaufsliste von Uli",
              new Date(2020, 5, 1),
              30.54,
              [new Item(1, "Mango", 5, 1),
                  new Item(2, "Bier", 24, 15)],
              new User(1, "Ulrike", "Siegl", "Kranzlgarten 1", "us@test.at", "us", false),
              new User(2, "Herbert", "Siegl", "Kranzlgarten 1", "hs@test.at", "hs", true)
          ),
          new Shoppinglist(2,
              "Einkaufsliste von Opa",
              new Date(2020, 4, 24),
              10.95,
              [new Item(3, "Fisch", 1, 5),
                  new Item(4, "Brot", 1, 3)],
              new User(3, "Karl", "Siegl", "Kranzlgarten 1", "ks@test.at", "ks", false),
              new User(4, "Bianca", "Siegl", "Kranzlgarten 1", "bs@test.at", "bs", true)
          )
      ];
  }*/

  constructor(private http: HttpClient) {   }

  getAll() : Observable<Array<Shoppinglist>> {
      return this.http.get(`${this.api}/lists`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id : number) : Observable<Shoppinglist> {
      return this.http.get<Shoppinglist>(`${this.api}/list/${id}`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getUserByID(id: number) : Observable<User> {
      return this.http.get<User>(`${this.api}/user/${id}`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(shoppinglist: Shoppinglist) : Observable<any> {
      return this.http.post(`${this.api}/list`, shoppinglist)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(shoppinglist: Shoppinglist) : Observable<any> {
      return this.http.put(`${this.api}/list/${shoppinglist.id}`, shoppinglist)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number) : Observable<any> {
      return this.http.delete(`${this.api}/list/${id}`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  addFeedback(feedback: Feedback, id: number) : Observable<Feedback> {
      return this.http.put(`${this.api}/feedback/${id}`, feedback).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any) : Observable<any> {
      return throwError(error);
  }
}
