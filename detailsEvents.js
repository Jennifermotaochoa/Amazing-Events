const detalleTarjeta = document.getElementById("card-detail");

console.log(detalleTarjeta);

const params = new URLSearchParams(location.search);

const id = params.get("id");

let tarjeta = data.events.find(element => element._id === id);
console.log(tarjeta);

function crearTarjetaConInner(evento){
    return `
    <div class="row g-0">
        <div class="col-md-4">
        <img src="${evento.image}" class=" w-100 h-75 rounded-start" alt="..." >
        </div>
        <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">Date: ${evento.date}<br>
            Description: ${evento.description}<br>
            Category: ${evento.category}<br>
            Place: ${evento.place}<br>
            Capacity: ${evento.capacity}<br>
            ${evento.assistance ? "Assistance: " + evento.assistance: "Estimate: " + evento.estimate}<br>
            Price: ${evento.price}</p>
        </div>
        </div>
    </div>`
}

function pintarTarjetas(data, detalleTarjeta){
    let template = "";
    template += crearTarjetaConInner(data);
    detalleTarjeta.innerHTML = template;
}

pintarTarjetas(tarjeta, detalleTarjeta);