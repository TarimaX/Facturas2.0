import React, { useState } from "react";
import axios from "axios";

const UpdateProveedor = ({ proveedor, onUpdateProveedor, onClose }) => {
  const [updatedProveedor, setUpdatedProveedor] = useState({
    PROVE_NOMBRE: proveedor.PROVE_NOMBRE,
    PROVE_DIRECCION: proveedor.PROVE_DIRECCION,
    PROVE_CONTACTO: proveedor.PROVE_CONTACTO,
  });

  const handleChange = (e) => {
    setUpdatedProveedor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/proveedor/${proveedor.PROVE_ID}`, updatedProveedor);
      onUpdateProveedor(updatedProveedor); // Aquí se llama a la función onUpdateProveedor
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div>
      <h1>Actualizar Proveedor</h1>
      <div>
        <label>Nombre del proveedor</label>
        <input
          type="text"
          placeholder="Nombre del proveedor"
          onChange={handleChange}
          name="PROVE_NOMBRE"
          value={updatedProveedor.PROVE_NOMBRE}
        />
      </div>
      <div>
        <label>Dirección del proveedor</label>
        <input
          type="text"
          placeholder="Dirección del proveedor"
          onChange={handleChange}
          name="PROVE_DIRECCION"
          value={updatedProveedor.PROVE_DIRECCION}
        />
      </div>
      <div>
        <label>Contacto</label>
        <input
          type="text"
          placeholder="Contacto del proveedor"
          onChange={handleChange}
          name="PROVE_CONTACTO"
          value={updatedProveedor.PROVE_CONTACTO}
        />
      </div>
      <button onClick={handleClick}>Actualizar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default UpdateProveedor;
