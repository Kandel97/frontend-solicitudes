import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Solicitud } from '../models/solicitud';
import { SolicitudService } from '../services/solicitud.service';
import { EstadosComponent } from '../estados/estados.component';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  correo: string = "";
  listSolicitudes: Solicitud[] = [];
  lista: string[] = ['Recibido', 'Estudio', 'Construcción', 'Solucionado']
  seleccionado: string[] = []
  isAdmin: boolean = false;
  constructor(private solicitudService: SolicitudService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
    const emailTemp = sessionStorage.getItem("emailUser");
    if (emailTemp !== null && emailTemp !== undefined)
      this.correo = emailTemp;
    if (this.isAdmin) {
      this.obtenerSolicitudes();
    } else {
      this.obtenerSolicitudesPorEmail(this.correo);
    }
  }

  obtenerSolicitudes() {
    this.solicitudService.getSolicitudes().subscribe(data => {
      this.listSolicitudes = data;
    }, error => {
      console.log(error)
    }
    )
  }

  obtenerSolicitudesPorEmail(correo: string) {
    this.solicitudService.getSolicitudesByEmail(correo).subscribe(data => {
      this.listSolicitudes = data;
    }, error => {
      console.log(error)
    }
    )
  }

  eliminarSolicitud(id: any) {

    this.solicitudService.eliminarSolicitud(id).subscribe(data => {
      this.toastr.error('La solicitud fue eliminada con exito', 'Solicitud eliminada');
      this.obtenerSolicitudesPorEmail(this.correo);
    }, error => {
      console.log(error)
    })


  }
  comparar() {

  }

  getSolicitud(idSolicitud: number){
    this.router.navigate(['/auth/estados', idSolicitud]);
  }

}
