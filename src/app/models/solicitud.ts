export class Solicitud{
    _id: number;
    nombre: string;
    codigo: number;
    semestre: number;
    programa: string;
    tipo_solicitud:string;
    descripcion: string;
    correo: string = "";
    estado: boolean= false;
    archivoSecretariaUrl?: string;
    archivoUsuarioUrl?: string;
}
