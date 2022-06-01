import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  createOrder(model) {
    //console.log(`https://localhost:44303/api/Order?Fio=${model.Fio}&PhoneNumber=${model.PhoneNumber}&Email=${model.Email}&WareName=s&Details=${model.detailsOrder}&File=${model.File}&WareId=40cde560-c721-492d-9f44-282d0b54ec32`);
    // let headers = new HttpHeaders({
    //   'accept': '*/*',
    //   'Content-Type': 'multipart/form-data'
    // });
    // let options = { headers: headers}
    const headers = { 'Accept': '*/*', 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryyEmKNDsBKjB7QEqu'}
    return this._http.post(`https://localhost:44303/api/Order?Fio=${model.Fio}&PhoneNumber=${model.PhoneNumber}&Email=${model.Email}&WareName=s&Details=${model.detailsOrder}&File=${model.File}&WareId=40cde560-c721-492d-9f44-282d0b54ec32`, model);
  }

  getLastOrder() {
    return this._http.get(`https://localhost:44303/api/Order/488676ac-e78c-42a8-1f46-08da3dbe2b0c?email=null`);
  }

  sendEmail(model) {
    return this._http.get(`https://localhost:44303/api/Order/${model.idOrder}?email=${model.email}`).subscribe();
  }
}
