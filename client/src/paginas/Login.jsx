import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Login.css';

const Login = ({ setActuUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8800/login", {
        us_nombre: username,
        us_contrasenia: password,
      });

      if (response && response.data) {
        const userData = response.data;

        // Manejar el inicio de sesión exitoso, por ejemplo, guardar los datos del usuario en el estado o contexto
        console.log("Usuario conectado:", userData);

        // Actualizar el mensaje de bienvenida con el nombre del usuario
        setWelcomeMessage(`¡Bienvenid@ ${userData.US_NOMBRE}!`);
        setError("");

        // Limpiar los campos de entrada al iniciar sesión correctamente
        setUsername("");
        setPassword("");

        // Guardar los datos del usuario conectado
        setLoggedInUser(userData);
      }
    } catch (error) {
      console.log("Error:", error);

      if (error.response && error.response.status === 404) {
        setError("Usuario no encontrado!");
      } else if (error.response && error.response.status === 400) {
        setError("Usuario o Contraseña incorrecta!");
      } else {
        setError("Error al intentar iniciar sesión.");
      }
    }
  };

  const handleLogout = () => {
    // Limpiar los datos del usuario conectado
    setLoggedInUser(null);
    // Limpiar el mensaje de bienvenida
    setWelcomeMessage("");
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      {error && <p>{error}</p>}
      {welcomeMessage && <p>{welcomeMessage}</p>}
      {loggedInUser ? (
        <div>
          <p>Usuario: {loggedInUser.US_NOMBRE}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/"><button type="submit">Iniciar Sesión</button></Link>
        </form>
      )}
      <p>
        ¿No tienes una cuenta? <Link to="/register">Registrate aquí!</Link>
      </p>
    </div>
  );
};

export default Login;
