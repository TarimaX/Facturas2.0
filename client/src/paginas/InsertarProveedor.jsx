import React, { useState } from "react";
import axios from "axios";

const InsertarProveedor = ({ onAddProveedor, onClose }) => {
  const [proveedor, setProveedor] = useState({
    PROVE_NOMBRE: "",
    PROVE_DIRECCION: "",
    PROVE_CONTACTO: "",
  });

  const [error, setError] = useState(null); // Estado para el mensaje de error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !proveedor.PROVE_NOMBRE ||
      !proveedor.PROVE_DIRECCION ||
      !proveedor.PROVE_CONTACTO
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
      await axios.post("http://localhost:8800/proveedor", proveedor);
      onAddProveedor(proveedor); // Añadir el nuevo proveedor al estado de proveedores en el componente ClienteRegistro
      onClose();
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("El proveedor ya está registrado.");
      } else {
        setError("Error al agregar el proveedor. Inténtalo de nuevo más tarde.");
      }
    }
  };

  return (
    <div className="modal-container" id="modal">
      <div className="modal-content">
        <h1>Insertar un nuevo proveedor</h1>
        <div className="form-group">
          <label>Nombre del proveedor</label>
          <input
            type="text"
            placeholder="Nombre del proveedor"
            onChange={handleChange}
            name="PROVE_NOMBRE"
          />
        </div>
        <div className="form-group">
          <label>Dirección del proveedor</label>
          <input
            type="text"
            placeholder="Dirección del proveedor"
            onChange={handleChange}
            name="PROVE_DIRECCION"
          />
        </div>
        <div className="form-group">
          <label>Contacto</label>
          <input
            type="text"
            placeholder="Contacto del proveedor"
            onChange={handleChange}
            name="PROVE_CONTACTO"
          />
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

export default InsertarProveedor;
