import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentSettings } from '../components/documents/tirajirovanie/IDocumentSettings';

@Injectable({
  providedIn: 'root'
})
export class DocumentSettingsService {

  constructor(private _http: HttpClient) { }

  getDocumentSettings() {
    return this._http.get('https://localhost:44303/api/DocumentSettings');
  }

  getDocumentSettingById(id): Observable<IDocumentSettings[]> {
    return this._http.get<IDocumentSettings[]>(`https://localhost:44303/api/DocumentSettings/${id}`);
  }
}
