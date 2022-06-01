import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HronologyService {

  constructor(private _http: HttpClient) { }

  getOrderHronology(id) {
    return this._http.get(`https://localhost:44303/api/OrderHronology/${id}`);
  }

  addOrderHronology(model) {
    return this._http.post(`https://localhost:44303/api/OrderHronology?DateCreationOrder=${model.DateCreationOrder}&Production=${model.Production}&isDone=${model.isDone}&IdOrder=${model.IdOrder}`, model)
      .subscribe();
  }
}
