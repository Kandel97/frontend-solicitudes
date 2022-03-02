import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Solicitud } from '../models/solicitud';
import { SolicitudService } from '../services/solicitud.service';
import { EstadosComponent } from '../estados/estados.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  correo: string= "";
  listSolicitudes: Solicitud []=[];
  lista: string[]= ['Recibido', 'Estudio', 'Construcción', 'Solucionado']
  seleccionado: string[]=[]
  constructor( private solicitudService: SolicitudService,
                private toastr:ToastrService,
               ) { }

  ngOnInit(): void {
    const emailTemp= sessionStorage.getItem("emailUser");
    if(emailTemp!== null && emailTemp !== undefined)
    this.correo= emailTemp;
    this.obtenerSolicitudes(this.correo);
  }

  obtenerSolicitudes(correo:string){
    this.solicitudService.getSolicitudes(correo).subscribe( data=>{

    console.log(data);
    this.listSolicitudes= data;
    }, error =>{
      console.log(error)
    }
     )
  }

  eliminarSolicitud(id:any){

    this.solicitudService.eliminarSolicitud(id).subscribe( data=>{
      this.toastr.error('La solicitud fue eliminada con exito', 'Solicitud eliminada');
      this.obtenerSolicitudes(this.correo);
      }, error =>{
        console.log(error)
      })


}
comparar() {

}

}
