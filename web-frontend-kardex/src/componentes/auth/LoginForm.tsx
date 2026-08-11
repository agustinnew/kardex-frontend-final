import { useState } from "react";
import type { FormEventHandler } from "react";
import type { LoginCredentials, UserRole } from "../../types/auth";

interface LoginFormProps {
  error?: string;
  onSubmit: (credentials: LoginCredentials) => void;
}

const roleOptions: Array<{ label: string; value: UserRole }> = [
  { label: "Profesor", value: "PROFESOR" },
  { label: "Alumno", value: "ALUMNO" },
  { label: "Administrador", value: "ADMINISTRADOR" },
];

function LoginForm({ error, onSubmit }: LoginFormProps) {
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("ALUMNO");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const normalizedCarnet = carnet.trim();

    if (!normalizedCarnet || !password || !role) {
      return;
    }

    onSubmit({
      carnet: normalizedCarnet,
      password,
      role,
    });
  };

  return (
    <form className="login-card" onSubmit={handleSubmit}>
      <img
        className="login-card__shield"
        src="/donbosco-sucre-shield.svg"
        alt="Escudo del Colegio Don Bosco Sucre"
      />
      <span className="login-card__eyebrow">Kardex académico</span>
      <h1>Iniciar sesión</h1>
      <p className="login-card__subtitle">
        Seleccione su rol e ingrese con su CI y contraseña.
      </p>

      <fieldset className="login-card__roles" aria-label="Seleccione su rol">
        {roleOptions.map((option) => (
          <label key={option.value} className="login-card__role-option">
            <input
              type="radio"
              name="role"
              value={option.value}
              checked={role === option.value}
              onChange={() => setRole(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="login-card__field">
        <label htmlFor="carnet">CI</label>
        <input
          id="carnet"
          name="carnet"
          type="text"
          value={carnet}
          onChange={(event) => setCarnet(event.target.value)}
          placeholder="Ingrese su CI"
          autoComplete="username"
          required
        />
      </div>

      <div className="login-card__field">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Ingrese su contraseña"
          autoComplete="current-password"
          required
        />
      </div>

      {error && (
        <p className="login-card__error" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      <button type="submit">Ingresar</button>
    </form>
  );
}

export default LoginForm;
