const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");
const btnSearch = document.getElementById("btnSearch");
const dateFilter = document.getElementById("dateFilter");
const cardsGrid = document.getElementById("cardsGrid");
const noResults = document.getElementById("noResults");
const resultsCount = document.getElementById("resultsCount");
const btnLoadMore = document.getElementById("btnLoadMore");

let activeCategory = "";
let activeCity = "";
let activeDate = "";

const detalhesEventos = {
  "Cachoeira do Paraiso": {
    titulo: "Cachoeira do Paraiso",
    resumo: "Trilha guiada ate uma cachoeira cercada por mata, mirantes e banho em agua natural.",
    local: "Chapada Diamantina - BA",
    data: "10/06/2026",
    horario: "08:00",
    preco: "R$ 180 por pessoa",
    roteiro: ["Encontro com guia local", "Trilha leve a moderada", "Parada para banho", "Retorno no fim da tarde"],
    dicas: "Leve tenis fechado, garrafa de agua, lanche leve e protetor solar."
  },
  "Feira Gastronômica de Recife": {
    titulo: "Feira Gastronômica de Recife",
    resumo: "Evento noturno com pratos regionais, barracas de produtores locais, música ao vivo e oficinas rápidas de culinária.",
    local: "Recife - PE",
    data: "15/07/2026",
    horario: "18:30",
    preco: "R$ 40 a R$ 120",
    roteiro: ["Praça gastronômica", "Aula aberta com chef convidado", "Show regional", "Degustação de sobremesas"],
    dicas: "Chegue cedo para pegar mesa e conferir a programação das oficinas."
  },
  "Salvador Historico": {
    titulo: "Salvador Historico",
    resumo: "Tour pelo Pelourinho, igrejas, mirantes e pontos culturais marcantes da cidade.",
    local: "Salvador - BA",
    data: "25/06/2026",
    horario: "09:00",
    preco: "R$ 120 por pessoa",
    roteiro: ["Pelourinho", "Elevador Lacerda", "Mercado Modelo", "Igrejas historicas"],
    dicas: "Use roupa confortavel e separe tempo para experimentar a gastronomia local."
  },
  "Workshop de HTML e CSS": {
    titulo: "Workshop de HTML e CSS",
    resumo: "Aula pratica para montar uma pagina web simples, com estrutura HTML e estilização CSS.",
    local: "Belo Horizonte - MG",
    data: "20/05/2026",
    horario: "14:00",
    preco: "Entrada gratuita",
    roteiro: ["Introducao ao HTML", "Estilizacao com CSS", "Exercicio pratico", "Publicacao do projeto"],
    dicas: "Leve notebook carregado e tenha uma conta no GitHub."
  },
  "Mostra de Cinema de Ouro Preto": {
    titulo: "Mostra de Cinema de Ouro Preto",
    resumo: "Mostra cultural com sessões de cinema, debates com convidados e atividades no centro histórico.",
    local: "Ouro Preto - MG",
    data: "05/08/2026",
    horario: "19:00",
    preco: "Entrada gratuita mediante retirada",
    roteiro: ["Sessão de abertura", "Debate com realizadores", "Mostra de curtas", "Encerramento musical"],
    dicas: "Retire o ingresso com antecedencia e confira a classificação das sessões."
  },
  "Festival Cultural BH": {
    titulo: "Festival Cultural BH",
    resumo: "Evento com musica, gastronomia, exposicoes e atividades culturais pela capital mineira.",
    local: "Belo Horizonte - MG",
    data: "12/09/2026",
    horario: "18:00",
    preco: "R$ 60 a R$ 140",
    roteiro: ["Shows ao vivo", "Pracas gastronomicas", "Feira criativa", "Espacos de arte"],
    dicas: "Chegue cedo para evitar filas e confira a programacao do palco principal."
  }
};

function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getCards() {
  return Array.from(cardsGrid.querySelectorAll(".card"));
}

function chaveEvento(nome) {
  const normalizado = normalizarTexto(nome);
  return Object.keys(detalhesEventos).find((chave) => normalizarTexto(chave) === normalizado) || nome;
}

function showSuggestions() {
  const query = normalizarTexto(searchInput.value.trim());
  const suggestions = getCards().filter((card) => {
    const name = normalizarTexto(card.dataset.name || "");
    const city = normalizarTexto(card.dataset.cidade || "");
    const category = normalizarTexto(card.dataset.categoria || "");
    return !query || name.includes(query) || city.includes(query) || category.includes(query);
  });

  searchSuggestions.innerHTML = "";
  suggestions.forEach((card) => {
    const item = document.createElement("div");
    item.classList.add("suggestion-card");
    item.innerHTML = `
      <img src="${card.querySelector("img").src}" alt="${card.dataset.name}">
      <div>
        <h4>${card.dataset.name}</h4>
        <p>${card.dataset.cidade}</p>
        <span>${card.dataset.categoria}</span>
      </div>
    `;

    item.addEventListener("click", () => {
      searchInput.value = card.dataset.name;
      searchSuggestions.classList.remove("open");
      filterCards();
    });

    searchSuggestions.appendChild(item);
  });

  searchSuggestions.classList.toggle("open", suggestions.length > 0);
}

function filterCards() {
  const query = normalizarTexto(searchInput.value.trim());
  let visible = 0;

  getCards().forEach((card) => {
    const name = normalizarTexto(card.dataset.name || "");
    const cat = card.dataset.categoria || "";
    const city = card.dataset.cidade || "";
    const cardDate = card.dataset.data || "";

    const matchSearch = !query || name.includes(query);
    const matchCat = !activeCategory || cat === activeCategory;
    const matchCity = !activeCity || city === activeCity;
    const matchDate = !activeDate || cardDate === activeDate;
    const aparece = matchSearch && matchCat && matchCity && matchDate;

    card.classList.toggle("hidden", !aparece);
    if (aparece) visible++;
  });

  resultsCount.textContent = visible + (visible === 1 ? " resultado" : " resultados");
  noResults.style.display = visible === 0 ? "block" : "none";
}

function setupDropdown(selectId, dropdownId, labelId, onSelect) {
  const select = document.getElementById(selectId);
  const dropdown = document.getElementById(dropdownId);
  const label = document.getElementById(labelId);

  select.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.classList.toggle("open");
    select.classList.toggle("active");
  });

  dropdown.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      label.textContent = item.textContent;
      dropdown.querySelectorAll(".dropdown-item").forEach((opcao) => opcao.classList.remove("selected"));
      item.classList.add("selected");
      dropdown.classList.remove("open");
      select.classList.remove("active");
      onSelect(item.dataset.value);
      filterCards();
    });
  });
}

function abrirDetalhesEvento(card) {
  const nome = card.dataset.name;
  const detalhe = detalhesEventos[chaveEvento(nome)] || {
    titulo: nome,
    resumo: card.querySelector(".card-desc")?.textContent || "Evento cadastrado no TravelSync.",
    local: card.dataset.cidade,
    data: card.dataset.data,
    horario: "Horario a confirmar",
    preco: "Consulte valores",
    roteiro: ["Informacoes gerais", "Atividades do evento", "Orientacoes para visitantes"],
    dicas: "Confira os detalhes antes de finalizar o planejamento."
  };
  const imagem = card.querySelector("img").src;
  const painelAntigo = document.getElementById("detalhesEventoHome");

  if (painelAntigo) painelAntigo.remove();

  const painel = document.createElement("section");
  painel.id = "detalhesEventoHome";
  painel.className = "detalhe-evento-home";
  painel.innerHTML = `
    <button type="button" class="fechar-detalhe-evento" aria-label="Fechar detalhes">x</button>
    <img src="${imagem}" alt="${detalhe.titulo}">
    <div>
      <span class="rotulo-secao">${card.dataset.categoria}</span>
      <h2>${detalhe.titulo}</h2>
      <p>${detalhe.resumo}</p>
      <div class="evento-info">
        <span><strong>Local:</strong> ${detalhe.local}</span>
        <span><strong>Data:</strong> ${detalhe.data}</span>
        <span><strong>Horario:</strong> ${detalhe.horario}</span>
        <span><strong>Valor:</strong> ${detalhe.preco}</span>
      </div>
      <h3>O que inclui</h3>
      <ul>${detalhe.roteiro.map((item) => `<li>${item}</li>`).join("")}</ul>
      <p class="dica-evento"><strong>Dica:</strong> ${detalhe.dicas}</p>
      <div class="acoes-evento">
        ${detalhe.destino ? `<a href="destinos.html?destino=${encodeURIComponent(detalhe.destino)}">Abrir destino completo</a>` : `<a href="destinos.html">Ver destinos relacionados</a>`}
        <a href="minimapa.html">Ver no mapa</a>
      </div>
    </div>
  `;

  document.querySelector(".events-section .container").appendChild(painel);
  painel.querySelector(".fechar-detalhe-evento").addEventListener("click", () => painel.remove());
  painel.scrollIntoView({ behavior: "smooth", block: "start" });
}

searchInput.addEventListener("input", () => {
  showSuggestions();
  filterCards();
});
btnSearch.addEventListener("click", filterCards);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") filterCards();
});
searchInput.addEventListener("focus", showSuggestions);
dateFilter.addEventListener("change", () => {
  activeDate = dateFilter.value;
  filterCards();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-box")) searchSuggestions.classList.remove("open");
  document.querySelectorAll(".dropdown").forEach((dropdown) => dropdown.classList.remove("open"));
  document.querySelectorAll(".filter-select").forEach((select) => select.classList.remove("active"));
});

document.querySelectorAll(".dropdown").forEach((dropdown) => {
  dropdown.addEventListener("click", (event) => event.stopPropagation());
});

setupDropdown("catSelect", "catDropdown", "catLabel", (value) => activeCategory = value);
setupDropdown("cidSelect", "cidDropdown", "cidLabel", (value) => activeCity = value);

btnLoadMore.addEventListener("click", () => {
  btnLoadMore.textContent = "Nao ha mais eventos";
  btnLoadMore.disabled = true;
  btnLoadMore.style.opacity = "0.55";
});

document.querySelectorAll(".btn-detalhes").forEach((btn) => {
  btn.addEventListener("click", function () {
    abrirDetalhesEvento(this.closest(".card"));
  });
});

filterCards();
