import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WareService {
  wares: any;

  constructor(private _http: HttpClient) { }

  getWares() {
    return this._http.get('https://localhost:44303/api/Ware');
  }
}
