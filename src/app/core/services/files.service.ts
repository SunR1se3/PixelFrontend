import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private _http: HttpClient) { }

  saveFile(model) {
    return this._http.post('https://localhost:44303/api/File', model);
  }
}
