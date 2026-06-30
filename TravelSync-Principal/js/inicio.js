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
    roteiro: ["Encontro com guia local", "Trilha leve a moderada", "Banho na cachoeira", "Retorno no fim da tarde"],
    dicas: "Leve tenis fechado, agua e protetor solar."
  },
  "Feira Gastronômica de Recife": {
    titulo: "Feira Gastronômica de Recife",
    resumo: "Evento com pratos regionais, música ao vivo e oficinas culinárias.",
    local: "Recife - PE",
    data: "15/07/2026",
    horario: "18:30",
    preco: "R$ 40 a R$ 120",
    roteiro: ["Praça gastronômica", "Chef ao vivo", "Show regional", "Sobremesas"],
    dicas: "Chegue cedo."
  },
  "Salvador Historico": {
    titulo: "Salvador Historico",
    resumo: "Tour pelo Pelourinho e pontos culturais da cidade.",
    local: "Salvador - BA",
    data: "25/06/2026",
    horario: "09:00",
    preco: "R$ 120",
    roteiro: ["Pelourinho", "Elevador Lacerda", "Mercado Modelo"],
    dicas: "Use roupas confortáveis."
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
  return Object.keys(detalhesEventos).find(
    (chave) => normalizarTexto(chave) === normalizado
  ) || nome;
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
      <img src="${card.querySelector("img").src}">
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

  resultsCount.textContent = `${visible} resultado${visible === 1 ? "" : "s"}`;
  noResults.style.display = visible === 0 ? "block" : "none";
}

function showDetalheCard(card, detalhe, imagem) {
  document.querySelectorAll(".card-detalhe").forEach(el => el.remove());

  const cardDetalhe = document.createElement("div");
  cardDetalhe.className = "card card-detalhe";

  cardDetalhe.innerHTML = `
    <button class="fechar-detalhe">×</button>
    <img src="${imagem}">
    <div class="card-content">
      <span class="rotulo-secao">${card.dataset.categoria || ""}</span>
      <h3>${detalhe.titulo}</h3>
      <p>${detalhe.resumo}</p>
      <p><strong>Local:</strong> ${detalhe.local}</p>
      <p><strong>Data:</strong> ${detalhe.data}</p>
      <p><strong>Horário:</strong> ${detalhe.horario}</p>
      <p><strong>Preço:</strong> ${detalhe.preco}</p>
      <ul>
        ${detalhe.roteiro.map(i => `<li>${i}</li>`).join("")}
      </ul>
      <p><strong>Dica:</strong> ${detalhe.dicas}</p>
    </div>
  `;

  btnLoadMore.parentNode.insertBefore(cardDetalhe, btnLoadMore);

  cardDetalhe.querySelector(".fechar-detalhe").addEventListener("click", () => {
    cardDetalhe.remove();
  });

  cardDetalhe.scrollIntoView({ behavior: "smooth" });
}

function abrirDetalhesEvento(card) {
  const nome = card.dataset.name;

  const detalhe = detalhesEventos[chaveEvento(nome)] || {
    titulo: nome,
    resumo: card.querySelector(".card-desc")?.textContent || "",
    local: card.dataset.cidade,
    data: card.dataset.data,
    horario: "A confirmar",
    preco: "Consulte",
    roteiro: [],
    dicas: ""
  };

  const imagem = card.querySelector("img").src;

  showDetalheCard(card, detalhe, imagem);
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
      dropdown.querySelectorAll(".dropdown-item").forEach(op => op.classList.remove("selected"));
      item.classList.add("selected");
      dropdown.classList.remove("open");
      select.classList.remove("active");
      onSelect(item.dataset.value);
      filterCards();
    });
  });
}

searchInput.addEventListener("input", () => {
  showSuggestions();
  filterCards();
});

btnSearch.addEventListener("click", filterCards);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") filterCards();
});

searchInput.addEventListener("focus", showSuggestions);

dateFilter.addEventListener("change", () => {
  activeDate = dateFilter.value;
  filterCards();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-box")) {
    searchSuggestions.classList.remove("open");
  }
});

document.querySelectorAll(".btn-detalhes").forEach((btn) => {
  btn.addEventListener("click", function () {
    abrirDetalhesEvento(this.closest(".card"));
  });
});

btnLoadMore.addEventListener("click", () => {
  btnLoadMore.textContent = "Nao ha mais eventos";
  btnLoadMore.disabled = true;
  btnLoadMore.style.opacity = "0.5";
});

setupDropdown("catSelect", "catDropdown", "catLabel", (v) => activeCategory = v);
setupDropdown("cidSelect", "cidDropdown", "cidLabel", (v) => activeCity = v);

filterCards();