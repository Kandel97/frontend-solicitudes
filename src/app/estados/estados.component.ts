import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../models/solicitud';
import { AuthService } from '../services/auth.service';
import { SolicitudService } from '../services/solicitud.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {
  uploadedFile: File;
  isAdmin: boolean= false;
  estado: boolean= false;
  private rol: string= "";
  id:string | null;
    constructor(private authService: AuthService,
    private uploadService:UploadService,
    private solicitudService:SolicitudService ) { }

  ngOnInit(): void {
    this.isAdmin= this.authService.getIsAdmin();
    console.log("llega",this.isAdmin)
    this.rol=this.isAdmin?"secretaria": "usuario";
  }


  onFileChange(event):any{
    this.uploadedFile= event.target.files;

  }

  upload(){
    let formaData= new FormData();
    formaData.append("file", this.uploadedFile[0], this.uploadedFile[0].name);
    formaData.append("codigo","123" );
    formaData.append("rol", this.rol);
    // llamar al service
    this.uploadService.uploadFile(formaData).subscribe((res) =>{
    console.log('Response', res)});
  }

  descargar(){

  }

 validar1(){
   //const est:Solicitud

  if(this.id !== null){

    //this.solicitudService.editarEstado(this.id,  est.estado )
    this.estado= true
    console.log(true)
    let bg= document.getElementById('card1');
    bg!.style.background= '#A7D2B0';

  }

  }
  alerta(){
    alert('Fichero subido con exito')

  }

  validar2(){
    /* if(this.estado == false || true){ */
    this.estado= true
    let bg2= document.getElementById('card2');
    bg2!.style.background= '#A7D2B0';

  }
  validar3(){
    let bg2= document.getElementById('card3');
    bg2!.style.background= '#A7D2B0';
  }
  validar4(){
    let bg2= document.getElementById('card4');
    bg2!.style.background= '#A7D2B0';
  }



}

