const Control = require('../models/model_mongoDB'); //Modelo mongo DB

function createData(req, res) {
    //CREAR
    let data = new Control(); // Acceder al modelo de mongoDB y se guarda en un avariable para acceder a cada key del objeto
    let parametros = req.body; //parametros que el envian solicitudes 

    data.nombre = parametros.nombre; // dato que envia el cliente.
    data.marca = parametros.marca; // dato que envia el cliente.
    data.precio = parametros.precio; // dato que envia el cliente.
    data.unidades = parametros.unidades; // dato que envia el cliente.

    data.save((err, newData) => {
        if (err) {
            res.status(500).send({
                message: "Server error "
            });
        } else {
            if (!newData) {
                res.status(200).send({
                    message: "No fue posible realizar el registro", statusCode: 400
                });
            } else {
                res.status(200).send({
                    status: 'Nueva data',
                    producto: newData,
                    statusCode: 200
                });
            }
        }
    }); //Guardar

};

function showData(req, res) {
    //VISUALIZAR
    //acceder a la informacion y usar la funcion find busca error  o los productos o datos que encunetre en la DB
    // se accede a la base de datos directamente
    Control.find((err, dataEncontrada) => {
        if (err) {
            res.status(500).send({
                message: "Server error "
            });
        } else {
            if (!dataEncontrada) {
                res.status(200).send({
                    message: "No fue posible encontrar los registros", statusCode: 400
                });
            } else {
                res.status(200).send({
                    status: 'Productos encontrados',
                    producto: dataEncontrada,
                    statusCode: 200
                });
            }
        }
    });
};

function upgradeData(req, res) {
    //Actualizar
    let productosId = req.params.id;
    //incicar que uno de los parametros  para modificar va a ser el id
    // variable donde almacenar estos datos:
    let nuevosDatos = req.body;
    //control es la variale del modelo Buscar el objeto por el ID y actualizar
    //encontrar producto id o parametro, en conjutno con los nuevos datos, se crea una funcion error o actualizado
    //ese id lo creo mongo...
    Control.findByIdAndUpdate(productosId, nuevosDatos, (err, dataActualizada) => {
        if (err) {
            res.status(500).send({
                message: "Server error "
            });
        } else {
            if (!dataActualizada) {
                res.status(200).send({
                    message: "No fue posible actualizar", statusCode: 400
                });
            } else {
                res.status(200).send({
                    status: 'Productos actualizado',
                    producto: nuevosDatos,
                    statusCode: 200
                });
            }
        }
    });

};

function delateData(req, res) {
    //eliminar
    let dataId = req.params.id;
    //obtener el id del objeto

    //permite encontrar el id buscado y lo elimina del registro
    Control.findByIdAndDelete(dataId, (err, dataEliminada) => {
        //base de datos, encuentra el id del producto, posee parametros de identificacion del id, error y el producto eliminado
        if (err) {
            res.status(500).send({
                message: "Server error "
            });
        } else {
            if (!dataEliminada) {
                res.status(200).send({
                    message: "No fue posible eliminar", statusCode: 400
                });
            } else {
                res.status(200).send({
                    status: 'Producto eliminado',
                    producto: dataEliminada,
                    statusCode: 200
                });
            }
        }
    });
};
//borrar todos los datos de una coleccion de mongo.....
const dropAll = async (req, res) => {
    //VISUALIZAR
    //acceder a la informacion y usar la funcion find busca error  o los productos o datos que encunetre en la DB
     // se accede a la base de datos directamente
     await Control.remove((err, dataEncontrada) => {
       if (err) {
         res.status(500).send({
           message: "Server error ",
         });
       } else {
         if (!dataEncontrada) {
           res.status(200).send({
             message: "No fue posible encontrar los registros",
             statusCode: 400,
           });
         } else {
           res.status(200).send({
             status: "Productos encontrados",
             producto: dataEncontrada,
             statusCode: 200,
           });
         }
       }
     });
   }


module.exports = {
    createData,
    showData,
    upgradeData,
    delateData,
    dropAll
}