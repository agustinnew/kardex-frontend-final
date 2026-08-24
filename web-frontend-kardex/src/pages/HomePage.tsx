import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import StudentKardex from "../components/student/StudentKardex";

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  if (!user) {
    return (
      <main className="app-page">
        <div className="empty-session">No existe una sesión activa.</div>
      </main>
    );
  }

  const nombreCompleto = `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`;

  return (
    <main className="app-page">
      <header className="app-header">
        <div className="app-header__brand">
          <div className="app-header__crest">DB</div>
          <div>
            <strong>Colegio Don Bosco Sucre</strong>
            <span>Sistema de Kardex Académico</span>
          </div>
        </div>

        <div className="app-header__user">
          <div>
            <strong>{nombreCompleto}</strong>
            <span>Rol: {user.rol}</span>
          </div>
          <button type="button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>

      {user.rol === "ALUMNO" ? (
        <div className="student-dashboard">
          <section className="student-profile">
            <div className="student-profile__icon">{user.nombre.charAt(0)}</div>
            <div>
              <span>Datos del estudiante</span>
              <h1>{nombreCompleto}</h1>
              <p>CI: {user.CI} · Rol: Alumno</p>
            </div>
          </section>

          <StudentKardex CI={user.CI} />
        </div>
      ) : (
        <section className="role-placeholder">
          <span>Panel de usuario</span>
          <h1>Bienvenido, {nombreCompleto}</h1>
          <p>Tu sesión está activa como {user.rol}.</p>
        </section>
      )}
    </main>
  );
}

export default HomePage;
