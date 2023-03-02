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

let template = '';
for(let evento of data.events){
    template += crearTarjetaConInner(evento);
}

const cards = document.getElementById("cards");
cards.innerHTML = template;
console.log(cards.innerHTML);


