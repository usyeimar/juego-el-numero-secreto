let numeroSecreto;
let numeroMaximoIntentos = 10;
let intentos;
let numerosSorteados = [];

function verificarIntento() {
  let numeroDeusuario = parseInt(
    document.getElementById("numeroUsuario").value
  );

  console.log('usuario',numeroDeusuario)
  console.log('secreto',numeroSecreto)

  const isEqual = numeroDeusuario === numeroSecreto;

  if (isEqual) {
    asignarTextoElemento(
      "p",
      ` ✨ Acertaste 🎉 en ${intentos} ${
        intentos == 1 ? "intento" : "intentos"
      }`
    );
    removerAtributo("reiniciar", "disabled");
    confetti({
      //confetti effect
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  } else {
    if (numeroDeusuario > numeroSecreto) {
      asignarTextoElemento("p", "El numero secreto es menor");
    } else {
      asignarTextoElemento("p", "El numero secreto es mayor");
    }
    intentos++;

    limpiarCaja("#numeroUsuario");
  }
  console.log(numeroDeusuario == numeroSecreto);

  return;
}

function iniciarNuevoJuego() {
  //reiniciar la caja
  limpiarCaja("#numeroUsuario");
  //indicar mensaje de inicion(titulo, parrafo)
  mensajesIniciales();

  //condiciones iniciales
  condicionesIniciales();

  //deshabilitar el boton
  agregarAtributo("reiniciar", "disabled");
}

function removerAtributo(element, atributo) {
  document.getElementById(element).removeAttribute(atributo);
}

function agregarAtributo(element, atributo) {
  document.getElementById(element).setAttribute(atributo, true);
}

function limpiarCaja(element) {
  document.querySelector(element).value = "";
}

function asignarTextoElemento(element, text) {
  let tag = document.querySelector(element);
  tag.innerHTML = text;
}

function genNumeroSecreto(intentos) {
  let numeroGenerado = Math.floor(Math.random() * intentos) + 1;

  console.log(numeroGenerado)
  console.log(numerosSorteados)
  if (numerosSorteados.length == intentos) {
    asignarTextoElemento("p", "Ya se sortearon todos los numeros posible 😥")

    return
  } else {

    if (numerosSorteados.includes(numeroGenerado)) {
      return genNumeroSecreto(intentos);
    } else {
      numerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function mensajesIniciales() {
  asignarTextoElemento("p", "Indica un numero del 1 al 10");
  asignarTextoElemento("h1", "Juego del numero secreto");
}

function condicionesIniciales() {
  //generar numero aleatorio
  numeroSecreto = genNumeroSecreto(numeroMaximoIntentos);
  intentos = 1;
}
mensajesIniciales();
condicionesIniciales();
