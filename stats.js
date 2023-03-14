const $tabla1 = document.getElementById("table-1");
const $tabla2 = document.getElementById("table-2");
const $tabla3 = document.getElementById("table-3");


const url = "https://mindhub-xj03.onrender.com/api/amazing";
fetch(url)
.then(response => response.json())
.then(data => {

    const listaPorcentajes = data.events.map(evento => {
        const aux = Object.assign({}, evento);
        aux.porcentaje = (evento.assistance) / (evento.capacity);
        return aux})
    .filter(evento => evento.porcentaje);

    const listaOrdenadaPorcentaje = listaPorcentajes.sort((a, b) => b.porcentaje - a.porcentaje);

    const maxAsistencia = listaOrdenadaPorcentaje.slice(0,1);

    const minAsistencia = listaOrdenadaPorcentaje.slice(-1);


    const listaCapacidades = data.events.filter(evento => evento.capacity);

    const listaOrdenadaCapacidad = listaCapacidades.sort((a, b) => b.capacity - a.capacity);

    const maxPorcentaje = listaOrdenadaCapacidad.slice(0,1);

    function crearTablaUno(){
        const template = `
        <tbody class="table-light">
            <tr class="table-warning">
                <th colspan="3">Events statistics</th>
            </tr>
            <tr>
                <td>Events with the highest porcentage of attendance</td>
                <td>Events with the lowest porcentage of attendance</td>
                <td>Event with larger capacity</td>
            </tr>
            <tr>
                <td>${maxAsistencia[0].name}</td>
                <td>${minAsistencia[0].name}</td>
                <td>${maxPorcentaje[0].name}</td>
            </tr>
        </tbody>
        `
        return template;
    }
    const pintarTabla = crearTablaUno();
    $tabla1.innerHTML = pintarTabla;

//-----------------Tabla 2, Upcoming events------------------//

    function filtrarEventosFuturos(listaEventos){
        let eventosFuturos = [];
        for(let evento of data.events){
            if(evento.date > listaEventos.currentDate){
                eventosFuturos.push(evento);
            }
        }return eventosFuturos;
    }

    const eventosFuturos = filtrarEventosFuturos(data);
    console.log(eventosFuturos);

    //Obtengo una lista nueva las categorias de la data, sin repetir(que es lo que hace el set(crear objeto)). New es un metodo constructor que genera una nueva instancia
    const listaCategorias = Array.from(new Set(eventosFuturos.map(evento => evento.category)));
    console.log(listaCategorias);


    //Creo un array de objetos con cateogrias y el array de eventos adentro.
    const listaGanancias = data.events.filter(evento => evento.estimate);

    const listaEventosFuturos = [];
    listaCategorias.map(category =>
        listaEventosFuturos.push({
            category: category,
            evento: listaGanancias.filter(evento => evento.category  === category)
        }))
    console.log(listaEventosFuturos);

    //Creo un array de objetos que tengan todos los elementos que necesito(Category, estimate, capacity y estimateRevenue)
    const categoriasFuturas = [];
    listaEventosFuturos.map(datos => {
        categoriasFuturas.push({
            category: datos.category,
            estimate: datos.evento.map(item => item.estimate),
            capacity: datos.evento.map(item => item.capacity),
            estimateRevenue: datos.evento.map(item => item.estimate * item.price)
        });
    });
    console.log(categoriasFuturas);

    //Sumo en cada categoria los totales de estimate, capacity y estimateRevenue.
    categoriasFuturas.forEach(category => {
        let totalEstimate = 0;
        category.estimate.forEach(estimate => totalEstimate += Number(estimate));
        category.estimate = totalEstimate;

        let totalCapacityFuturos = 0;
        category.capacity.forEach(capacity => totalCapacityFuturos += Number(capacity));
        category.capacity = totalCapacityFuturos;

        let totalEstimateRevenue = 0;
        category.estimateRevenue.forEach(estimateRevenue => totalEstimateRevenue += Number(estimateRevenue));
        category.estimateRevenue = totalEstimateRevenue;

        category.porcentajeAttendace = ((totalEstimate * 100) / totalCapacityFuturos).toFixed();
    });
    console.log(categoriasFuturas);

    function crearTablaDos(){
        let template = `
        <tbody class="table-light">
            <tr class="table-warning">
            <th colspan="3">Upcoming events statistics by category</th>
            </tr>
            <tr>
                <td>Categories</td>
                <td>Revenues</td>
                <td>Porcentage of attendance</td>
            </tr>
        </tbody>
        `
        categoriasFuturas.forEach(e => {
            e.categoriasFuturas
            template += `
            <tbody class="table-light">
                <tr>
                    <td>${e.category}</td>
                    <td>${e.estimateRevenue} USD</td>
                    <td>${e.porcentajeAttendace}%</td>
                </tr>
            </tbody>
            `
        })
        return template;
    }
    const pintarTablaDos = crearTablaDos();
    $tabla2.innerHTML = pintarTablaDos;

//--------------Tabla 3, Past events----------------//

    function filtrarEventosPasados(listaEventos){
        let eventosPasados = [];
        for(let evento of data.events){
            if(evento.date < listaEventos.currentDate){
                eventosPasados.push(evento);
            }
        }return eventosPasados;
    }

    const eventosPasados = filtrarEventosPasados(data);
    console.log(eventosPasados);

    //Obtengo una lista nueva las categorias de la data, sin repetir(que es lo que hace el set(crear objeto)). New es un metodo constructor que genera una nueva instancia
    const listaCategoriasPasadas = Array.from(new Set(eventosPasados.map(evento => evento.category)));
    console.log(listaCategoriasPasadas);

    const listaAsistencias = data.events.filter(e => e.assistance);
    console.log(listaAsistencias);


    const listaEventosPasados = [];
    listaCategoriasPasadas.map(category =>
        listaEventosPasados.push({
            category: category,
            evento: listaAsistencias.filter(evento => evento.category  === category)
        }))
    console.log(listaEventosPasados);


    //Creo un array de objetos que tengan todos los elementos que necesito(Category, assistance, capacity y estimateRevenue)
    const categoriasPasadas = [];
    listaEventosPasados.map(datos => {
        categoriasPasadas.push({
            category: datos.category,
            assistance: datos.evento.map(item => item.assistance),
            capacity: datos.evento.map(item => item.capacity),
            revenue: datos.evento.map(item => item.assistance * item.price)
        });
    });
    console.log(categoriasPasadas);

    //Sumo en cada categoria los totales de assistance, capacity y revenue.
    categoriasPasadas.forEach(category => {
        let totalAssistance = 0;
        category.assistance.forEach(assistance => totalAssistance += Number(assistance));
        category.assistance = totalAssistance;

        let totalCapacityPasados = 0;
        category.capacity.forEach(capacity => totalCapacityPasados += Number(capacity));
        category.capacity = totalCapacityPasados;

        let totalRevenue = 0;
        category.revenue.forEach(revenue => totalRevenue += Number(revenue));
        category.estimateRevenue = totalRevenue;

        category.porcentajeAttendace = ((totalAssistance * 100) / totalCapacityPasados).toFixed();
    });
    console.log(categoriasPasadas);

    function crearTablaTres(){
        let template = `
        <tbody class="table-light">
            <tr class="table-warning">
                <th colspan="3">Past events statistics by category</th>
            </tr>
            <tr>
                <td>Categories</td>
                <td>Revenues</td>
                <td>Porcentage of attendance</td>
            </tr>
        </tbody>
        `
        categoriasPasadas.forEach(e => {
            e.categoriasPasadas
            template += `
            <tbody class="table-light">
                <tr>
                    <td>${e.category}</td>
                    <td>${e.estimateRevenue} USD</td>
                    <td>${e.porcentajeAttendace}%</td>
                </tr>
            </tbody>
            `
        })
        return template;
    }
    const pintarTablaTres = crearTablaTres();
    $tabla3.innerHTML = pintarTablaTres;
})
.catch(error => console.log(error));

