import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorDocumentService {

  constructor(private _http: HttpClient) { }

  getPriceDocument(model) {   
    //return `https://localhost:44303/api/CalculatorDocuments?IdSize=${size}&IdMaterial=${material}&IdDensity=${density}&IdColor=${color}`;
    return this._http.post(`https://localhost:44303/api/CalculatorDocuments?IdSize=${model.IdSize}&IdMaterial=${model.IdMaterial}&IdDensity=${model.IdDensity}&IdColor=${model.IdColor}&Count=${model.Count}&Deadline=${model.Deadline}`, model);
    //const body = {size: size, material: material, density: density, color: color}
    //return this._http.post('https://localhost:44303/api/CalculatorDocuments', body);

  }
}
