import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  url= 'http://localhost:3001/api/solicitudes/'

  constructor( private http:HttpClient) { }

  getSolicitudes(correo: string): Observable <any> {
    return this.http.get(`${this.url}?correo=${correo}`)
  }

  eliminarSolicitud (id:string): Observable <any> {
    return this.http.delete(this.url + id);
  }

  guardarSolicitud(solicitud:Solicitud): Observable <any>{
      return this.http.post(this.url, solicitud);
  }

  obtenerSolicitud(id:string):Observable<any>{
    return this.http.get(this.url+id);
  }

  editarSolicitud(id:string, solicitud:Solicitud):Observable <any>{
    return this.http.put(this.url + id , solicitud);
  }

  editarEstado(id:string, solicitud:Solicitud): Boolean{

    return Boolean(this.http.put(this.url+id, solicitud.estado))}

}
