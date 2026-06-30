const mapa = L.map("map").setView([-14.2350, -51.9253], 4);
const campoPesquisa = document.getElementById("pesquisar");
const listaPontos = document.getElementById("listaPontos");
const posicaoInicial = [-14.2350, -51.9253];
const zoomInicial = 4;

let marcadores = [];
let locaisPesquisados = JSON.parse(localStorage.getItem("travelsync:pontosMapa") || "[]");

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OpenStreetMap"
}).addTo(mapa);

function salvarPontos() {
  localStorage.setItem("travelsync:pontosMapa", JSON.stringify(locaisPesquisados.slice(0, 12)));
}

function limparMarcadores() {
  marcadores.forEach((marker) => mapa.removeLayer(marker));
  marcadores = [];
}

function adicionarMarcador(local, abrirPopup = false) {
  const marker = L.marker([Number(local.latitude), Number(local.longitude)])
    .addTo(mapa)
    .bindPopup(`<strong>${local.nome}</strong><br>${local.descricao || ""}`);

  if (abrirPopup) marker.openPopup();
  marcadores.push(marker);
}

function mostrarListaPontos() {
  if (!listaPontos) return;

  if (!locaisPesquisados.length) {
    listaPontos.innerHTML = `<p>Nenhum ponto pesquisado ainda.</p>`;
    return;
  }

  listaPontos.innerHTML = locaisPesquisados.map((local, index) => `
    <article class="ponto-mapa">
      <strong>${local.nome}</strong>
      <span>${Number(local.latitude).toFixed(4)}, ${Number(local.longitude).toFixed(4)}</span>
      <button type="button" data-ver-ponto="${index}">Ver no mapa</button>
    </article>
  `).join("");

  listaPontos.querySelectorAll("[data-ver-ponto]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const local = locaisPesquisados[Number(botao.dataset.verPonto)];
      mapa.setView([Number(local.latitude), Number(local.longitude)], 14);
      limparMarcadores();
      adicionarMarcador(local, true);
    });
  });
}

async function carregarLocais() {
  const locaisBase = [
    { nome: "Fernando de Noronha", descricao: "Destino de praia em Pernambuco", latitude: -3.8549, longitude: -32.4233 },
    { nome: "Gramado", descricao: "Destino serrano no Rio Grande do Sul", latitude: -29.3788, longitude: -50.8738 },
    { nome: "Foz do Iguacu", descricao: "Cataratas e natureza no Parana", latitude: -25.5163, longitude: -54.5854 }
  ];

  const destinosAdmin = JSON.parse(localStorage.getItem("travelsync:destinosAdmin") || "[]");
  const locaisAdmin = destinosAdmin
    .filter((destino) => destino.coordenadas)
    .map((destino) => ({
      nome: destino.nome,
      descricao: destino.descricao,
      latitude: destino.coordenadas[0],
      longitude: destino.coordenadas[1]
    }));

  limparMarcadores();
  [...locaisBase, ...locaisAdmin, ...locaisPesquisados].forEach((local) => adicionarMarcador(local));
  mostrarListaPontos();
}

async function pesquisarLocal() {
  const termo = campoPesquisa.value.trim();

  if (!termo) {
    alert("Digite um local para pesquisar.");
    return;
  }

  try {
    const resposta = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(termo)}`);
    const locais = await resposta.json();

    if (!locais.length) {
      alert("Local nao encontrado.");
      return;
    }

    const local = {
      nome: locais[0].display_name,
      descricao: "Ponto pesquisado no mapa",
      latitude: Number(locais[0].lat),
      longitude: Number(locais[0].lon)
    };

    locaisPesquisados.unshift(local);
    locaisPesquisados = locaisPesquisados.slice(0, 12);
    salvarPontos();

    limparMarcadores();
    adicionarMarcador(local, true);
    mapa.setView([local.latitude, local.longitude], 14);
    mostrarListaPontos();
  } catch (erro) {
    alert("Nao foi possivel pesquisar agora. Verifique sua internet e tente novamente.");
  }
}

document.getElementById("botao").addEventListener("click", pesquisarLocal);
campoPesquisa.addEventListener("keydown", (event) => {
  if (event.key === "Enter") pesquisarLocal();
});

document.getElementById("voltar").addEventListener("click", () => {
  mapa.setView(posicaoInicial, zoomInicial);
  carregarLocais();
});

document.getElementById("pontos").addEventListener("click", () => {
  mostrarListaPontos();
  listaPontos?.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

carregarLocais();