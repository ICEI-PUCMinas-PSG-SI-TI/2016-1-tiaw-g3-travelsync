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
let favoritos = [];

function pegarUsuarioLogado() {
  return JSON.parse(sessionStorage.getItem("usuarioLogado") || "null");
}

function usuarioAdmin() {
  const usuario = pegarUsuarioLogado();
  return !!usuario && (usuario.admin || usuario.email === "admin@gmail" || usuario.email === "admin@gmail.com");
}

function lerFavoritosMenu() {
  return JSON.parse(localStorage.getItem("travelsync:favoritos") || "[]");
}

function atualizarMenuUsuario() {
  const usuario = pegarUsuarioLogado();
  const favoritosSalvos = lerFavoritosMenu();
  const adminLinks = document.querySelectorAll("[data-admin-link]");
  const linkContaTopo = document.querySelector(".perfil-topo a");
  const botaoSair = document.getElementById("btnSair");

  if (totalFavoritos) totalFavoritos.textContent = String(favoritosSalvos.length);

  adminLinks.forEach((link) => {
    link.hidden = !usuarioAdmin();
  });

  if (linkContaTopo) {
    linkContaTopo.href = usuario ? "perfil.html" : "login.html";
    linkContaTopo.textContent = usuario ? `Ola, ${usuario.nome || usuario.usuario || "usuario"}` : "Minha conta";
  }

  if (botaoSair) {
    botaoSair.hidden = !usuario;
  }
}

function marcarPaginaAtual() {
  const arquivo = window.location.pathname.split("/").pop();
  const telaPorArquivo = {
    "index.html": "inicio",
    "destinos.html": "destinos",
    "minimapa.html": "grupo",
    "cadastro_locais.html": "planejar",
    "login.html": "perfil",
    "cadatro_usuario.html": "perfil",
    "perfil.html": "perfil"
  };
  const tela = telaPorArquivo[arquivo] || "inicio";

  linksMenu.forEach((botao) => {
    botao.classList.toggle("ativo", botao.dataset.view === tela);
  });
}

function destacarOpcaoMenu(tela) {
  paginaAtual = tela;
  linksMenu.forEach((botao) => {
    botao.classList.toggle("ativo", botao.dataset.view === tela);
  });
  fecharMenuLateral();
}

function abrirMenuLateral() {
  if (!menuLateral || !fundoMenu) return;
  menuLateral.classList.add("aberto");
  fundoMenu.classList.add("aberto");
}

function fecharMenuLateral() {
  if (!menuLateral || !fundoMenu) return;
  menuLateral.classList.remove("aberto");
  fundoMenu.classList.remove("aberto");
}

function sairDaConta() {
  sessionStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

function abrirFavoritosDoMenu(event) {
  if (event) event.preventDefault();

  if (typeof mostrarFavoritos === "function" && areaConteudo) {
    mostrarFavoritos();
    return;
  }

  window.location.href = "destinos.html#favoritos";
}

if (abrirMenu) abrirMenu.addEventListener("click", abrirMenuLateral);
if (fecharMenu) fecharMenu.addEventListener("click", fecharMenuLateral);
if (fundoMenu) fundoMenu.addEventListener("click", fecharMenuLateral);

document.addEventListener("DOMContentLoaded", () => {
  atualizarMenuUsuario();
  marcarPaginaAtual();

  document.querySelectorAll("[data-favoritos-menu]").forEach((link) => {
    link.addEventListener("click", abrirFavoritosDoMenu);
  });

  const btnSair = document.getElementById("btnSair");
  if (btnSair) btnSair.addEventListener("click", sairDaConta);
});
