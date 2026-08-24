export type UserRole = "ADMIN" | "PROFESOR" | "ALUMNO";

export interface User {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  CI: string;
  rol: UserRole;
}

export interface UserRecord extends User {
  password: string;
}

export interface LoginCredentials {
  CI: string;
  password: string;
  rol: UserRole;
}
