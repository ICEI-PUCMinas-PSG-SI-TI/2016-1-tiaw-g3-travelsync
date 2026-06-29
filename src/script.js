





// Código do Pedro



const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const btnSearch = document.getElementById('btnSearch');
const dateFilter = document.getElementById('dateFilter');
const cardsGrid = document.getElementById('cardsGrid');
const noResults = document.getElementById('noResults');
const resultsCount = document.getElementById('resultsCount');
const btnLoadMore = document.getElementById('btnLoadMore');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

let activeCategory = '';
let activeCity = '';
let activeDate = '';

function getCards() {
  return Array.from(cardsGrid.querySelectorAll('.card'));
}

function normalizeStr(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function getSuggestions() {
  return getCards().map(card => card.dataset.name);
}

function showSuggestions() {
  const query = normalizeStr(searchInput.value.trim());

  const suggestions = getCards().filter(card => {
    const name = normalizeStr(card.dataset.name || '');
    const city = normalizeStr(card.dataset.cidade || '');
    const category = normalizeStr(card.dataset.categoria || '');

    return !query || name.includes(query) || city.includes(query) || category.includes(query);
  });

  searchSuggestions.innerHTML = '';

  suggestions.forEach(card => {
    const name = card.dataset.name;
    const city = card.dataset.cidade;
    const category = card.dataset.categoria;
    const img = card.querySelector('img').src;

    const item = document.createElement('div');
    item.classList.add('suggestion-card');

    item.innerHTML = `
      <img src="${img}" alt="${name}">
      <div>
        <h4>${name}</h4>
        <p>${city}</p>
        <span>${category}</span>
      </div>
    `;

    item.addEventListener('click', () => {
      searchInput.value = name;
      searchSuggestions.classList.remove('open');
      filterCards();
    });

    searchSuggestions.appendChild(item);
  });

  searchSuggestions.classList.toggle('open', suggestions.length > 0);
}

function filterCards() {
  const query = normalizeStr(searchInput.value.trim());
  const cards = getCards();
  let visible = 0;

  cards.forEach(card => {
    const name = normalizeStr(card.dataset.name || '');
    const cat = card.dataset.categoria || '';
    const city = card.dataset.cidade || '';
    const cardDate = card.dataset.data || '';

    const matchSearch = !query || name.includes(query);
    const matchCat = !activeCategory || cat === activeCategory;
    const matchCity = !activeCity || city === activeCity;
    const matchDate = !activeDate || cardDate === activeDate;

    if (matchSearch && matchCat && matchCity && matchDate) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  resultsCount.textContent = visible + (visible === 1 ? ' resultado' : ' resultados');
  noResults.style.display = visible === 0 ? 'block' : 'none';
}

searchInput.addEventListener('input', () => {
  showSuggestions();
  filterCards();
});
btnSearch.addEventListener('click', filterCards);

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') filterCards();
});
searchInput.addEventListener('focus', showSuggestions);

document.addEventListener('click', e => {
  if (!e.target.closest('.search-box')) {
    searchSuggestions.classList.remove('open');
  }
});

dateFilter.addEventListener('change', () => {
  activeDate = dateFilter.value;
  filterCards();
});

function setupDropdown(selectId, dropdownId, labelId, onSelect) {
  const select = document.getElementById(selectId);
  const dropdown = document.getElementById(dropdownId);
  const label = document.getElementById(labelId);

  select.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
    select.classList.toggle('active');
  });

  dropdown.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const value = item.dataset.value;
      label.textContent = item.textContent;
      dropdown.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      dropdown.classList.remove('open');
      select.classList.remove('active');
      onSelect(value);
      filterCards();
    });
  });
}

setupDropdown('catSelect', 'catDropdown', 'catLabel', val => { activeCategory = val; });
setupDropdown('cidSelect', 'cidDropdown', 'cidLabel', val => { activeCity = val; });

document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.filter-select').forEach(s => s.classList.remove('active'));
});

document.querySelectorAll('.dropdown').forEach(d => {
  d.addEventListener('click', e => e.stopPropagation());
});

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

btnLoadMore.addEventListener('click', () => {
  btnLoadMore.textContent = 'Carregando...';
  btnLoadMore.disabled = true;
  setTimeout(() => {
    btnLoadMore.textContent = 'Não há mais eventos';
    btnLoadMore.style.opacity = '0.5';
    btnLoadMore.style.cursor = 'default';
  }, 1200);
});

document.querySelectorAll('.btn-detalhes').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.card');
    const name = card.dataset.name;
    const city = card.dataset.cidade;
    alert('Detalhes de: ' + name + '\nLocalização: ' + city);
  });
});

filterCards();

