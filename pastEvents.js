//Traigo del html los id o clases que quiero seleccionar a traves de los metodos del dom 
const cards = document.getElementById("cards");
const $checkboxs = document.querySelector("#style-categoria");
const $search = document.getElementById("search");


//Filtro las cards que contienen las categorias de la data
const categoria = data.events.filter( evento => evento.category);


//Obtengo una lista nueva las categorias de la data, sin repetir(que es lo que hace el set(crear objeto)). New es un metodo constructor que genera una nueva instancia
const listaCategorias = Array.from(new Set(data.events.map(evento => evento.category)))


//Paso todos los checkboxs al html como cuando usaba el "template". El reduce devuelve un unico valor que va acumulando todos los checkboxs.Inicia con un string vacio.
const opciones = listaCategorias.reduce((acc, categoria) => acc += `<div class="form-check form-check-inline">
<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${categoria}">
<label class="form-check-label" for="inlineCheckbox1">${categoria}</label>
</div>`, "");
$checkboxs.innerHTML += opciones;


//Agrego el evento del tipo "input" al id "$search" que captura cuando el usuario escribe. En una constante guardo mi funcion filtrarCruzado() y si esa funcion no tiene coincidencia devuelvo un texto en el html donde estaba las cards. Si coincide pinto las cards en el html.
$search.addEventListener("input", e => {
    const filtrado = filtrarCruzado();
    if(filtrado == 0){
        return cards.innerHTML = `<h2> There isn't event with that name.</h2>`
    }
    pintarTarjetas(filtrado, cards);
});


//Filtro las tarjetas por la palabra o letra que ingrese el usuario en el input. En la constante textoIngresado guardo el valor que ingrese el usario y lo convierto a minuscula todo lo que ingrese. Luego devuelvo la lista de eventos filtrado por nombre con lo que ingrese el usuario. Tambien el nombre de los eventos los pase a minuscula para que pueda ver si esta incluido en la lista. 
function filtrarPalabras(listaEventos){
    const textoIngresado = $search.value.toLowerCase();
    return listaEventos.filter(evento => evento.name.toLowerCase().includes(textoIngresado));   
}


//Agrego el evento del tipo "change" al id "$search" que captura cuando el usuario hace check a las cajitas. Dentro llamo a la funcion pintar tarjetas que recibe a la funcion filtrarCruzado() y las tarjetas que debe mostrar.
$checkboxs.addEventListener("change", e => {
    pintarTarjetas(filtrarCruzado(), cards);
});


function filtrarCategorias(listaEventos){
    const categoriaChecked = document.querySelectorAll('input[type="checkbox"]:checked');
    const listaCategoriasChecked = Array.from(categoriaChecked).map(categoria => categoria.value);
    if(listaCategoriasChecked.length === 0){
        return listaEventos;
    }
    return listaEventos.filter(evento => listaCategoriasChecked.includes(evento.category));
}

function filtrarEventosPasados(listaEventos){
    let eventosPasados = [];
    for(let evento of data.events){
        if(evento.date < listaEventos.currentDate){
            eventosPasados.push(evento);
        }
    }return eventosPasados;
}

const eventosPasados = filtrarEventosPasados(data);


//Filtro los elementos de la funcion filtrada por categoria y luego filtrada por palabras.
function filtrarCruzado(){
    return filtrarPalabras(filtrarCategorias(eventosPasados));
}

function crearTarjetaConInner(evento){
    const template = `
        <div class="card m-1" style="width: 18rem;">
            <img src="${evento.image}" class="card-img-top" alt="evento-image">
            <div class="card-body">
                <h5 class="card-title">${evento.name}</h5>
                <p class="card-text">${evento.description}</p>
                <a href="./detailsEvents.html?id=${evento._id}&name=${evento.name}" class="btn btn-primary">More info</a>
            </div>
        </div>`
    return template;
}

function pintarTarjetas(eventosPasados, cards ){
    let template = '';
    for(let evento of eventosPasados){
        template += crearTarjetaConInner(evento);
    }
    cards.innerHTML = template;
}

pintarTarjetas(eventosPasados, cards);