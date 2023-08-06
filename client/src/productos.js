import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './products.css';

export default function Productos() {

    const [actualizar, setActualizar] = useState(false);
    const [insertar, setInsertar] = useState(false);
    const [editar, setEditar] = useState(false);
    const [crearCategoria, setCrearCategoria] = useState(false);
    const [actualizarCategorias, setActualizarCategorias] = useState(false);
    const [categorias, setCategorias] = useState([])
    const [inventario, setInventario] = useState([]);
    const [newDat, setNewDat] = useState({});
    const [upDat, setUpDat] = useState({});
    const [newCat, setNewCat] = useState({});

    useEffect(() => {
        setActualizarCategorias(false)
        Axios.get('http://localhost:8800/categoria')
            .then(res => setCategorias(res.data))
            .catch(err => console.log(err, "Fallo en consulta de categorías."))

        console.log(categorias)
    }, [actualizarCategorias])
    useEffect(() => {
        setActualizar(false);
        Axios.get('http://localhost:8800/producto')
            .then(res => { setInventario(res.data); console.log("YAY") })
            .catch(err => console.log(err, "Fallo en consulta de oroductos."))
    }, [actualizar])

    const handleInsert = (e) => {
        setNewDat((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCatInsert = (e) => {

        setNewCat((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = (e) => {
        setUpDat((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const prodRegis = async (e) => {
        e.preventDefault();
        console.log(newDat)
        await Axios.post("http://localhost:8800/producto", newDat).then(res => { console.log(res); setInsertar(false); setActualizar(true) })
            .catch(err => console.log(err, "Carga fallida"));
    }
    const catRegis = (e) => {
        e.preventDefault();
        console.log(newCat)
        Axios.post("http://localhost:8800/categoria", newCat).then(res => { console.log("FUNCIONÓ"); setCrearCategoria(false); setActualizarCategorias(true) })
            .catch(err => console.log(err, "Carga fallida"));
    }

    const elim = async (id, bool) => {
        console.log(bool)
        await Axios.put(`http://localhost:8800/producto/${id}/oos`).then(res => { console.log(res); setActualizar(true) })
            .catch(err => console.log(err, "No se pudo descontinuar el producto."));
    }
    const deselim = async (id, bool) => {
        console.log(bool)
        await Axios.put(`http://localhost:8800/producto/${id}/os`).then(res => { console.log(res); setActualizar(true) })
            .catch(err => console.log(err, "No se pudo descontinuar el producto."));
    }

    const update = async (id) => {
        await Axios.put(`http://localhost:8800/producto/${id}`, upDat).then(res => { console.log(res); setEditar(false); setActualizar(true) })
            .catch(err => console.log(err, "No se pudo actualizar el producto."));
    }

    const getIDCAT = (idcat) => {
        const cati = categorias.find((p) => p.ID_CATEGORIA === idcat);
        console.log(cati)
        return cati.CATEGORIA;
    }

    return (
        <div className="products-page">
            <br/>
            <h1>Productos</h1>
            <div className="show-products">
                <div className="product-names">

                    <div className="name">PRODUCTO</div>
                    <div className="name">CATEGORIA</div>
                    <div className="name">PRECIO</div>
                    <div className="name">STOCK</div>
                    <div className="name">ACCIONES  </div>

                </div>
                {inventario.map(prod => (
                    <div key={prod.PRO_ID} className="product-card">
                        <div className="attribute">{prod.PRO_NOMBRE}</div>
                        <div className="attribute">{() => getIDCAT(prod.ID_CATEGORIA).CATEGORIA}</div>
                        <div className="attribute">{prod.PRO_PRECIO}</div>
                        {prod.ONSTOCK ? <div className="attribute">{prod.PRO_STOCK}</div> : <div className="attribute">OUT OF STOCK</div>}

                        <div className="attribute">
                            {prod.ONSTOCK ? <button onClick={() => { setEditar(true); setUpDat(prod); }}>Editar</button> : null}
                            {prod.ONSTOCK ? <button onClick={() => elim(prod.PRO_ID)}>Descontinuar</button>
                                : <button onClick={() => deselim(prod.PRO_ID)}>Reinsertar</button>}
                        </div>
                    </div>
                ))
                }
            </div>
            <button onClick={() => setInsertar(true)}>Añadir Producto</button>
            <div className="Insert-products">
                {insertar &&
                    <div className="insert-p">
                        <h2>Insertar Producto</h2>
                        <div className="form-column">
                            <select id="catego" onChange={handleInsert} name="ID_CATEGORIA">
                                <option value="" disabled selected>Selecciona una categoría</option>
                                {categorias.map(cate => (
                                    <option value={cate.ID_CATEGORIA} key={cate.ID_CATEGORIA}>{cate.CATEGORIA}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-column">
                            <button className="new-category-button" onClick={() => { if (!crearCategoria) setCrearCategoria(true) }}>+ Nueva categoría</button>
                        </div>
                        <div className="form-column">
                            <input placeholder="Nombre" id="nombre" type="text" name="PRO_NOMBRE" onChange={handleInsert} />
                        </div>
                        <div className="form-column">
                            <input placeholder="Precio" id="precio" type="number" name="PRO_PRECIO" onChange={handleInsert} min="0" />
                        </div>
                        <div className="button-container">
                            <button className="add-button" onClick={prodRegis}>Añadir</button>
                            <button className="cancel-button" onClick={() => { setInsertar(false) }}>Cancelar</button>
                        </div>
                    </div>


                }
                {crearCategoria &&
                    <div className="insert-c">
                        <h2>Agregar Categoría</h2>
                        <div className="form-column">
                            <input placeholder="Categoría" id="categoria" name="CATEGORIA" onChange={handleCatInsert} required/>
                        </div>
                        <div className="form-column">
                            <input placeholder="Descripción" id="descripcion" name="DESCRIPCION" onChange={handleCatInsert} required/>
                        </div>
                        <div className="button-container">
                            <button onClick={catRegis} className="create-category-button">Crear categoría</button>
                            <button onClick={() => { setCrearCategoria(false) }} className="cancel-button">Cancelar</button>
                        </div>
                    </div>

                }
                {editar &&
                    <div className="insert-c">
                        <h2>Editar Producto</h2>
                        <div className="form-column">
                            <label htmlFor="catego">Categoría</label>
                            <select id="catego" onChange={handleInsert} name="ID_CATEGORIA" defaultValue={upDat.ID_CATEGORIA}>
                                <option value="" disabled selected>Selecciona una categoría</option>
                                {categorias.map(cate => (
                                    <option value={cate.ID_CATEGORIA} key={cate.ID_CATEGORIA}>{cate.CATEGORIA}</option>
                                ))}
                            </select>
                            <button onClick={() => { if (!crearCategoria) setCrearCategoria(true) }} className="new-category-button">+ Nueva categoría</button>
                        </div>
                        <div className="form-column">
                            <label htmlFor="nombre">Nombre</label>
                            <input id="nombre" type="text" name="PRO_NOMBRE" placeholder={upDat.PRO_NOMBRE} onChange={handleUpdate} />
                        </div>
                        <div className="form-column">
                            <label htmlFor="precio">Precio</label>
                            <input id="precio" type="number" name="PRO_PRECIO" placeholder={upDat.PRO_PRECIO} onChange={handleUpdate} min="0" />
                        </div>
                        <div className="button-container">
                            <button onClick={() => update(upDat.PRO_ID)} className="save-changes-button">Guardar cambios</button>
                            <button onClick={() => { setEditar(false); setUpDat(null) }} className="cancel-button">Cancelar</button>
                        </div>
                    </div>

                }

            </div>

        </div>
    )
}