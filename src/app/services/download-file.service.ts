import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor( private http:HttpClient) { }

  downloadFile(urlFile: string): Observable<any> {
    let urlApi= 'http://localhost:3001/api/download';
    const headers = {
        'urlFile' : urlFile,
    };
    return this.http.get(urlApi, {responseType: 'blob', headers: headers});
  }

}
