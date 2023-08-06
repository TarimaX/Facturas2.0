import React, { useState } from "react";
import axios from "axios";


const InsertarCliente = ({ onAddClient, onClose }) => {
  const [cliente, setCliente] = useState({
    CLI_NOMBRE: "",
    CLI_APELLIDO: "",
    CLI_CEDULA: "",
    CLI_DIRECCION: "",
    CLI_FECHA: "",
  });

  const [error, setError] = useState(null); // Estado para el mensaje de error

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar que el campo de cédula solo contenga números y tenga máximo 10 caracteres
    if (name === "CLI_CEDULA") {
      if (!/^\d{0,10}$/.test(value)) {
        setError("La cédula debe contener solo números y tener máximo 10 caracteres.");
      } else {
        setError(null);
      }
    }

    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !cliente.CLI_NOMBRE ||
      !cliente.CLI_APELLIDO ||
      !cliente.CLI_CEDULA ||
      !cliente.CLI_DIRECCION ||
      !cliente.CLI_FECHA
    ) {
      setError("Por favor, completa todos los campos.");
      return false;
    }

    setError(null); // Si no hay errores, se reinicia el mensaje de error
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de hacer la solicitud POST
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://localhost:8800/cliente", cliente);
      onAddClient(cliente); // Añadir el nuevo cliente al estado de clientes en el componente Cliente
      onClose();
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("El cliente con la cédula proporcionada ya se encuentra registrado.");
      } else {
        setError("Error al agregar el cliente. Inténtalo de nuevo más tarde.");
      }
    }
  };

  return (
    <div className="modal-container" id="modal">
      <div className="modal-content">
        <h1>Insertar un nuevo cliente</h1>
        <div className="form-group">
          <label>Nombre del cliente</label>
          <input
            type="text"
            placeholder="Nombre del cliente"
            onChange={handleChange}
            name="CLI_NOMBRE"
          />
        </div>
        <div className="form-group">
          <label>Apellido del cliente</label>
          <input
            type="text"
            placeholder="Apellido del cliente"
            onChange={handleChange}
            name="CLI_APELLIDO"
          />
        </div>
        <div className="form-group">
          <label>Número de cédula</label>
          <input
            type="text"
            placeholder="Número de cédula"
            onChange={handleChange}
            name="CLI_CEDULA"
          />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            placeholder="Dirección del cliente"
            onChange={handleChange}
            name="CLI_DIRECCION"
          />
        </div>
        <div className="form-group">
          <label>Fecha de nacimiento</label>
          <input type="date" onChange={handleChange} name="CLI_FECHA" />
        </div>
        <button onClick={handleClick} className="add-button">
          Añadir
        </button>
        <button onClick={onClose} className="cancel-button">
          Cancelar
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default InsertarCliente;
