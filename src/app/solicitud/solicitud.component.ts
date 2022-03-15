import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud } from 'src/app/models/solicitud'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SolicitudService } from '../services/solicitud.service';
import { UploadService } from '../services/upload.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  solicitudForm: FormGroup;
  titulo = 'Crear solicitud';
  id: string | null;
  public uploadedFile: File;
  correo_usuario: string = "";
  estado_solicitud: boolean = false;
  private isAdmin: boolean = false;
  private rol: string = "";
  private solicitud: Solicitud = new Solicitud();
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private solicitudService: SolicitudService,
    private aRouter: ActivatedRoute,
    private uploadService: UploadService,
    private authService: AuthService) {
    this.solicitudForm = this.fb.group({
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      semestre: ['', Validators.required],
      programa: ['', Validators.required],
      tipo_solicitud: ['', Validators.required],
      descripcion: ['', Validators.required]

    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    const emailTemp = sessionStorage.getItem("emailUser");
    if (emailTemp !== null && emailTemp !== undefined)
      this.correo_usuario = emailTemp;

    const estado = Boolean(sessionStorage.getItem("estado"));
    this.estado_solicitud = estado
    this.esEditar();
    this.rol = this.isAdmin ? "secretaria" : "usuario";

  }

  agregarSolicitud() {

    const SOLICITUD: any = {
      nombre: this.solicitudForm.get('nombre')?.value,
      codigo: this.solicitudForm.get('codigo')?.value,
      semestre: this.solicitudForm.get('semestre')?.value,
      programa: this.solicitudForm.get('programa')?.value,
      tipo_solicitud: this.solicitudForm.get('tipo_solicitud')?.value,
      descripcion: this.solicitudForm.get('descripcion')?.value,
      correo: this.correo_usuario,
      estado: this.estado_solicitud

    }

    if (this.id !== null) {
      //editamos solicitud
      this.solicitudService.editarSolicitud(this.id, SOLICITUD).subscribe(data => {
        this.toastr.info('La solicitud fue actualizada con exito!', 'Solicitud actualizada');
        this.router.navigate(['/auth/solicitudes']);
      }, error => {
        console.log(error);
        this.solicitudForm.reset();
      }
      )
    } else {
      //agregar solicitud
      this.solicitudService.guardarSolicitud(SOLICITUD).subscribe(data => {
        this.upload(data._id);
        this.toastr.success('La solicitud fue registrada con exito!', 'Solicitud Registrada');
        this.router.navigate(['/auth/solicitudes']);
      }, error => {
        console.log(error);
        this.solicitudForm.reset();
      }
      )
    }


  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = "Editar Solicitud";
      this.solicitudService.obtenerSolicitud(this.id).subscribe(data => {
        this.solicitudForm.setValue({
          nombre: data.nombre,
          codigo: data.codigo,
          semestre: data.semestre,
          programa: data.programa,
          tipo_solicitud: data.tipo_solicitud,
          descripcion: data.descripcion

        })
      }, error => {
        console.log(error);
        this.solicitudForm.reset();
      }
      )

    }
  }

  upload(id: string) {
    let formaData = new FormData();
    formaData.append("file", this.uploadedFile[0], this.uploadedFile[0].name);
    formaData.append("codigo", this.solicitudForm.get('codigo')?.value);
    formaData.append("rol", this.rol);
    // llamar al service
    this.uploadService.uploadFile(formaData).subscribe((res: any) => {
      if (res.status === 200) {
        this.actualizarSolicitudConUrl(res.urlFile, id);
      }
    });
  }

  actualizarSolicitudConUrl(urlFile: string, id: string) {
    this.solicitud.archivoUsuarioUrl = urlFile;
    this.solicitudService.editarSolicitudUrlArchivo(id, this.solicitud).subscribe((data) => {
    })
  }

  onFileChange(event): any {
    this.uploadedFile = event.target.files;

  }
}
