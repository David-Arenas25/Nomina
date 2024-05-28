const prompt = require("prompt-sync")()
var trabajadores = []
let inicio = iniciarSesion()
if(inicio === true){
let crear = crearTrabajador(inicio)
let imprimir = imprimirDatos(crear)
}



function iniciarSesion() {
    let intentos = 3
    while (intentos > 0) {
        console.log("Bienvenido inicie sesión")
        let nombre = prompt("Ingrese su nombre")
        let contrasena = prompt("Ingrese su contraseña")

        if (nombre === "david" && contrasena === "123") {
            console.log("Incio de sesión exitoso")
            intentos = -1
            return true

        } else {
            console.log("Valide sus credenciales")
            intentos--
            console.log("le quedan " + intentos + " intentos")

        } if (intentos === 0) {
            console.log("Ya no le quedan intentos")
            return false

        }
    }
}

function calcularHorasExtra(horasTrabajadas,valorHora) {

    if (horasTrabajadas > 96) {
        var horasExtra = horasTrabajadas - 96
        horasExtra *= valorHora + horasExtra * 0.4

    }else if(horasTrabajadas < 96){
        horasExtra = 0

    } else {

        console.log("Las horas no pueden ser menos de 24")
        horasExtra= 0
        
    }     
     return horasExtra      
}


function calcularAuxilioTransporte(salario) {
    if (salario < 2000000) {
        auxilioTransporte = 115000
    } else {
        auxilioTransporte = 0
    }
    return auxilioTransporte
}

function calcularDeduccion(salario) {
    if (salario > 3000000) {
        let deduccion = 0.10 * salario
        return deduccion
    }else{
        deduccion = 0
        return deduccion 
    }

}

function calcularSalario(salario,deduccion,auxilioTransporte,horasExtra) {
    let salarioTrabajador = (salario) + (deduccion) + (horasExtra) + (auxilioTransporte)
    
    return salarioTrabajador
   
}

function imprimirDatos(datos) {
    let opc = 0
        while (opc != 2) {
            opc = Number(prompt("Seguir añadiendo empleados? 1. SI 2 NO"))
            switch (opc) {
                case 1: crearTrabajador(true)
                    break;
                case 2:
                    console.log("saliendo")
                    break;
                default:
                    console.log("ups! algo salió mal")
                    break;
            }
        }
    console.log(datos)
    let mayorAtresMIllones = datos.filter((datos => datos.salario > 3000000))
    let menorADosMIllones = datos.filter((datos => datos.salario < 2000000))
    console.log(`trabajadores que ganan mas de tres millones ${mayorAtresMIllones.length}`)
    console.log(`trabajadores que ganan menos de dos millones ${menorADosMIllones.length}`)

}


function crearTrabajador(login) { 
     if (login === true) {   
    let trabajador = {
            nombre: prompt("Ingrese el nombre del trabajador"),
            apellido: prompt("Ingrese el apellido del trabajador"),
            horasTrabajadas: 0,
            valorHora: 0,
            horasExtra: 0,
            auxilioTransporte: 0,
            deduccion: 0,
            salario: Number(prompt("Ingrese el salario del empleado"))
 
        }
        trabajador.horasTrabajadas = 23
        while( trabajador.horasTrabajadas < 24){
            console.log("Las horas deben ser mayores a 24")
            trabajador.horasTrabajadas = Number(prompt("Ingrese numero de horas laboradas"))
            trabajador.valorHora = Number(prompt(("Ingrese el valor de la hora laborada")))}
        trabajador.horasExtra = calcularHorasExtra( trabajador.horasTrabajadas, trabajador.valorHora)
        trabajador.auxilioTransporte = calcularAuxilioTransporte(trabajador.salario)
        trabajador.deduccion = calcularDeduccion(trabajador.salario)
        trabajador.salario = calcularSalario(trabajador.salario,trabajador.deduccion, trabajador.auxilioTransporte, trabajador.horasExtra)
        
        console.log(`${ trabajador.horasExtra} ${ trabajador.auxilioTransporte} ${ trabajador.deduccion} ${ trabajador.salario}`)
  
     
        
        var guardar = guardarTrabajador(trabajador)
        //se guarda el trabajador
        return guardar
}}

function guardarTrabajador(trabajador) {

    trabajadores.push(trabajador)
    return trabajadores
}