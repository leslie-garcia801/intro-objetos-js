// Actividad 13 Funciones y funciones flecha

//-------PASO 1 Y 2 funciones normales------

function calcularTotal(precio,cantidad=1){
    return precio * cantidad;
}

function esPedidoValido(cantidad){
    return cantidad>0;
}

function formatearPrecio(monto){
    return "$" + monto.toFixed(2);
}


console.log('-------PASO 1 Y 2------');
console.log(calcularTotal(35,2));
console.log(calcularTotal(35));
console.log(esPedidoValido(0));
console.log(formatearPrecio(35));


//------PASO 3 las mismas funciones pero en flecha------
const calcularTotal2 = (precio, cantidad=1) => precio * cantidad;
const esPedidoValido2 = (cantidad) => cantidad > 0;
const formatearPrecio2 = (monto) => "$" + monto.toFixed(2);

console.log('------PASO 3------');
console.log(calcularTotal2(35,2));
console.log(calcularTotal2(35));
console.log(esPedidoValido2(0));
console.log(formatearPrecio2(35));

//------PASO 4 la trampa de las llaves-------
const dobleMal = (n) => { n * 2; };
console.log('------PASO 4------');
console.log(dobleMal(5));
//Imprime undefined: al poner llaves, la funcion necesita un return explicito.
//La multiplicacion si ocurre, pero el resultado nunca sale de la funcion.

const dobleBienA = (n) => n * 2;    // sin llaves: return implicito
const dobleBienB = (n) => {return n * 2; };   //con llaves y return
console.log(dobleBienA(5),dobleBienB(5));

//-----PASO 5 el objeto respuesta------
const respuesta= {
    codigo: 200,
    estado(c) {
        this.codigo = c;
        return this;
    },
    json(cuerpo) {
        console.log('HTTP' + this.codigo);
        console.log(cuerpo);
        this.codigo = 200; //se reinicia para la siguiente peticion de la demo
    }
};

//------PASO 6 atender------
function atender(peticion, manejador) {
    console.log('→' + peticion.metodo +' ' + peticion.ruta);
    manejador(peticion, respuesta);
};

//-------PASO 7 los controladores-------
const catalogo = [
    { id:'p-01', nombre:'Agua de jamaica', precio:15},
    {id:'p-02', nombre:'Sándwich',precio:28}
];

const listarProductos = (req, res) => {
    res.json({ok:true, data: catalogo});
};

const verProducto = (req,res) => {
    const { id} = req.params;
    if (id !== 'p-01'){
        res.estado(404).json({ok:false, error: {mensaje:'No encontrado'}});
        return;
    }
    res.json({ok:true, data:catalogo[0]});
};

const crearPedido = (req,res) => {
    const {cantidad} = req.body;
    if(!esPedidoValido(cantidad)) {
        res.estado(400).json({
            ok:false,
            error: {mensaje: 'La cantidaddebe ser mayor quecero'}
        });
        return; 
    }
    const total = calcularTotal(catalogo[0].precio, cantidad);
    res.estado(201).json({
        ok:true,
        data:{producto:catalogo[0].nombre, cantidad,total}
    });
};

console.log('------PASO 7------');
atender({ metodo: "GET", ruta: "/api/productos" }, listarProductos);
atender({ metodo: "GET", ruta: "/api/productos/p-01", params : {id: "p-01"}}, verProducto);
atender({ metodo: "GET", ruta: "/api/productos/p-99", params : {id: "p-99"}}, verProducto);
atender({ metodo: "GET", ruta: "/api/pedidos", body: {cantidad:0 }},crearPedido );
atender({ metodo: "GET", ruta: "/api/pedidos", body: {cantidad:2 }},crearPedido );

//-------PASO 8 pasar vs llamar------
console.log('-----PASO 8------');
console.log(typeof listarProductos)
// listarProductos (sin parentesis) es la funcion misma: se la puedo ENTREGAR a atender.
// listarProductos() (con parentesis) la EJECUTA en ese instante y da su resultado.
// Express siempre quiere la primera forma.

//-----Reto opcional-----
function crearLogger(prefijo) {
    return function(mensaje) {
        console.log(prefijo + ' ' + mensaje);
    };
}
const log = crearLogger("[API]");
log("arrancando")