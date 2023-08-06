import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './RegistroSesion.css';

const RegistroSesion = () => {
  const [username, setUsername] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/register", {
        us_nombre: username,
        us_apellido: apellido,
        us_correo: email,
        us_contrasenia: password,
      });

      // Redirect to login page after successful registration
      window.location.href = "/login";
    } catch (err) {
      console.log(err.response.data);
      setError("Error al intentar registrar el usuario");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-heading">Registro de Usuario</h1>
        {error && (
          <p className="error-message" style={{ color: "red", fontWeight: "bold" }}>
            {error}
          </p>
        )}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido de Usuario</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="register-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              required
            />
          </div>
          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>
        <p className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí!</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistroSesion;
