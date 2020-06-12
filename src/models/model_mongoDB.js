const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Esquema para la coleccion

const objetoSchema = Schema({
  nombre: String,
  marca: String,
  precio: Number,
  unidades: Number
  });

module.exports = mongoose.model('objetos', objetoSchema);
