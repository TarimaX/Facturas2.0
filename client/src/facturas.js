import React,{useEffect,useState} from "react";
import Axios from "axios";
import dayjs from 'dayjs';

export default function Facturas(){
    const [requery,setRequery] = useState(false);
    const [facturas,setFacturas] = useState([]);
    const [productos,setProductos] = useState([]);
    const [factu,setFactu] = useState(null);
    const [reg,setReg] = useState(false);
    const [novFac,setNovFac] = useState({});
    const [detalles,setDetalles] = useState([]);
    const [prod,setProd] = useState([])
    const [addP,setAddP] = useState(false);
    const [mer,setMer] = useState({});
    const [FID,setFID] = useState(0);

    const [clientes,setClientes] = useState([])

    useEffect(()=>{
        Axios.get('http://localhost:8800/producto')
        .then(res=>{setProductos(res.data);console.log("YAY")})
        .catch(err=>console.log(err,"Fallo en consulta de productos."))

        Axios.get('http://localhost:8800/factura')
        .then(res=>{setFacturas(res.data);console.log("YAY")})
        .catch(err=>console.log(err,"Fallo en consulta de facturas."))

        Axios.get('http://localhost:8800/cliente')
        .then(res=>{setClientes(res.data);console.log("Habemos clientes")})
        .catch(err=>console.log(err,"No hay clientes"));

        facturas.map(f=>{
            Axios.get(`http://localhost:8800/detalle_factura/${f.FAC_ID}`).then(res=>setDetalles([...detalles],res.data))
        })
        
    },[requery])

    const encontrar = (ced) =>{
        const clienteEncontrado = clientes.find((c) => c.CLI_CEDULA === ced);
            return clienteEncontrado;

    }

    const handleInsert = (e) => {
        setNovFac((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleMerc = (e) => {
        setMer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const add = () =>{
        console.log(prod)
        console.log(mer)
        prod.push(mer)
        setProd(prod)
        setAddP(false)
        console.log(prod)
    }

    const facturar = () =>{
        Axios.post("http://localhost:8800/factura",novFac).then(res=>console.log(res,"ÉXITO")).catch(err=>console.log(err))
        setFID(facturas[facturas.length-1].FAC_ID + 1);
        console.log(FID)
        prod.map(p=>{
            const body = {FAC_ID:FID,PRO_ID:p.PRO_ID,CANTIDAD:p.CANTIDAD};
            console.log(body)
            Axios.post("http://localhost:8800/detalle_factura",body).then(res=>console.log("Se registró el detalle de la venta."))
            .catch(err=>console.log(err))
        })
        setRequery(true);
        setReg(false);
        
    }

    const findDetalles = (id)=>{
        console.log(id)
        Axios.get(`http://localhost:8800/detalle_factura/${id}`).then(res=>{setDetalles(res.data)})
        .catch(err=>console.log(err))
        console.log(detalles)
    }

    const nombrarProd = (id) =>{
        console.log(id);
        const productoEncontrado = productos.find((p) => p.PRO_ID === id);
        return productoEncontrado;
    }

    const calcu = (pre,can)=>{
        return pre*can;
    }

    return(
        <div>
            <h1>REGISTRO DE FACTURAS</h1>
            <button onClick={()=>setReg(true)}>Registrar factura</button>
            {facturas.map(f=>(
                <div key={f.FAC_ID}>
                    <h2 onClick={()=>{if(!factu){
                                            findDetalles(f.FAC_ID);
                                            setFactu(f);
                                            console.log(f)
                                            }
                                    else 
                                            setFactu(null)}}>Factura No: {String(f.FAC_ID).padStart(5,"0")}</h2>
                    {factu && factu.FAC_ID ===f.FAC_ID ?
                        <div>
                            <h3>CLIENTE: </h3><p>{encontrar(factu.CLI_CEDULA).CLI_NOMBRE + ' ' +encontrar(factu.CLI_CEDULA).CLI_APELLIDO}</p>
                            <h3>FORMA DE PAGO: </h3><p>{factu.FAC_FORMAPAGO}</p>
                            <h3>DESCUENTO: </h3><p>{factu.FAC_DESCUENTO}%</p>
                            <h3>FECHA: </h3><p>{dayjs(factu.FAC_FECHA).format('DD-MM-YYYY')}</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            PRODUCTO
                                        </th>
                                        <th>
                                            PRECIO
                                        </th>
                                        <th>
                                            CANTIDAD
                                        </th>
                                        <th>
                                            MONTO
                                        </th>
                                    </tr>
                                </thead>
                            {detalles.map(d=>{console.log(d); return(
                                <tr>
                                    <th>{nombrarProd(d.PRO_ID).PRO_NOMBRE}</th>
                                    <th>{nombrarProd(d.PRO_ID).PRO_PRECIO}</th>
                                    <th>{d.CANTIDAD}</th>
                                    <th>{calcu(nombrarProd(d.PRO_ID).PRO_PRECIO,d.CANTIDAD)}</th>
                                </tr>
                            )})}
                            </table>
                            
                            <h3>VALORTOTAL: </h3><p>{f.FAC_VALORTOTAL}</p>
                        </div>
                    :()=>setFactu(null)}
                </div>
            ))}
            {reg &&
                <div>
                    <label>Cliente </label>
                    <select id="facturanueva" onChange={handleInsert} name="CLI_CEDULA">
                            <option disabled selected>Seleccione un cliente</option>
                                {clientes.map(cli=>(
                                    <option value={cli.CLI_CEDULA} key={cli.CLI_CEDULA}>{cli.CLI_NOMBRE+' '+cli.CLI_APELLIDO}</option>
                                ))}
                            </select>
                            <button>+ Registrar cliente</button>
                            <label>Forma de pago</label>
                            <select id="facturanueva" onChange={handleInsert} name="FAC_FORMAPAGO">
                            <option disabled selected>Seleccione una forma de pago</option>    
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Transferencia">Transferencia</option>
                            </select>
                            <label>Descuento</label>
                            <input type="number" name="FAC_DESCUENTO" onChange={handleInsert} min="0"/>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            PRODUCTO
                                        </th>
                                        <th>
                                            PRECIO
                                        </th>
                                        <th>
                                            CANTIDAD
                                        </th>
                                        <th>
                                            MONTO
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prod.map(pr=>(
                                        <tr>
                                            <th>{nombrarProd(parseInt(pr.PRO_ID)).PRO_NOMBRE}</th>
                                            <th>{nombrarProd(parseInt(pr.PRO_ID)).PRO_PRECIO}</th>
                                            <th>{pr.CANTIDAD}</th>
                                            <th>{calcu(nombrarProd(parseInt(pr.PRO_ID)).PRO_PRECIO,pr.CANTIDAD)}</th>
                                        </tr>
                                    ))}
                                    <th><button onClick={()=>setAddP(true)}>Añadir Producto</button></th>
                                    {addP && 
                                    <tr>
                                        <th>
                                            <select id="productin" onChange={handleMerc} name="PRO_ID">
                                                <option disabled selected>Seleccione un producto</option>
                                                {productos.map(p=>(
                                                    <option value={p.PRO_ID} key={p.PRO_ID}>{p.PRO_NOMBRE}</option>
                                                ))}
                                            </select>
                                        </th>
                                        <th>
                                            <input type="number" name="CANTIDAD" min="1" onChange={handleMerc}/>
                                        </th>
                                        <th>
                                            <button onClick={add}>Agregar</button>
                                        </th>
                                    </tr>}
                                </tbody>
                            </table>
                            <button onClick={facturar}>Registrar factura</button>

                </div> 
            }
        </div>
    )
}