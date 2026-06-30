const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado") || "null");

if (!usuario) {
  alert("Entre na sua conta para editar o perfil.");
  window.location.href = "login.html";
}

if (usuario) {
  const form = document.getElementById("formPerfil");
  const msg = document.getElementById("msg");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const foto = document.getElementById("foto");
  const bio = document.getElementById("bio");
  const fotoPreview = document.getElementById("fotoPreview");
  const listaReservas = document.getElementById("listaReservas");

  function carregarPerfil() {
    nome.value = usuario.nome || "";
    email.value = usuario.email || "";
    foto.value = usuario.foto || "";
    bio.value = usuario.bio || "";
    fotoPreview.src = usuario.foto || "https://via.placeholder.com/120";
  }

  foto.addEventListener("input", () => {
    fotoPreview.src = foto.value || "https://via.placeholder.com/120";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const usuarioAtualizado = {
      ...usuario,
      nome: nome.value.trim(),
      email: email.value.trim().toLowerCase(),
      foto: foto.value.trim(),
      bio: bio.value.trim()
    };

    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios = usuarios.map((item) => item.id === usuario.id ? usuarioAtualizado : item);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    msg.textContent = "Perfil atualizado com sucesso.";
    setTimeout(() => (msg.textContent = ""), 2500);
  });

  function lerReservas() {
    return JSON.parse(localStorage.getItem("travelsync:reservas") || "[]");
  }

  function salvarReservas(reservas) {
    localStorage.setItem("travelsync:reservas", JSON.stringify(reservas));
  }

  function minhasReservas() {
    return lerReservas().filter((r) => String(r.usuarioId) === String(usuario.id));
  }

  function renderizarReservas() {
    const reservas = minhasReservas();

    if (!reservas.length) {
      listaReservas.innerHTML = `<p>Você ainda não fez nenhuma reserva.</p>`;
      return;
    }

    listaReservas.innerHTML = reservas.map((r) => `
      <article class="cartao-reserva" data-reserva-id="${r.id}">
        <img src="${r.destinoImagem}" alt="${r.destinoNome}" />
        <div>
          <h3>${r.destinoNome}</h3>
          <p>${r.inicio || "?"} até ${r.fim || "?"} • ${r.dias} dia(s)</p>
          <p>${r.adultos} adulto(s), ${r.criancas} criança(s) • ${r.quartos} quarto(s)</p>
          <p><strong>Total: R$ ${r.total}</strong></p>
          <p>Pagamento: ${r.pagamento}</p>
          <div class="acoes-reserva">
            <button type="button" data-editar-reserva="${r.destinoId}">Editar</button>
            <button type="button" data-excluir-reserva="${r.id}">Excluir</button>
          </div>
        </div>
      </article>
    `).join("");

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

  carregarPerfil();
  renderizarReservas();
}