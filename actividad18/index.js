//El index solo arranca y prueba, no tiene logica de negocio

import * as ctrl from "./src/controllers/producto.controller.js"
import { calcularTotal, formatearPrecio } from "./src/utils/calculo.js"

console.log("---------LISTAR-----------");
console.log(ctrl.listarProductos());

console.log("------CREAR-------");
const creado =ctrl.crearProducto({nombre:"Sincronizada", precio:32,categoria:"comida"});
console.log(creado);