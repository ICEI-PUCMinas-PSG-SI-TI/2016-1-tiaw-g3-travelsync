const linksMenu = document.querySelectorAll("[data-view]");
const abrirMenu = document.querySelector(".botao-menu");
const menuLateral = document.querySelector(".menu-lateral");
const fecharMenu = document.querySelector(".fechar-menu");
const fundoMenu = document.querySelector(".fundo-menu");
const buscaTopo = document.querySelector("#buscaTopo");

function abrirMenuLateral() {
  menuLateral.classList.add("aberto");
  fundoMenu.classList.add("aberto");
}

function fecharMenuLateral() {
  menuLateral.classList.remove("aberto");
  fundoMenu.classList.remove("aberto");
}

function marcarMenu(tela) {
  linksMenu.forEach((botao) => {
    botao.classList.toggle("ativo", botao.dataset.view === tela);
  });
}

linksMenu.forEach((botao) => {
  botao.addEventListener("click", () => {
    const tela = botao.dataset.view;
    marcarMenu(tela);
    fecharMenuLateral();

    document.dispatchEvent(
      new CustomEvent("travelsync:navegar", {
        detail: { tela }
      })
    );
  });
});

if (buscaTopo) {
  buscaTopo.addEventListener("input", (event) => {
    document.dispatchEvent(
      new CustomEvent("travelsync:buscar", {
        detail: { texto: event.target.value }
      })
    );
  });
}

abrirMenu.addEventListener("click", abrirMenuLateral);
fecharMenu.addEventListener("click", fecharMenuLateral);
fundoMenu.addEventListener("click", fecharMenuLateral);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") fecharMenuLateral();
});
