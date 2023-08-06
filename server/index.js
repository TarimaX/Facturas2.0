import express from "express";
//import mysql from "mysql2";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

const PORT = process.env.PORT || 8800;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tienda',
});

app.use(express.json());
app.use(cors());

// CRUD producto --------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.json("Hola esta es el servidor");
});

app.get("/producto", (req, res) => {
  const q = "SELECT * FROM producto";
  connection.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/producto", (req, res) => {
  const q =
    "INSERT INTO producto (ID_CATEGORIA,PRO_NOMBRE, PRO_PRECIO) VALUES (?)";
  const values = [
    parseInt(req.body.ID_CATEGORIA),
    req.body.PRO_NOMBRE,
    parseFloat(req.body.PRO_PRECIO),
  ];

  console.log(values)
  connection.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("El producto ha sido creado bien");
  });
});

/*app.delete("/producto/:id", (req, res) => {
  const productoId = req.params.id;
  const q = "DELETE FROM producto WHERE PRO_ID=?";

  connection.query(q, [productoId], (err, data) => {
    if (err) return res.json(err);
    return res.json("El producto ha sido eliminado exitosamente");
  });
});*/



app.put("/producto/:id", (req, res) => {
  const productoId = req.params.id;
  const q =
    "UPDATE producto SET `PRO_NOMBRE`=?, `PRO_PRECIO`=?, `ID_CATEGORIA`=? WHERE PRO_ID=?";

  const values = [
    req.body.PRO_NOMBRE,
    req.body.PRO_PRECIO,
    req.body.ID_CATEGORIA,
  ];

  connection.query(q, [...values, productoId], (err, data) => {
    if (err) return res.json(err);
    return res.json("El producto ha sido actualizado exitosamente");
  });
});

app.put("/producto/:id/oos",(req,res)=>{
  const id = req.params.id;
  const q = "UPDATE producto SET ONSTOCK = false WHERE PRO_ID = ?"

  connection.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("El producto ha sido desontinuado.");
  });

})

app.put("/producto/:id/os",(req,res)=>{
  const id = req.params.id;
  const q = "UPDATE producto SET ONSTOCK = true WHERE PRO_ID = ?"

  connection.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("El producto ha sido desontinuado.");
  });

})
// CRUD categoria --------------------------------------------------------------------------

app.get('/categoria',(req,res)=>{
  const q = "SELECT * FROM CATEGORIA";
  connection.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
})

app.post('/categoria',(req,res)=>{
  const q = "INSERT INTO categoria (CATEGORIA,DESCRIPCION) VALUES (?,?)"

  const values = [
    req.body.CATEGORIA,
    req.body.DESCRIPCION,
  ]
  
  console.log("Se hace la llamada")
  console.log(values)
  connection.query(q,[...values],(err,result)=>{
    console.log(result)
    if(err) return res.json(err);
    else{
      console.log("Se creó")
      return res.json("Categoría exitosamente creada.")
    }
  })
})

app.put('/categoria/:id',(req,res)=>{
  const q = "UPDATE categoria SET CATEGORIA = ?, DESCRIPCION = ? WHERE ID_CATEGORIA = ?";
  const id = req.params.id;
  const values = [
    req.body.CATEGORIA,
    req.body.DESCRIPCION
  ]

  connection.query(q,[...values,id],(err,result)=>{
    if(err) return res.json(err)
    return res.json("Categoría configurada exitosamente.")
  })
})

app.delete('/categoria/:id',(req,res)=>{
  const q = "DELETE FROM categoria WHERE ID_CATEGORIA = ?"
  const id = req.params.id;

  connection.query(q,[id],(err,result)=>{
    if(err) return res.json(err)
    return res.json("Categoría eliminada.");
  })
})

// CRUD factura --------------------------------------------------------------------------

app.get('/factura',(req,res)=>{
  const q = "SELECT * FROM factura";
  connection.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
})

app.post('/factura',(req,res)=>{
  const q = "INSERT INTO factura (CLI_CEDULA,FAC_FORMAPAGO,FAC_DESCUENTO,FAC_FECHA) VALUES (?,?,?,?)"
  
  const fecha = new Date()
  const values = [
    req.body.CLI_CEDULA,
    req.body.FAC_FORMAPAGO,
    req.body.FAC_DESCUENTO,
    fecha
  ]
  connection.query(q,[...values],(err,result)=>{
    if(err) return res.json(err);
    return res.json("Factura generada exitosamente.");
  })
  
})

// CRUD venta --------------------------------------------------------------------------

app.get('/detalle_factura/:id',(req,res)=>{
  const q = "SELECT * FROM venta WHERE FAC_ID = ?"
  const id = req.params.id;
  console.log(id)
  connection.query(q,[id],(err, data) => {
    console.log(data)
    if (err) return res.json(err);
    return res.json(data);
  });
})

app.post('/detalle_factura',(req,res)=>{
  const q = "INSERT INTO venta values (?,?,?)"

  const values = [
    req.body.FAC_ID,
    req.body.PRO_ID,
    req.body.CANTIDAD
  ]

  db.query(q,[...values],(err,result)=>{
    if(err) return res.json(err,"ERROR ERROR");
    return res.json("Producto agregado a la factura.");
  })

})

app.delete('/detalle_factura/:id',(req,res)=>{
  const q = "DELETE FROM venta WHERE FAC_ID = ?"
  const id = req.params.id
  connection.query(q,[id],(err,result)=>{
    if(err) return res.json(err)
    return res.json("Producto retirado de la factura.");
  })
})

// -----------------------PROVEEDOR
//CRUD PROVEEDOR
// Ruta para obtener todos los proveedores
app.get("/proveedor", (req, res) => {
  const q = "SELECT * FROM PROVEEDOR";
  connection.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Ruta para obtener un proveedor por su ID
app.get("/proveedor/:id", (req, res) => {
  const proveedorId = req.params.id;
  const q = "SELECT * FROM PROVEEDOR WHERE PROVE_ID = ?";

  connection.query(q, [proveedorId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Proveedor no encontrado!");
    return res.json(data[0]);
  });
});

// Ruta para crear un nuevo proveedor
app.post("/proveedor", (req, res) => {
  const { PROVE_NOMBRE, PROVE_DIRECCION, PROVE_CONTACTO } = req.body;
  const insertQuery =
    "INSERT INTO PROVEEDOR (`PROVE_NOMBRE`, `PROVE_DIRECCION`, `PROVE_CONTACTO`) VALUES (?, ?, ?)";
  const values = [PROVE_NOMBRE, PROVE_DIRECCION, PROVE_CONTACTO];

  connection.query(insertQuery, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Proveedor creado exitosamente");
  });
});

// Ruta para actualizar un proveedor por su ID
app.put("/proveedor/:id", (req, res) => {
  const proveedorId = req.params.id;
  const { PROVE_NOMBRE, PROVE_DIRECCION, PROVE_CONTACTO } = req.body;
  const q =
    "UPDATE proveedor SET `PROVE_NOMBRE`=?, `PROVE_DIRECCION`=?, `PROVE_CONTACTO`=? WHERE PROVE_ID=?";

  const values = [PROVE_NOMBRE, PROVE_DIRECCION, PROVE_CONTACTO, proveedorId];

  connection.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Proveedor actualizado exitosamente");
  });
});

// Ruta para eliminar un proveedor por su ID
app.delete("/proveedor/:id", (req, res) => {
  const proveedorId = req.params.id;
  const q = "DELETE FROM PROVEEDOR WHERE PROVE_ID=?";

  connection.query(q, [proveedorId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Proveedor eliminado exitosamente");
  });
});
//---------------------------CRUD CLIENTE
app.get("/cliente", (req, res) => {
  const q = "SELECT * FROM CLIENTE";
  connection.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Obtener un cliente por su cédula
app.get("/cliente/:cedula", (req, res) => {
  const cedulaCliente = req.params.cedula;
  const q = "SELECT * FROM CLIENTE WHERE CLI_CEDULA = ?";

  connection.query(q, [cedulaCliente], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Cliente no encontrado!");
    return res.json(data[0]);
  });
});

// Crear un nuevo cliente
app.post("/cliente", (req, res) => {
  const cedulaCliente = req.body.CLI_CEDULA;

  const checkQuery = "SELECT * FROM CLIENTE WHERE CLI_CEDULA = ?";
  connection.query(checkQuery, [cedulaCliente], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) {
      return res.status(409).json("El cliente con la cédula proporcionada ya está registrado.");
    }

    const insertQuery =
      "INSERT INTO CLIENTE (`CLI_CEDULA`, `CLI_NOMBRE`, `CLI_APELLIDO`, `CLI_DIRECCION`, `CLI_FECHA`) VALUES (?, ?, ?, ?, ?)";
    const values = [
      req.body.CLI_CEDULA,
      req.body.CLI_NOMBRE,
      req.body.CLI_APELLIDO,
      req.body.CLI_DIRECCION,
      req.body.CLI_FECHA,
    ];

    connection.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("El cliente ha sido creado exitosamente");
    });
  });
});

// Actualizar un cliente por su cédula
app.put("/cliente/:cedula", (req, res) => {
  const cedulaCliente = req.params.cedula;
  const q =
    "UPDATE CLIENTE SET `CLI_NOMBRE`=?, `CLI_APELLIDO`=?, `CLI_CEDULA`=?, `CLI_DIRECCION`=?, `CLI_FECHA`=? WHERE CLI_CEDULA=?";

  const values = [
    req.body.CLI_NOMBRE,
    req.body.CLI_APELLIDO,
    req.body.CLI_CEDULA,
    req.body.CLI_DIRECCION,
    req.body.CLI_FECHA,
  ];

  connection.query(q, [...values, cedulaCliente], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("El cliente ha sido actualizado exitosamente");
  });
});

// Eliminar un cliente por su cédula
app.delete("/cliente/:cedula", (req, res) => {
  const cedulaCliente = req.params.cedula;
  const q = "DELETE FROM CLIENTE WHERE CLI_CEDULA=?";

  connection.query(q, [cedulaCliente], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("El cliente ha sido eliminado exitosamente");
  });
});



// LOGIN

// Route handler for user registration
app.post("/register", (req, res) => {
  // CHECK EXISTING USER
  const q = "SELECT * FROM USUARIO WHERE US_CORREO = ? OR US_NOMBRE = ?";

  connection.query(q, [req.body.us_correo, req.body.us_nombre], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Usuario ya existe!");

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.us_contrasenia, salt);

    const insertQuery =
      "INSERT INTO USUARIO (`US_CORREO`,`US_NOMBRE`,`US_APELLIDO`,`US_CONTRASENIA`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.us_correo,
      req.body.us_nombre,
      req.body.us_apellido,
      hash,
    ];

    connection.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Se creó el usuario");
    });
  });
});

// Route handler for user login
app.post("/login", (req, res) => {
  // CHECK USER
  const q = "SELECT * FROM USUARIO WHERE US_NOMBRE = ?";

  connection.query(q, [req.body.us_nombre], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Usuario no encontrado!");

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.us_contrasenia,
      data[0].US_CONTRASENIA
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Usuario o Contraseña incorrecta!");

    // Generate JWT token
    const token = jwt.sign({ id: data[0].US_CORREO }, "jwtkey");
    const { US_CONTRASENIA, ...other } = data[0];

    // Set token in a cookie
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(other);
  });
});

// Route handler for user logout
app.post("/logout", (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true,
  }).status(200).json("Usuario ha cerrado sesión.");
});

//Obtener todos los productos
app.use(cors());
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM PRODUCTO';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los productos:', err);
      res.status(500).json({ error: 'Error al obtener los productos' });
    } else {
      res.json(results);
    }
  });
});

//Carrito
app.post('/api/cart', (req, res) => {
  const { productId } = req.body; 

  const getProductQuery = 'SELECT * FROM PRODUCTO WHERE PRO_ID = ?';
  connection.query(getProductQuery, [productId], (err, result) => {
    if (err) {
      console.error('Error al obtener el producto:', err);
      res.status(500).json({ error: 'Error al obtener el producto' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        const product = result[0];
        const existingCartItem = cartItems.find((item) => item.PRO_ID === product.PRO_ID);

        if (existingCartItem) {
          existingCartItem.quantity += 1;
        } else {
          const cartItem = {
            ...product,
            quantity: 1,
          };
          cartItems.push(cartItem);
        }

        console.log('Producto agregado al carrito:', product);
        console.log('Carrito:', cartItems);
        res.status(200).json(cartItems);
      }
    }
  });
});

//Obtener categorias
app.get('/api/categories/:id', (req, res) => {
  const categoryId = req.params.id;
  const query = 'SELECT * FROM CATEGORIA WHERE ID_CATEGORIA = ?';
  connection.query(query, [categoryId], (err, results) => {
    if (err) {
      console.error('Error al obtener la categoría:', err);
      res.status(500).json({ error: 'Error al obtener la categoría' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Categoría no encontrada' });
      } else {
        res.json(results[0]);
      }
    }
  });
});


// Start the server
app.listen(PORT, () => {
  connection.connect((err)=>{
    if(err){
      console.log(err.message)
    }else{
      console.log("Conexión exitosa")
    }
  })
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
