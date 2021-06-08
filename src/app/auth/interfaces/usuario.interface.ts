
export interface UsuarioResponse {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    fechaReg: Date;
}

export interface Usuario {
    nombre: string;
    email: string;
    fechaLogin: Date;
    fechaRegistro?: Date;
}
