// Ejercicio de uso de arreglos con CRUD- menu version de referencia 

//------PASO 1 El arreglo---------
const productos = [
    {id: crypto.randomUUID(), nombre:"Molletes", precio:30, categoria:"comida", disponible:true},
    {id: crypto.randomUUID(), nombre:"Jugo de naranja", precio: 18, categoria:"bebida", disponible:true},
    {id: crypto.randomUUID(), nombre:"Gelatina", precio:12, categoria:"postre", disponible:false}
];

//---------PASO 2 y 3 Leer---------
const listar = () => productos;

const listarDisponibles = () => productos.filter((p) => p.disponible);

// ---------PASO 4 Buscar uno---------
const obtenerPorId = (id) => productos.find((p) => p.id === id);

// obtenerPorId("no-existe") devuelve undefined: find no encontro nada 
// console.log(obtenerPorId("no-existe").nombre)
// cannot read properities of undefined
// el programa cae se convierte en un error 404 bien manejado 

//----------PASO 5 Crear--------
function crear(datos){
    const nuevo = {id:crypto.randomUUID(), disponible: true, ...datos};
    productos.push(nuevo);
    return nuevo;
};

//---------PASO 6 Actualizar--------
function actualizar(id,cambios){
    const i = productos.findIndex((p) => p.id === id);
    if (i === -1) return null;
    productos[i] = {...productos[i], ...cambios};
    return productos[i];
};

//----------PASO 7 Borrado logico----------
function eliminar(id){
    const producto = obtenerPorId(id);
    if(!producto) return null;
    producto.disponible = false;
    return producto;
};

// Razon: los pedidos viejos guardan el id de su producto
// Si lo borro de verdad, el historial queda apuntando a algo que ya no existe
// El corte del dia se rompe: Marcarlo como no disponible lo saca del menu 
// Sin destruir la informacion y ademas se puede revertir 

//--------PASO 8 Total con reduce----------
function calcularTotal(pedido){
    return pedido.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
};


//--------PASO 9 ¿Ya existe?--------
const existeNombre = (nombre) =>
    productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase());

const buscarPorTexto = (texto) =>
    productos.filter((p) => p.nombre.toLowerCase().includes(texto.toLowerCase()));


//------PASO 10 Pruebas----------
console.log("---------listar--------");
console.log(listar());

console.log("-----------ListarDisponibles-----------");
console.log(listarDisponibles().map((p) => p.nombre));

console.log("------------Crear-----------");
const creado = crear({nombre:"Sincronizada", precio:32, categoria:"comida"});
console.log(creado);

console.log("----------Obtener por id------------");
console.log(obtenerPorId(creado.id).nombre);
console.log(obtenerPorId("no-existe"));


console.log("--------------Actualizar-----------");
console.log(actualizar(creado.id, {precio:35}));
console.log(actualizar("no-existe", {precio:1}));


console.log("-------Eliminar(logico)----------");
console.log(eliminar(creado.id).disponible);
console.log("disponibles ahora", listarDisponibles().length);