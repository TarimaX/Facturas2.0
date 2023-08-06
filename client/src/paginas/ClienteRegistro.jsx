import React, { useEffect, useState } from "react";
import axios from "axios";
import InsertarCliente from "./InsertarCliente";
import UpdateCliente from "./UpdateCliente";
import dayjs from "dayjs";

const ClienteRegistro = () => {
  const [clientes, setClientes] = useState([]);
  const [showInsertar, setShowInsertar] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchAllClientes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/cliente");
        setClientes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllClientes();
  }, []);

  const handleDelete = async (cedula) => {
    try {
      await axios.delete(`http://localhost:8800/cliente/${cedula}`);
      setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.CLI_CEDULA !== cedula));
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

  const handleShowUpdate = (cedulaCliente) => {
    const selected = clientes.find((cliente) => cliente.CLI_CEDULA === cedulaCliente);
    setSelectedClient(selected);
  };

  const handleAddClient = (newClient) => {
    setClientes((prevClientes) => [...prevClientes, newClient]);
  };

  const handleUpdateClient = (updatedClient) => {
    setClientes((prevClientes) =>
      prevClientes.map((cliente) =>
        cliente.CLI_CEDULA === updatedClient.CLI_CEDULA ? updatedClient : cliente
      )
    );
  };

  return (
    <div>
      <h1>CLIENTES REGISTRADOS</h1>
      <button type="button" onClick={handleShowInsertar}>
        Añadir Cliente
      </button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Dirección</th>
            <th>Fecha de Nacimiento</th>            
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.CLI_CEDULA}>
              <td>{cliente.CLI_NOMBRE}</td>
              <td>{cliente.CLI_APELLIDO}</td>
              <td>{cliente.CLI_CEDULA}</td>
              <td>{cliente.CLI_DIRECCION}</td>
              <td>{dayjs(cliente.CLI_FECHA).format("DD/MM/YYYY")}</td>
              <td>
                <button onClick={() => handleDelete(cliente.CLI_CEDULA)}>Eliminar</button>
                <button onClick={() => handleShowUpdate(cliente.CLI_CEDULA)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showInsertar && <InsertarCliente onAddClient={handleAddClient} onClose={handleCloseInsertar} />}

      {selectedClient && (
        <UpdateCliente
          client={selectedClient}
          onUpdateClient={handleUpdateClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
};

export default ClienteRegistro;
