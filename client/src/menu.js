import React from "react";
import { Link } from "react-router-dom";

export default function Menu(){
    return(
        <div>
            <Link to="/login">Login</Link>
            <Link to="/inventario">Ver Inventario</Link>
            <Link to="/cliente">Ver Clientes</Link>            
            <Link to="/proveedor">Ver Proveedor</Link>            
            <Link to="/facturas">Ver Facturas</Link>
            
            
        </div>
    )
}