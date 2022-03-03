import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from '../models/solicitud';
import { AuthService } from '../services/auth.service';
import { DownloadFileService } from '../services/download-file.service';
import { SolicitudService } from '../services/solicitud.service';
import { UploadService } from '../services/upload.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {
  uploadedFile: File;
  isAdmin: boolean = false;
  estado: boolean = false;
  private rol: string = "";
  id: string | null;
  private solicitud: Solicitud;
  constructor(private authService: AuthService,
    private uploadService: UploadService,
    private downloadFileService: DownloadFileService,
    private aRouter: ActivatedRoute,
    private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.solicitudService.obtenerSolicitud(this.id !== null ? this.id : "").subscribe((data) => this.solicitud = data);
    this.isAdmin = this.authService.getIsAdmin();
    this.rol = this.isAdmin ? "secretaria" : "usuario";
  }


  onFileChange(event): any {
    this.uploadedFile = event.target.files;

  }

  upload() {
    let formaData = new FormData();
    formaData.append("file", this.uploadedFile[0], this.uploadedFile[0].name);
    formaData.append("codigo", this.solicitud.codigo.toString());
    formaData.append("rol", this.rol);
    // llamar al service
    this.uploadService.uploadFile(formaData).subscribe((res: any) => {
      if (res.status === 200) {
        this.alerta();
        this.actualizarSolicitudConUrl(res.urlFile);
      }
    });
  }

  descargar() {
    this.downloadFileService.downloadFile(this.solicitud.archivoSecretariaUrl !== undefined ? this.solicitud.archivoSecretariaUrl : '').subscribe((data) => {
      let download = window.URL.createObjectURL(data);
      saveAs(download);
      console.log("descargado ", download);
    })
  }

  actualizarSolicitudConUrl(urlFile: string) {
    this.solicitud.archivoSecretariaUrl = urlFile;
    this.solicitudService.editarSolicitudUrlArchivo(this.id !== null ? this.id : "", this.solicitud).subscribe((data) => {
      console.log("dataAct: ", data);
    })
  }

  validar1() {
    //const est:Solicitud

    if (this.id !== null) {

      //this.solicitudService.editarEstado(this.id,  est.estado )
      this.estado = true
      let bg = document.getElementById('card1');
      bg!.style.background = '#A7D2B0';

    }

  }
  alerta() {
    alert('Fichero subido con exito')

  }

  validar2() {
    /* if(this.estado == false || true){ */
    this.estado = true
    let bg2 = document.getElementById('card2');
    bg2!.style.background = '#A7D2B0';

  }
  validar3() {
    let bg2 = document.getElementById('card3');
    bg2!.style.background = '#A7D2B0';
  }
  validar4() {
    let bg2 = document.getElementById('card4');
    bg2!.style.background = '#A7D2B0';
  }



}

