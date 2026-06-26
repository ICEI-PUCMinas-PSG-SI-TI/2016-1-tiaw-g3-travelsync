
const map = L.map('map').setView([-14.2350, -51.9253], 4); //Aqui tem as coodernadas iniciais do mapa, começa no Brasil

// Essa parte vai fazer o mapa visual, que foi feito através de link de outro site 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
}).addTo(map);

// array de marcadores
let marcador = [];

// dos locais que vão ser pesquisados
let locaisPesquisados = [];

// a posição inicial 
const posicaoInicial = [-14.2350, -51.9253];
const zoomInicial = 4;


// vai buscar o local onde está guardado as informações
async function carregarLocais() {

    const resposta = await fetch("http://localhost:3000/locais");

    const locais = await resposta.json();

    mostrarLocais(locais);
}


// vai mostrar marcadores no inicio do mapa, se clicar no marcador vai aparecer o nome e a descrição, só funciona com os do inicio
function mostrarLocais(locais) {

    locais.forEach(local => {

        const marker = L.marker([
            local.latitude,
            local.longitude
        ])
        .addTo(map)
        .bindPopup(`
            <h3>${local.nome}</h3>
            <p>${local.descricao}</p>
        `);

        marcador.push(marker);
    });
}


// botão da pesquisa
const botao = document.getElementById("botao");

botao.addEventListener("click", async () => {

    const termo = document
        .getElementById("pesquisar")
        .value;

    if (!termo) {
        alert("Digite um local");
        return;
    }


    const resposta = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${termo}` //pega uma API de um site de fora que quando o local for pesquisado, ele aparece no mapa
    );

    const locais = await resposta.json();

    // caso não seja encontrado vai soar o alerta
    if (locais.length === 0) {

        alert("Local não encontrado");

        return;
    }

    // pega o primeiro resultado que aparecer
    const local = locais[0];

    const latitude = local.lat;
    const longitude = local.lon;

    // vai dar um zoom no mapa e coloca-lo na latitude e longitude do local pesquisado
    map.setView(
        [latitude, longitude],
        15
    );

    // criação do marcador encima 
    const marker = L.marker([
        latitude,
        longitude
    ])
    .addTo(map)
    .bindPopup(local.display_name)
    .openPopup();

    marcador.push(marker);

    locaisPesquisados.push({
    nome: local.display_name,
    latitude: latitude,
    longitude: longitude
});
});


// atualizar o mapa de acordo com a pesquisa
function atualizarMapa(locais) {

    // vai tirar a marcação que tinha antes
    marcador.forEach(marker => {
        map.removeLayer(marker);
    });

    marcador = [];

     if (locais.length === 0) {
        return;
    }

    locais.forEach(local => {

        const marker = L.marker([
            local.latitude,
            local.longitude
        ])
        .addTo(map)
        .bindPopup(`
            <h3>${local.nome}</h3>
            <p>${local.descricao}</p>
        `);
        
        marcador.push(marker);

         const primeiroLocal = locais[0]

        map.setView(
            [primeiroLocal.latitude, primeiroLocal.longitude],
            12
        );

        marcador[0].openPopup();
        locaisPesquisados.push(local);
    });
}


// botão voltar
const voltar = document.getElementById("voltar");

voltar.addEventListener("click", () => {

    map.setView(posicaoInicial, zoomInicial);

});


// coloca os pontos que aparecem no mapa embaixo, quando o botão for clicado
const pontos = document.getElementById("pontos");

pontos.addEventListener("click", () => {

    if (locaisPesquisados.length === 0) {

        alert("Nenhum local pesquisado");

        return;
    }

    let mensagem = "PONTOS NO MAPA:\n\n";

    locaisPesquisados.forEach(local => {

        mensagem += `📍 ${local.nome}\n`;

    });

    alert(mensagem);

});


// iniciar
carregarLocais();