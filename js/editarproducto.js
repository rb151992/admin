import { obtenerProducto,editarProducto } from './api.js'; 
import { mostrarAlerta } from './alerta.js';

(function(){

 const nombreInput = document.querySelector('#nombre');
 const precioInput = document.querySelector('#precio'); 
 const categoriaInput = document.querySelector('#categoria');  
 const idInput = document.querySelector('#id');

document.addEventListener('DOMContentLoaded',async ()=>{


//verificar si el producto existe
const parametroURL = new URLSearchParams(window.location.search);
const idProducto = parseInt(parametroURL.get('id'));
const producto = await obtenerProducto(idProducto);
mostrarProducto(producto);

// registro del formulario

const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit',validarProducto);


})

function mostrarProducto (producto){

const {nombre,precio,categoria,id} = producto;


nombreInput.value = nombre;
precioInput.value = precio;
categoriaInput.value = categoria;
idInput.value = id;


}

async function validarProducto(e){
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const categoria = document.querySelector('#categoria').value;

    const producto = {
        nombre: nombreInput.value,
        precio: precioInput.value,
        categoria: categoriaInput.value,
        id: parseInt(idInput.value)
    }

    if(validacion(producto)){
        mostrarAlerta('Todos los campos deben ser obligatiorios');
        return;
    }
    await editarProducto(producto)
    window.location.href = 'index.html';
    }

    function validacion(obj){
        return !Object.values(obj).every(i => i !== '');
    }

})();