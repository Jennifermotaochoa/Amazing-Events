//Traigo del html los id o clases que quiero seleccionar
const cards = document.getElementById("cards"); 
const $checkboxs = document.querySelector("#style-categoria");
const $search = document.getElementById("search");

//Filtro las cards que contienen las categorias de la data
const categoria = data.events.filter( evento => evento.category);

//Obtengo una lista con las categorias de la data, sin repetir.
const listaCategorias = Array.from(new Set(data.events.map(evento => evento.category)))

//Paso todo al html
const opciones = listaCategorias.reduce((acc, categoria) => acc += `<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${categoria}"><label class="form-check-label" for="inlineCheckbox1">${categoria}</label>`, "");
$checkboxs.innerHTML += opciones;

// console.log($checkboxs.innerHTML);

//Agrego el evento del tipo "input" al id "$search" y le mando la funcion filtrarPalabras
$search.addEventListener("input", e => {
    pintarTarjetas(filtrarCruzado(), cards);
});

function filtrarPalabras(listaEventos){
    const textoIngresado = $search.value.toLowerCase();
    return listaEventos.filter(evento => evento.name.toLowerCase().includes(textoIngresado));   
}
//Agrego el evento del tipo "change" al id "$search" y le mando la funcion filtrarPalabras
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

function filtrarCruzado(){
    return filtrarPalabras(filtrarCategorias(data.events));
}

function crearTarjetaConInner(evento){
    const template = `
        <div class="card m-1" style="width: 18rem;">
            <img src="${evento.image}" class="card-img-top" alt="evento-image">
            <div class="card-body">
                <h5 class="card-title">${evento.name}</h5>
                <p class="card-text">${evento.description}</p>
                <a href="./detailsEvents.html" class="btn btn-primary">More info</a>
            </div>
        </div>`
    return template;
}

function pintarTarjetas(data, cards){
    let template = '';
    for(let evento of data){
        template += crearTarjetaConInner(evento);
    }
    cards.innerHTML = template;
    // console.log(cards.innerHTML);
}

pintarTarjetas(data.events, cards);

