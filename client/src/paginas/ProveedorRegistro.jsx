import React, { useEffect, useState } from "react";
import axios from "axios";
import InsertarProveedor from "./InsertarProveedor";
import UpdateProveedor from "./UpdateProveedor";

const ProveedorRegistro = () => {
  const [proveedores, setProveedores] = useState([]);
  const [showInsertar, setShowInsertar] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  useEffect(() => {
    const fetchAllProveedores = async () => {
      try {
        const res = await axios.get("http://localhost:8800/proveedor");
        setProveedores(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProveedores();
  }, []);

  const handleDelete = async (proveedorId) => {
    try {
      await axios.delete(`http://localhost:8800/proveedor/${proveedorId}`);
      setProveedores((prevProveedores) => prevProveedores.filter((proveedor) => proveedor.PROVE_ID !== proveedorId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowInsertar = (e) => {
    e.preventDefault();
    setShowInsertar(true);
  };

  const handleCloseInsertar = () => {
    setShowInsertar(false);
  };

  const handleShowUpdate = (proveedorId) => {
    const selected = proveedores.find((proveedor) => proveedor.PROVE_ID === proveedorId);
    setSelectedProveedor(selected);
  };

  const handleAddProveedor = (newProveedor) => {
    setProveedores((prevProveedores) => [...prevProveedores, newProveedor]);
  };

  const handleUpdateProveedor = (updatedProveedor) => {
    setProveedores((prevProveedores) =>
      prevProveedores.map((proveedor) =>
        proveedor.PROVE_ID === updatedProveedor.PROVE_ID ? updatedProveedor : proveedor
      )
    );
  };

  return (
    <div>
      <h1>PROVEEDORES REGISTRADOS</h1>
      <button type="button" onClick={handleShowInsertar}>
        Añadir Proveedor
      </button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.PROVE_ID}>
              <td>{proveedor.PROVE_NOMBRE}</td>
              <td>{proveedor.PROVE_DIRECCION}</td>
              <td>{proveedor.PROVE_CONTACTO}</td>
              <td>
                <button onClick={() => handleDelete(proveedor.PROVE_ID)}>Eliminar</button>
                <button onClick={() => handleShowUpdate(proveedor.PROVE_ID)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showInsertar && <InsertarProveedor onAddProveedor={handleAddProveedor} onClose={handleCloseInsertar} />}

      {selectedProveedor && (
        <UpdateProveedor
          proveedor={selectedProveedor}
          onUpdateProveedor={handleUpdateProveedor}
          onClose={() => setSelectedProveedor(null)}
        />
      )}
    </div>
  );
};

export default ProveedorRegistro;
