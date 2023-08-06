import React from 'react';
import Base from '../paginas/Images/base.png';
import Factu from '../paginas/Images/factu.png';
import Reloj from '../paginas/Images/reloj.png';
import './Home.css';

const Home = () => {
  return (
    <div className="dashboard-container1">
        <div className="header">
            <h1 className="welcome-heading">Bienvenido a Mi Tienda</h1>
        </div>
        <h3>Te ayuda con el control de tus ventas en tu negocio, emprendimiento o empresa</h3>
        <div className="content">
            <div className="text-container">
                <p>
                    Nuestro sistema de facturación te permite gestionar de manera eficiente tus clientes y productos.
                    Con nuestra plataforma, podrás mantener un registro detallado de tus transacciones, generar facturas
                    profesionales y gestionar inventarios de manera sencilla.
                </p>
            </div>
            <div className="add">
                <div className="add-fact">
                    <p>Mi Tienda te permite generar una factura facil y rapido unicamete ingresa tus productos y nos encargamos de darte los datos necesarios.</p>
                    <img src={Factu} alt="factura" />
                </div>
                <div className="add-base">
                    <p>Mi Tienda te permite gestionar tu produtos y tener un control total de tu stock, conociendo lo que entra y sale de tu negocio.</p>
                    <br />
                    <img src={Base} alt="Mi base"></img>
                </div>
                <div className="add-time">
                    <p>Mi Tienda te ahorra tiempo al momento de tener una factura con todo lo necesario para entregar al cliente.</p>
                    <br />
                    <img src={Reloj} alt="Mi Reloj" />
                </div>
            </div>
        </div>
    </div>
);
};

export default Home;
