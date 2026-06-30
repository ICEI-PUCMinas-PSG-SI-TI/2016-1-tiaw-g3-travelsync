const usuarioParaReservas = JSON.parse(sessionStorage.getItem("usuarioLogado") || "null");
const listaReservas = document.getElementById("listaReservas");

if (listaReservas) {
  if (!usuarioParaReservas) {
    listaReservas.innerHTML = `<p>Entre na sua conta para ver suas reservas.</p>`;
  } else {
    renderizarReservas();
  }
}

function lerReservas() {
  return JSON.parse(localStorage.getItem("travelsync:reservas") || "[]");
}

function salvarReservas(reservas) {
  localStorage.setItem("travelsync:reservas", JSON.stringify(reservas));
}

function minhasReservas() {
  return lerReservas().filter((r) => String(r.usuarioId) === String(usuarioParaReservas.id));
}
function renderizarReservas() {
  const reservas = minhasReservas();

  if (!reservas.length) {
    listaReservas.innerHTML = `<p class="mensagem-vazia">Você ainda não fez nenhuma reserva.</p>`;
    return;
  }

  listaReservas.innerHTML = `
    <div class="grade-reservas">
      ${reservas.map((r) => `
        <article class="cartao-reserva" data-reserva-id="${r.id}">
          <img class="imagem-reserva" src="${r.destinoImagem}" alt="${r.destinoNome}" />
          <div class="corpo-reserva">
            <div class="topo-reserva">
              <h3>${r.destinoNome}</h3>
              <span class="status-reserva">Confirmada</span>
            </div>
            <p class="datas-reserva">⌖ ${r.inicio || "?"} até ${r.fim || "?"} • ${r.dias} dia${r.dias == 1 ? "" : "s"}</p>
            <div class="info-reserva">
              <span>${r.adultos} adulto${r.adultos == 1 ? "" : "s"}</span>
              <span>${r.criancas} criança${r.criancas == 1 ? "" : "s"}</span>
              <span>${r.quartos} quarto${r.quartos == 1 ? "" : "s"}</span>
            </div>
            <p class="pagamento-reserva">${r.pagamento}</p>
            <div class="rodape-reserva">
              <span class="total-reserva">R$ ${r.total}</span>
              <div class="acoes-reserva">
                <button type="button" class="botao-editar-reserva" data-editar-reserva="${r.destinoId}">Editar</button>
                <button type="button" class="botao-excluir-reserva" data-excluir-reserva="${r.id}">Excluir</button>
              </div>
            </div>
          </div>
        </article>
      `).join("")}
    </div>
  `;

  listaReservas.querySelectorAll("[data-editar-reserva]").forEach((botao) => {
    botao.addEventListener("click", () => {
      window.location.href = `destinos.html?reservar=${botao.dataset.editarReserva}`;
    });
  });

  listaReservas.querySelectorAll("[data-excluir-reserva]").forEach((botao) => {
    botao.addEventListener("click", () => {
      if (!confirm("Tem certeza que deseja excluir esta reserva?")) return;
      const id = Number(botao.dataset.excluirReserva);
      const reservas = lerReservas().filter((r) => r.id !== id);
      salvarReservas(reservas);
      renderizarReservas();
    });
  });
}