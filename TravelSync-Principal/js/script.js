const areaConteudo = document.querySelector("#areaConteudo");
const linksMenu = document.querySelectorAll("[data-view]");
const totalFavoritos = document.querySelector("#totalFavoritos");
const buscaTopo = document.querySelector("#buscaTopo");
const abrirMenu = document.querySelector(".botao-menu");
const menuLateral = document.querySelector(".menu-lateral");
const fecharMenu = document.querySelector(".fechar-menu");
const fundoMenu = document.querySelector(".fundo-menu");

let catalogoDestinos = [];
let paginaAtual = "destinos";
let destinoEscolhido = null;
let abaAtual = "sobre";
let fotoGaleria = 0;
let timerGaleria = null;
let mapaDestinoAberto = null;
let filtrosVisiveis = false;
let historico = JSON.parse(localStorage.getItem("travelsync:historico") || "[]");


function destacarOpcaoMenu(tela) {
  paginaAtual = tela;
  linksMenu.forEach((botao) => {
    botao.classList.toggle("ativo", botao.dataset.view === tela);
  });
  fecharMenuLateral();
}

function abrirMenuLateral() {
  menuLateral.classList.add("aberto");
  fundoMenu.classList.add("aberto");
}

function fecharMenuLateral() {
  menuLateral.classList.remove("aberto");
  fundoMenu.classList.remove("aberto");
}

if (abrirMenu) {
  abrirMenu.addEventListener("click", abrirMenuLateral);
}

if (fecharMenu) {
  fecharMenu.addEventListener("click", fecharMenuLateral);
}

if (fundoMenu) {
  fundoMenu.addEventListener("click", fecharMenuLateral);
}