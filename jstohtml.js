// Generar html con JSON

document.getElementById('register_title').innerHTML = 'Hola gue!'
// Así se cambia el valor de un elemento

const parrafo = document.createElement('p')
var contenido = document.createTextNode('parrafo')

parrafo.appendChild(contenido)
document.body.appendChild(parrafo)

var contenedor = document.getElementById('second')

const input = document.createElement('input')

input.classList.add('input')
input.placeholder = 'Direccion' 

contenedor.appendChild(input)
