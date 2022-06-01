import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private _http: HttpClient) { }

  getOffers() {
    return this._http.get('https://localhost:44303/api/OfferMainPage');
  }
}
