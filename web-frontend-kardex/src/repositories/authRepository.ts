import initialUsers from "../data/users.json";
import { storageService } from "../services/storageService";
import type { LoginCredentials, User, UserRecord } from "../types/auth";

const SESSION_KEY = "app_session";
const users = initialUsers as UserRecord[];

export const authRepository = {
  login(credentials: LoginCredentials): User | null {
    const foundUser = users.find(
      (user) =>
        user.CI === credentials.CI &&
        user.password === credentials.password &&
        user.rol === credentials.rol
    );

    if (!foundUser) return null;

    const sessionUser: User = {
      id: foundUser.id,
      nombre: foundUser.nombre,
      apellidoPaterno: foundUser.apellidoPaterno,
      apellidoMaterno: foundUser.apellidoMaterno,
      CI: foundUser.CI,
      rol: foundUser.rol,
    };

    storageService.set<User>(SESSION_KEY, sessionUser);
    return sessionUser;
  },

  getCurrentUser(): User | null {
    return storageService.get<User>(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  logout(): void {
    storageService.remove(SESSION_KEY);
  },
};
