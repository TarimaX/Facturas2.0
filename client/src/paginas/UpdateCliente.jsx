import React, { useState } from "react";
import axios from "axios";

const UpdateCliente = ({ client, onUpdateClient, onClose }) => {
  const [updatedClient, setUpdatedClient] = useState({
    CLI_NOMBRE: client.CLI_NOMBRE,
    CLI_APELLIDO: client.CLI_APELLIDO,
    CLI_CEDULA: client.CLI_CEDULA,
    CLI_DIRECCION: client.CLI_DIRECCION,
    CLI_FECHA: client.CLI_FECHA,      
  });

  const handleChange = (e) => {
    setUpdatedClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/cliente/${client.CLI_CEDULA}`, updatedClient);
      onUpdateClient(updatedClient); // Notificar al componente Cliente sobre la actualización
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Actualizar Cliente</h1>
      <div>
        <label>Nombre del cliente</label>
        <input
          type="text"
          placeholder="Nombre del cliente"
          onChange={handleChange}
          name="CLI_NOMBRE"
          value={updatedClient.CLI_NOMBRE}
        />
      </div>
      <div>
        <label>Apellido</label>
        <input
          type="text"
          placeholder="Apellido"
          onChange={handleChange}
          name="CLI_APELLIDO"
          value={updatedClient.CLI_APELLIDO}
        />
      </div>
      <div>
        <label>Cédula</label>
        <input
          type="text"
          placeholder="Cédula"
          onChange={handleChange}
          name="CLI_CEDULA"
          value={updatedClient.CLI_CEDULA}
          disabled
        />
      </div>
      <div>
        <label>Dirección</label>
        <input
          type="text"
          placeholder="Dirección"
          onChange={handleChange}
          name="CLI_DIRECCION"
          value={updatedClient.CLI_DIRECCION}
        />
      </div>
      <div>
        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          onChange={handleChange}
          name="CLI_FECHA"
          value={updatedClient.CLI_FECHA}
        />
      </div>
      <button onClick={handleClick}>Actualizar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default UpdateCliente;
