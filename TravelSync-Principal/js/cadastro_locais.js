const usuarioAtual = JSON.parse(sessionStorage.getItem("usuarioLogado") || "null");
const podeCadastrar = usuarioAtual && (usuarioAtual.admin || usuarioAtual.email === "admin@gmail" || usuarioAtual.email === "admin@gmail.com");
const formDestino = document.getElementById("formDestino");
const listaCrud = document.getElementById("listaCrud");
let destinosAdmin = JSON.parse(localStorage.getItem("travelsync:destinosAdmin") || "[]");
let idEditando = null;

if (!podeCadastrar) {
  alert("Acesso permitido apenas para administradores.");
  window.location.href = "login.html";
}

function salvarDestinosAdmin() {
  localStorage.setItem("travelsync:destinosAdmin", JSON.stringify(destinosAdmin));
}

function pegarValor(id) {
  return document.getElementById(id).value.trim();
}

function imagensDoFormulario() {
  const imagens = [pegarValor("imagem1"), pegarValor("imagem2"), pegarValor("imagem3")].filter(Boolean);
  return imagens.length ? imagens : ["../assets/imagem/praia.png"];
}

function montarDestino() {
  const precoMin = Number(pegarValor("precoMin") || 0);
  const precoMax = Number(pegarValor("precoMax") || precoMin || 0);
  const tags = pegarValor("tags")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    id: idEditando || Date.now(),
    nome: pegarValor("nome"),
    localizacao: pegarValor("localizacao"),
    descricao: pegarValor("descricao"),
    avaliacao: Number(pegarValor("avaliacao") || 4.5),
    totalAvaliacoes: Number(pegarValor("totalAvaliacoes") || 1),
    precoMin,
    precoMax,
    tipo: pegarValor("tipo"),
    regiao: pegarValor("regiao"),
    duracao: pegarValor("duracao") || "3 a 5 dias",
    tags: tags.length ? tags : [pegarValor("tipo")],
    imagens: imagensDoFormulario(),
    detalhes: {
      localizacaoCurta: pegarValor("localizacaoCurta") || pegarValor("localizacao"),
      clima: pegarValor("clima") || "Tropical",
      temperatura: pegarValor("temperatura") || "20C - 30C",
      melhorEpoca: pegarValor("melhorEpoca") || "Durante o ano",
      custoMedio: `R$ ${precoMin} - R$ ${precoMax} por dia`,
      sobre: pegarValor("sobre") || pegarValor("descricao"),
      comoChegar: pegarValor("comoChegar") || "Consulte rotas e transportes disponiveis para o destino."
    },
    atracoes: pegarValor("atracoes").split(",").map((item) => item.trim()).filter(Boolean),
    dicas: pegarValor("dicas").split(",").map((item) => item.trim()).filter(Boolean),
    avaliacoes: [
      { nome: "Visitante TravelSync", nota: Number(pegarValor("avaliacao") || 4.5), texto: "Destino cadastrado pela equipe." }
    ]
  };
}

function preencherFormulario(destino) {
  idEditando = destino.id;
  document.getElementById("nome").value = destino.nome;
  document.getElementById("localizacao").value = destino.localizacao;
  document.getElementById("descricao").value = destino.descricao;
  document.getElementById("tipo").value = destino.tipo;
  document.getElementById("regiao").value = destino.regiao;
  document.getElementById("precoMin").value = destino.precoMin;
  document.getElementById("precoMax").value = destino.precoMax;
  document.getElementById("avaliacao").value = destino.avaliacao;
  document.getElementById("totalAvaliacoes").value = destino.totalAvaliacoes;
  document.getElementById("duracao").value = destino.duracao || "";
  document.getElementById("tags").value = (destino.tags || []).join(", ");
  document.getElementById("imagem1").value = destino.imagens?.[0] || "";
  document.getElementById("imagem2").value = destino.imagens?.[1] || "";
  document.getElementById("imagem3").value = destino.imagens?.[2] || "";
  document.getElementById("localizacaoCurta").value = destino.detalhes?.localizacaoCurta || "";
  document.getElementById("clima").value = destino.detalhes?.clima || "";
  document.getElementById("temperatura").value = destino.detalhes?.temperatura || "";
  document.getElementById("melhorEpoca").value = destino.detalhes?.melhorEpoca || "";
  document.getElementById("sobre").value = destino.detalhes?.sobre || "";
  document.getElementById("comoChegar").value = destino.detalhes?.comoChegar || "";
  document.getElementById("atracoes").value = (destino.atracoes || []).join(", ");
  document.getElementById("dicas").value = (destino.dicas || []).join(", ");
  document.getElementById("nome").focus();
}

function mostrarDestinosCrud() {
  if (!destinosAdmin.length) {
    listaCrud.innerHTML = `<p class="mensagem-admin">Nenhum destino cadastrado pelo admin ainda.</p>`;
    return;
  }

  listaCrud.innerHTML = destinosAdmin.map((destino) => `
    <article class="item-crud">
      <img src="${destino.imagens[0]}" alt="${destino.nome}">
      <div>
        <strong>${destino.nome}</strong>
        <span>${destino.localizacao}</span>
      </div>
      <button type="button" data-editar="${destino.id}">Editar</button>
      <button type="button" data-excluir="${destino.id}">Excluir</button>
    </article>
  `).join("");

  listaCrud.querySelectorAll("[data-editar]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const destino = destinosAdmin.find((item) => item.id === Number(botao.dataset.editar));
      if (destino) preencherFormulario(destino);
    });
  });

  listaCrud.querySelectorAll("[data-excluir]").forEach((botao) => {
    botao.addEventListener("click", () => {
      destinosAdmin = destinosAdmin.filter((item) => item.id !== Number(botao.dataset.excluir));
      salvarDestinosAdmin();
      mostrarDestinosCrud();
    });
  });
}

formDestino.addEventListener("submit", function (event) {
  event.preventDefault();

  const destino = montarDestino();
  const posicao = destinosAdmin.findIndex((item) => item.id === destino.id);

  if (posicao >= 0) {
    destinosAdmin[posicao] = destino;
    alert("Destino atualizado.");
  } else {
    destinosAdmin.push(destino);
    alert("Destino cadastrado.");
  }

  salvarDestinosAdmin();
  idEditando = null;
  formDestino.reset();
  mostrarDestinosCrud();
});

document.getElementById("limparForm").addEventListener("click", () => {
  idEditando = null;
  formDestino.reset();
});

mostrarDestinosCrud();
