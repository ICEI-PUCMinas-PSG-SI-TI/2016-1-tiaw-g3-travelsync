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
let favoritos = lerFavoritosSalvos();
let historico = JSON.parse(localStorage.getItem("travelsync:historico") || "[]");

const filtrosIniciais = {
  busca: "",
  tipo: "Todos",
  regiao: "Todas",
  preco: "900",
  avaliacao: "0",
  ordem: "relevancia"
};

let filtrosAplicados = { ...filtrosIniciais };
let rascunhoFiltros = { ...filtrosIniciais };

function lerFavoritosSalvos() {
  const favoritosAtuais = localStorage.getItem("travelsync:favoritos");
  const favoritosAntigos = localStorage.getItem("travelsync:favoritosSalvos");
  return JSON.parse(favoritosAtuais || favoritosAntigos || "[]");
}

function atualizarResumoFavoritos() {
  localStorage.setItem("travelsync:favoritos", JSON.stringify(favoritos));
  totalFavoritos.textContent = String(favoritos.length);
}

function destinoFoiCurtido(id) {
  return favoritos.includes(id);
}

function alternarDestinoFavorito(id) {
  if (destinoFoiCurtido(id)) {
    favoritos = favoritos.filter((item) => item !== id);
  } else {
    favoritos.push(id);
  }

  atualizarResumoFavoritos();

  if (destinoEscolhido === id) {
    desenharDetalhesDestino();
    return;
  }

  if (paginaAtual === "favoritos") mostrarFavoritos();
  if (paginaAtual === "destinos" || paginaAtual === "buscar") abrirListagemDestinos(paginaAtual);
}

function guardarNoHistorico(id) {
  historico = [id, ...historico.filter((item) => item !== id)].slice(0, 5);
  localStorage.setItem("travelsync:historico", JSON.stringify(historico));
}

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

function fecharCamadasAbertas() {
  fecharMenuLateral();

  if (filtrosVisiveis && (paginaAtual === "destinos" || paginaAtual === "buscar")) {
    filtrosVisiveis = false;
    abrirListagemDestinos(paginaAtual);
  }
}

function desenharEstrelas(nota) {
  const quantidade = Math.round(nota);
  return "★".repeat(quantidade).padEnd(5, "☆");
}

function formatarPreco(destino) {
  return `R$ ${destino.precoMin} - R$ ${destino.precoMax}`;
}

function destinoAtual() {
  return catalogoDestinos.find((item) => item.id === destinoEscolhido) || catalogoDestinos[0];
}

function pegarCoordenadas(destino) {
  if (destino.coordenadas && destino.coordenadas.length === 2) return destino.coordenadas;

  const mapa = {
    "Fernando de Noronha": [-3.8549, -32.4233],
    Bonito: [-21.1261, -56.4836],
    Gramado: [-29.3788, -50.8738],
    Jericoacoara: [-2.7975, -40.5124],
    "Foz do Iguacu": [-25.5163, -54.5854],
    Maragogi: [-9.0122, -35.2226],
    "Lencois Maranhenses": [-2.4854, -43.1289],
    "Porto de Galinhas": [-8.5046, -35.0044],
    "Campos do Jordao": [-22.7399, -45.5926]
  };

  return mapa[destino.nome] || [-14.235, -51.9253];
}

function lerUsuarios() {
  return JSON.parse(localStorage.getItem("travelsync:usuarios") || "[]");
}

function salvarUsuarios(usuarios) {
  localStorage.setItem("travelsync:usuarios", JSON.stringify(usuarios));
}

function atualizarUsuarioTopo() {
  if (!nomeTopo) return;
  nomeTopo.textContent = usuarioAtual ? `Ola, ${usuarioAtual.nome}` : "Ola, Usuario!";
}

function entrarUsuario(usuario) {
  usuarioAtual = {
    nome: usuario.nome,
    email: usuario.email
  };
  localStorage.setItem("travelsync:usuarioAtual", JSON.stringify(usuarioAtual));
  atualizarUsuarioTopo();
}

function sairUsuario() {
  usuarioAtual = null;
  localStorage.removeItem("travelsync:usuarioAtual");
  atualizarUsuarioTopo();
}

function lerDestinosCadastrados() {
  return JSON.parse(localStorage.getItem("travelsync:destinosAdmin") || "[]");
}

function salvarDestinosCadastrados(destinos) {
  localStorage.setItem("travelsync:destinosAdmin", JSON.stringify(destinos));
}

function chaveReserva(destinoId) {
  return `travelsync:reservas:${destinoId}`;
}

function chaveMapa(destinoId) {
  return `travelsync:pontos-mapa:${destinoId}`;
}

function criarCoordenadaProxima(coordenadas, indice) {
  const volta = indice + 1;
  const sinalLat = volta % 2 === 0 ? 1 : -1;
  const sinalLng = volta % 3 === 0 ? -1 : 1;

  return [
    coordenadas[0] + sinalLat * (0.01 + volta * 0.003),
    coordenadas[1] + sinalLng * (0.012 + volta * 0.002)
  ];
}

function chaveComentarios(destinoId) {
  return `travelsync:comentarios:${destinoId}`;
}

function lerComentarios(destinoId) {
  return JSON.parse(localStorage.getItem(chaveComentarios(destinoId)) || "[]");
}

function salvarComentarios(destinoId, comentarios) {
  localStorage.setItem(chaveComentarios(destinoId), JSON.stringify(comentarios));
}

function criarComentario(comentario) {
  const inicial = comentario.nome.trim().charAt(0).toUpperCase() || "?";
  const respostas = comentario.respostas || [];
  const nota = Number(comentario.nota || 5);

  return `
    <article class="comentario-usuario" data-comentario-id="${comentario.id}">
      <div class="comentario-cabecalho">
        <div class="comentario-pessoa">
          <span class="comentario-avatar">${inicial}</span>
          <div>
            <strong>${comentario.nome}</strong>
            <span class="comentario-estrelas">${desenharEstrelas(nota)} ${nota.toFixed(1)}</span>
          </div>
        </div>
        <button class="comentario-coracao ${comentario.favorito ? "favoritado" : ""}" type="button" data-curtir-comentario="${comentario.id}" aria-label="Favoritar comentario">♥</button>
      </div>

      <p>${comentario.texto}</p>

      <button class="comentario-responder" type="button" data-responder-comentario="${comentario.id}">Responder</button>

      <div class="comentario-resposta-form" data-form-resposta="${comentario.id}" hidden>
        <input type="text" placeholder="Digite sua resposta" />
        <button type="button" data-enviar-resposta="${comentario.id}">Enviar</button>
      </div>

      <div class="comentario-respostas">
        ${respostas.map((resposta) => `<div class="comentario-resposta">${resposta.texto}</div>`).join("")}
      </div>
    </article>
  `;
}

function criarAreaComentarios(destino) {
  const comentarios = lerComentarios(destino.id);

  return `
    <section class="comentarios-destino">
      <h3>Compartilhe sua experiencia</h3>
      <form class="form-comentario" data-form-comentario>
        <input type="text" id="nomeComentario" placeholder="Seu nome" />
        <label class="campo-nota-comentario">
          <span>Sua nota</span>
          <select id="notaComentario">
            <option value="5">★★★★★ 5 estrelas</option>
            <option value="4">★★★★☆ 4 estrelas</option>
            <option value="3">★★★☆☆ 3 estrelas</option>
            <option value="2">★★☆☆☆ 2 estrelas</option>
            <option value="1">★☆☆☆☆ 1 estrela</option>
          </select>
        </label>
        <textarea id="textoComentario" placeholder="Compartilhe sua experiencia de viagem..."></textarea>
        <button class="btn-escrever" type="submit">+ Publicar comentario</button>
      </form>
      <p class="mensagem-comentario" data-mensagem-comentario></p>
      <div class="comentarios-lista">
        ${comentarios.length ? comentarios.map(criarComentario).join("") : `<p class="sem-comentarios">Ainda nao ha comentarios dos viajantes.</p>`}
      </div>
    </section>
  `;
}

function ligarComentariosDestino(destino) {
  const form = document.querySelector("[data-form-comentario]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.querySelector("#nomeComentario").value.trim();
    const texto = document.querySelector("#textoComentario").value.trim();
    const nota = Number(document.querySelector("#notaComentario").value);
    const mensagem = document.querySelector("[data-mensagem-comentario]");

    if (!nome || !texto) {
      mensagem.textContent = "Preencha seu nome e comentario.";
      return;
    }

    const comentarios = lerComentarios(destino.id);
    comentarios.unshift({
      id: Date.now(),
      nome,
      texto,
      nota,
      favorito: false,
      respostas: []
    });

    salvarComentarios(destino.id, comentarios);
    mensagem.textContent = "Comentario enviado com sucesso!";
    setTimeout(desenharDetalhesDestino, 500);
  });

  document.querySelectorAll("[data-curtir-comentario]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = Number(botao.dataset.curtirComentario);
      const comentarios = lerComentarios(destino.id).map((comentario) => {
        if (comentario.id === id) return { ...comentario, favorito: !comentario.favorito };
        return comentario;
      });

      salvarComentarios(destino.id, comentarios);
      desenharDetalhesDestino();
    });
  });

  document.querySelectorAll("[data-responder-comentario]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const campo = document.querySelector(`[data-form-resposta="${botao.dataset.responderComentario}"]`);
      campo.hidden = !campo.hidden;
    });
  });

  document.querySelectorAll("[data-enviar-resposta]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = Number(botao.dataset.enviarResposta);
      const campo = document.querySelector(`[data-form-resposta="${id}"] input`);
      const texto = campo.value.trim();

      if (!texto) return;

      const comentarios = lerComentarios(destino.id).map((comentario) => {
        if (comentario.id === id) {
          const respostas = comentario.respostas || [];
          return { ...comentario, respostas: [...respostas, { texto }] };
        }
        return comentario;
      });

      salvarComentarios(destino.id, comentarios);
      desenharDetalhesDestino();
    });
  });
}

function ordenarCatalogo(lista) {
  return [...lista].sort((a, b) => {
    if (filtrosAplicados.ordem === "menor-preco") return a.precoMin - b.precoMin;
    if (filtrosAplicados.ordem === "maior-nota") return b.avaliacao - a.avaliacao;
    if (filtrosAplicados.ordem === "mais-avaliados") return b.totalAvaliacoes - a.totalAvaliacoes;
    return b.avaliacao * b.totalAvaliacoes - a.avaliacao * a.totalAvaliacoes;
  });
}

function listarDestinosFiltrados(listaBase = catalogoDestinos) {
  const termo = filtrosAplicados.busca.trim().toLowerCase();
  const precoMaximo = Number(filtrosAplicados.preco);
  const notaMinima = Number(filtrosAplicados.avaliacao);

  const lista = listaBase.filter((destino) => {
    const texto = `${destino.nome} ${destino.localizacao} ${destino.tags.join(" ")}`.toLowerCase();
    const bateBusca = !termo || texto.includes(termo);
    const bateTipo = filtrosAplicados.tipo === "Todos" || destino.tipo === filtrosAplicados.tipo || destino.tags.includes(filtrosAplicados.tipo);
    const bateRegiao = filtrosAplicados.regiao === "Todas" || destino.regiao === filtrosAplicados.regiao;
    const batePreco = destino.precoMin <= precoMaximo;
    const bateNota = destino.avaliacao >= notaMinima;

    return bateBusca && bateTipo && bateRegiao && batePreco && bateNota;
  });

  return ordenarCatalogo(lista);
}

function abrirListagemDestinos(tela = "destinos") {
  pararGaleriaAutomatica();
  destacarOpcaoMenu(tela);
  destinoEscolhido = null;

  const lista = listarDestinosFiltrados();
  const estaBuscando = tela === "buscar";

  areaConteudo.innerHTML = `
    <section class="titulo-pagina titulo-menor">
      <span class="rotulo-secao">${estaBuscando ? "Busca inteligente" : "Destinos"}</span>
      <h1>${estaBuscando ? "Encontre o destino ideal" : "Todos os destinos"}</h1>
      <p>Use os filtros para combinar estilo de viagem, regiao, preco e avaliacao.</p>
    </section>

    <section class="barra-lista">
      <strong>${lista.length} destino${lista.length === 1 ? "" : "s"} encontrado${lista.length === 1 ? "" : "s"}</strong>
      <button class="botao-filtros ${filtrosVisiveis ? "ativo" : ""}" type="button" data-abrir-filtros>
        ☰ Filtros
      </button>
      <span>Ordem: ${nomeOrdenacao(filtrosAplicados.ordem)}</span>
    </section>

    ${montarPainelFiltros()}

    ${
      lista.length
        ? `<section class="grade-destinos" aria-label="Lista de destinos">${lista.map(criarCartaoDestino).join("")}</section>`
        : `<section class="mensagem-vazia">Nenhum destino encontrado. Ajuste os filtros para ver mais opcoes.</section>`
    }
  `;

  ligarPainelFiltros();
  ligarCartoesDestino();

  document.querySelector("[data-abrir-filtros]").addEventListener("click", () => {
    filtrosVisiveis = !filtrosVisiveis;
    if (filtrosVisiveis) rascunhoFiltros = { ...filtrosAplicados };
    abrirListagemDestinos(paginaAtual);
  });

  areaConteudo.focus();
}

function montarPainelFiltros() {
  const form = filtrosVisiveis ? rascunhoFiltros : filtrosAplicados;

  return `
    <section class="painel-filtros ${filtrosVisiveis ? "aberto" : "fechado"}" aria-label="Filtros de destinos">
      <label class="campo-busca-filtro">
        <span>⌕</span>
        <input id="buscaDestino" type="search" placeholder="Buscar por destino, tag ou estado" value="${form.busca}" />
      </label>

      <label class="campo-filtro">
        <span>Tipo</span>
        <select id="tipoDestino" class="seletor">
          ${montarOpcao("Todos", form.tipo)}
          ${montarOpcao("Praia", form.tipo)}
          ${montarOpcao("Natureza", form.tipo)}
          ${montarOpcao("Aventura", form.tipo)}
          ${montarOpcao("Inverno", form.tipo)}
          ${montarOpcao("Familia", form.tipo)}
        </select>
      </label>

      <label class="campo-filtro">
        <span>Regiao</span>
        <select id="regiaoDestino" class="seletor">
          ${montarOpcao("Todas", form.regiao)}
          ${montarOpcao("Nordeste", form.regiao)}
          ${montarOpcao("Sul", form.regiao)}
          ${montarOpcao("Sudeste", form.regiao)}
          ${montarOpcao("Centro-Oeste", form.regiao)}
        </select>
      </label>

      <label class="campo-filtro">
        <span>Preco ate R$ <b id="precoValor">${form.preco}</b></span>
        <input id="precoDestino" class="barra-preco" type="range" min="150" max="900" step="10" value="${form.preco}" />
      </label>

      <label class="campo-filtro">
        <span>Nota minima</span>
        <select id="avaliacaoDestino" class="seletor">
          ${montarOpcao("0", form.avaliacao, "Todas")}
          ${montarOpcao("4.5", form.avaliacao, "4.5+")}
          ${montarOpcao("4.7", form.avaliacao, "4.7+")}
          ${montarOpcao("4.8", form.avaliacao, "4.8+")}
        </select>
      </label>

      <label class="campo-filtro">
        <span>Ordenar</span>
        <select id="ordemDestino" class="seletor">
          ${montarOpcao("relevancia", form.ordem, "Relevancia")}
          ${montarOpcao("menor-preco", form.ordem, "Menor preco")}
          ${montarOpcao("maior-nota", form.ordem, "Maior nota")}
          ${montarOpcao("mais-avaliados", form.ordem, "Mais avaliados")}
        </select>
      </label>

      <div class="botoes-filtro">
        <button class="aplicar-filtros" type="button" data-aplicar-filtros>Aplicar filtros</button>
        <button class="limpar-filtros" type="button" data-limpar-filtros>Limpar</button>
      </div>
    </section>
  `;
}

function montarOpcao(valor, valorAtual, texto = valor) {
  return `<option value="${valor}" ${valorAtual === valor ? "selected" : ""}>${texto}</option>`;
}

function nomeOrdenacao(valor) {
  const nomes = {
    relevancia: "relevancia",
    "menor-preco": "menor preco",
    "maior-nota": "maior nota",
    "mais-avaliados": "mais avaliados"
  };
  return nomes[valor] || valor;
}

function criarCartaoDestino(destino) {
  return `
    <article class="cartao-destino" data-destino-id="${destino.id}" tabindex="0">
      <img class="imagem-cartao" src="${destino.imagens[0]}" alt="${destino.nome}" loading="lazy" />
      <button class="botao-curtir ${destinoFoiCurtido(destino.id) ? "ativo" : ""}" type="button" data-favorito="${destino.id}" aria-label="Favoritar ${destino.nome}">
        ${destinoFoiCurtido(destino.id) ? "♥" : "♡"}
      </button>
      <div class="corpo-cartao">
        <div class="topo-cartao">
          <h2 class="nome-cartao">${destino.nome}</h2>
          <span class="categoria">${destino.tipo}</span>
        </div>
        <p class="local-cartao">⌖ ${destino.localizacao}</p>
        <p class="texto-cartao">${destino.descricao}</p>
        <div class="rodape-cartao">
          <span class="nota">★ ${destino.avaliacao.toFixed(1)} (${destino.totalAvaliacoes})</span>
          <span class="preco">${formatarPreco(destino)}</span>
        </div>
      </div>
    </article>
  `;
}

function ligarPainelFiltros() {
  document.querySelector("#buscaDestino").addEventListener("input", (event) => {
    rascunhoFiltros.busca = event.target.value;
  });

  document.querySelector("#tipoDestino").addEventListener("change", (event) => {
    rascunhoFiltros.tipo = event.target.value;
  });

  document.querySelector("#regiaoDestino").addEventListener("change", (event) => {
    rascunhoFiltros.regiao = event.target.value;
  });

  document.querySelector("#precoDestino").addEventListener("input", (event) => {
    rascunhoFiltros.preco = event.target.value;
    document.querySelector("#precoValor").textContent = rascunhoFiltros.preco;
  });

  document.querySelector("#avaliacaoDestino").addEventListener("change", (event) => {
    rascunhoFiltros.avaliacao = event.target.value;
  });

  document.querySelector("#ordemDestino").addEventListener("change", (event) => {
    rascunhoFiltros.ordem = event.target.value;
  });

  document.querySelector("[data-aplicar-filtros]").addEventListener("click", () => {
    filtrosAplicados = { ...rascunhoFiltros };
    buscaTopo.value = filtrosAplicados.busca;
    abrirListagemDestinos(paginaAtual);
  });

  document.querySelector("[data-limpar-filtros]").addEventListener("click", () => {
    rascunhoFiltros = { ...filtrosIniciais };
    filtrosAplicados = { ...filtrosIniciais };
    buscaTopo.value = "";
    abrirListagemDestinos(paginaAtual);
  });
}

function ligarCartoesDestino() {
  document.querySelectorAll("[data-destino-id]").forEach((card) => {
    card.addEventListener("click", () => abrirDetalhesDestino(Number(card.dataset.destinoId)));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        abrirDetalhesDestino(Number(card.dataset.destinoId));
      }
    });
  });

  document.querySelectorAll("[data-favorito]").forEach((botao) => {
    botao.addEventListener("click", (event) => {
      event.stopPropagation();
      alternarDestinoFavorito(Number(botao.dataset.favorito));
    });
  });
}

function abrirDetalhesDestino(id) {
  pararGaleriaAutomatica();
  destacarOpcaoMenu("destinos");
  destinoEscolhido = id;
  fotoGaleria = 0;
  abaAtual = "sobre";
  guardarNoHistorico(id);
  desenharDetalhesDestino();
  iniciarGaleriaAutomatica();
}

function desenharDetalhesDestino() {
  const destino = catalogoDestinos.find((item) => item.id === destinoEscolhido) || catalogoDestinos[0];
  const imagem = destino.imagens[fotoGaleria % destino.imagens.length];

  areaConteudo.innerHTML = `
    <button class="voltar" type="button" data-voltar>← Voltar para destinos</button>

    <section class="destaque-detalhe">
      <div class="carrossel">
        <img src="${imagem}" alt="${destino.nome}" />
        <button class="botao-carrossel anterior" type="button" data-carrossel="-1" aria-label="Foto anterior">‹</button>
        <button class="botao-carrossel proximo" type="button" data-carrossel="1" aria-label="Proxima foto">›</button>
        <div class="pontos-carrossel" aria-label="Galeria de imagens">
          ${destino.imagens.map((_, index) => `<button class="${index === fotoGaleria ? "ativo" : ""}" type="button" data-foto="${index}" aria-label="Foto ${index + 1}"></button>`).join("")}
        </div>
      </div>

      <div class="resumo-detalhe">
        <button class="favorito ${destinoFoiCurtido(destino.id) ? "ativo" : ""}" type="button" data-favorito="${destino.id}" aria-label="Favoritar ${destino.nome}">
          ${destinoFoiCurtido(destino.id) ? "♥" : "♡"}
        </button>
        <span class="rotulo-secao">${destino.tipo} em ${destino.regiao}</span>
        <h1>${destino.nome}</h1>
        <div class="info-detalhe">
          <span>⌖ ${destino.localizacao}</span>
          <span class="estrelas">${desenharEstrelas(destino.avaliacao)} ${destino.avaliacao.toFixed(1)} (${destino.totalAvaliacoes} avaliacoes)</span>
          <span>${formatarPreco(destino)} por dia</span>
        </div>
        <p class="descricao-detalhe">${destino.descricao}</p>
        <div class="etiquetas">${destino.tags.map((tag) => `<span class="etiqueta">${tag}</span>`).join("")}</div>
      </div>
    </section>

    <section class="barra-acoes" aria-label="Acoes do destino">
      <button class="botao-acao" type="button" data-atalho-aba="mapa">⌖ Ver no mapa</button>
      <button class="botao-acao" type="button" data-atalho-aba="avaliacoes">☆ Avaliacoes</button>
      <button class="botao-acao principal" type="button" data-reservar-destino>▣ Reservar</button>
    </section>

    <section class="resumo-info" aria-label="Informacoes principais">
      ${criarBlocoResumo("⌖", "Localizacao", destino.detalhes.localizacaoCurta)}
      ${criarBlocoResumo("☼", "Clima", `${destino.detalhes.clima}<br>${destino.detalhes.temperatura}`)}
      ${criarBlocoResumo("◷", "Melhor epoca", destino.detalhes.melhorEpoca)}
      ${criarBlocoResumo("$", "Custo medio", destino.detalhes.custoMedio)}
    </section>

    <nav class="abas" aria-label="Conteudo do destino">
      ${criarBotaoAba("sobre", "Sobre o destino")}
      ${criarBotaoAba("atracoes", "Atracoes")}
      ${criarBotaoAba("fotos", "Fotos")}
      ${criarBotaoAba("dicas", "Dicas")}
      ${criarBotaoAba("avaliacoes", "Avaliacoes")}
    </nav>

    <section class="conteudo-detalhe">
      <article class="bloco-texto">${criarConteudoAba(destino)}</article>
      <aside class="painel-lateral">
        <article class="cartao-mapa" id="mapa">
          <h3>Localizacao</h3>
          <div class="previa-mapa">⌖</div>
          <button class="botao-mapa" type="button" data-ver-mapa>Ver no mapa ↗</button>
        </article>
        <article class="cartao-favorito">
          <p>${destinoFoiCurtido(destino.id) ? "Destino salvo nos favoritos." : "Este destino ainda nao esta nos favoritos."}</p>
          <button type="button" data-favorito="${destino.id}">${destinoFoiCurtido(destino.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}</button>
        </article>
      </aside>
    </section>
  `;

  document.querySelector("[data-voltar]").addEventListener("click", () => abrirListagemDestinos("destinos"));
  document.querySelector("[data-reservar-destino]").addEventListener("click", () => mostrarReservaDestino(destino));
  document.querySelector("[data-ver-mapa]").addEventListener("click", () => mostrarMapaDestino(destino));
  document.querySelectorAll("[data-favorito]").forEach((botao) => botao.addEventListener("click", () => alternarDestinoFavorito(destino.id)));
  document.querySelectorAll("[data-carrossel]").forEach((botao) => {
    botao.addEventListener("click", () => trocarFotoGaleria(Number(botao.dataset.carrossel)));
  });
  document.querySelectorAll("[data-foto]").forEach((botao) => {
    botao.addEventListener("click", () => {
      fotoGaleria = Number(botao.dataset.foto);
      desenharDetalhesDestino();
    });
  });
  document.querySelectorAll("[data-aba]").forEach((botao) => {
    botao.addEventListener("click", () => {
      abaAtual = botao.dataset.aba;
      desenharDetalhesDestino();
    });
  });
  document.querySelectorAll("[data-atalho-aba]").forEach((botao) => {
    botao.addEventListener("click", () => {
      if (botao.dataset.atalhoAba === "mapa") {
        mostrarMapaDestino(destino);
        return;
      }
      abaAtual = botao.dataset.atalhoAba;
      desenharDetalhesDestino();
      document.querySelector(".abas").scrollIntoView({ behavior: "smooth" });
    });
  });
  areaConteudo.querySelectorAll("[data-view]").forEach((botao) => {
    botao.addEventListener("click", () => navegar(botao.dataset.view));
  });

  ligarComentariosDestino(destino);
}

function criarBlocoResumo(icone, titulo, texto) {
  return `<article class="item-info"><span class="icone-info">${icone}</span><div><strong>${titulo}</strong><p>${texto}</p></div></article>`;
}

function criarBotaoAba(chave, texto) {
  return `<button class="aba ${abaAtual === chave ? "ativo" : ""}" type="button" data-aba="${chave}">${texto}</button>`;
}

function criarConteudoAba(destino) {
  if (abaAtual === "atracoes") {
    return `<h2>Atracoes</h2><div class="grade-info">${destino.atracoes.map((item) => `<article><strong>${item}</strong><p>Inclua no roteiro para aproveitar melhor ${destino.nome}.</p></article>`).join("")}</div>`;
  }
  if (abaAtual === "fotos") {
    return `<h2>Fotos</h2><div class="grade-fotos">${destino.imagens.map((src) => `<img src="${src}" alt="${destino.nome}" loading="lazy" />`).join("")}</div>`;
  }
  if (abaAtual === "dicas") {
    return `<h2>Dicas</h2><ul class="lista-dicas">${destino.dicas.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }
  if (abaAtual === "avaliacoes") {
    return `
      <h2>Avaliacoes</h2>
      <div class="avaliacoes-lista">
        ${destino.avaliacoes.map((item) => `<article><strong>${item.nome}</strong><span>${desenharEstrelas(item.nota)} ${item.nota}</span><p>${item.texto}</p></article>`).join("")}
      </div>
      ${criarAreaComentarios(destino)}
    `;
  }
  return `
    <h2>Sobre o destino</h2>
    <p>${destino.detalhes.sobre}</p>
    <h3>Como chegar</h3>
    <p>${destino.detalhes.comoChegar}</p>
    <button class="botao-planejar" type="button" data-view="planejar">Planejar minha viagem</button>
  `;
}

function trocarFotoGaleria(direcao) {
  const destino = catalogoDestinos.find((item) => item.id === destinoEscolhido);
  fotoGaleria = (fotoGaleria + direcao + destino.imagens.length) % destino.imagens.length;
  desenharDetalhesDestino();
}

function iniciarGaleriaAutomatica() {
  pararGaleriaAutomatica();
  timerGaleria = setInterval(() => {
    if (!destinoEscolhido) return;
    if (abaAtual !== "sobre") return;
    trocarFotoGaleria(1);
  }, 4500);
}

function pararGaleriaAutomatica() {
  if (timerGaleria) clearInterval(timerGaleria);
  timerGaleria = null;
}

function mostrarReservaDestino(destino = destinoAtual()) {
  pararGaleriaAutomatica();
  destacarOpcaoMenu("planejar");
  destinoEscolhido = destino.id;

  const reservaSalva = JSON.parse(localStorage.getItem(chaveReserva(destino.id)) || "{}");
  const reservaAtiva = Boolean(reservaSalva.destino);

  areaConteudo.innerHTML = `
    <button class="voltar" type="button" data-voltar-detalhes>← Voltar para detalhes</button>

    <section class="titulo-pagina titulo-menor">
      <span class="rotulo-secao">Reserva</span>
      <h1>${destino.nome}</h1>
      <p>${reservaAtiva ? "Edite os dados da reserva ou cancele se seus planos mudaram." : "Informe os dados principais para simular a reserva e conferir o valor estimado."}</p>
    </section>

    <section class="tela-reserva">
      <form class="form-reserva" data-form-reserva>
        <label>
          <span>Data inicial</span>
          <input type="date" id="reservaInicio" value="${reservaSalva.inicio || ""}" required />
        </label>
        <label>
          <span>Data final</span>
          <input type="date" id="reservaFim" value="${reservaSalva.fim || ""}" required />
        </label>
        <label>
          <span>Nome</span>
          <input type="text" id="reservaNome" value="${reservaSalva.nome || ""}" required />
        </label>
        <label>
          <span>E-mail</span>
          <input type="email" id="reservaEmail" value="${reservaSalva.email || ""}" required />
        </label>
        <label>
          <span>Adultos</span>
          <input type="number" id="reservaAdultos" min="0" max="30" value="${reservaSalva.adultos || 1}" />
        </label>
        <label>
          <span>Crianças</span>
          <input type="number" id="reservaCriancas" min="0" max="30" value="${reservaSalva.criancas || 0}" />
        </label>
        <label>
          <span>Quartos</span>
          <input type="number" id="reservaQuartos" min="0" max="5" value="${reservaSalva.quartos || 1}" />
        </label>
        <label>
          <span>Ingressos</span>
          <input type="number" id="reservaIngressos" min="0" max="20" value="${reservaSalva.ingressos || 0}" />
        </label>

        <fieldset class="pagamento-reserva">
          <legend>Forma de pagamento</legend>
          <div class="opcoes-pagamento">
            ${["Cartao de credito", "Cartao de debito", "Pix", "Dinheiro", "Outros"].map((item, index) => `
              <label>
                <input type="radio" name="pagamentoReserva" value="${item}" ${reservaSalva.pagamento === item || (!reservaSalva.pagamento && index === 0) ? "checked" : ""} />
                <span>${item}</span>
              </label>
            `).join("")}
          </div>
        </fieldset>

        <div class="acoes-reserva">
          <button class="botao-planejar" type="submit">${reservaAtiva ? "Salvar alteracoes" : "Finalizar reserva"}</button>
          ${reservaAtiva ? `<button class="botao-cancelar" type="button" data-cancelar-reserva>Cancelar reserva</button>` : ""}
        </div>
      </form>

      <aside class="resumo-reserva">
        <h2>Dados da reserva</h2>
        <p><strong>Nome:</strong> <span data-resumo="nome">-</span></p>
        <p><strong>Email:</strong> <span data-resumo="email">-</span></p>
        <p><strong>Adultos:</strong> <span data-resumo="adultos">0</span></p>
        <p><strong>Crianças:</strong> <span data-resumo="criancas">0</span></p>
        <p><strong>Quartos:</strong> <span data-resumo="quartos">0</span></p>
        <p><strong>Ingressos:</strong> <span data-resumo="ingressos">0</span></p>
        <p><strong>Dias:</strong> <span data-resumo="dias">1</span></p>
        <p><strong>Pagamento:</strong> <span data-resumo="pagamento">-</span></p>
        <hr />
        <h3>Total: R$ <span data-resumo="total">0.00</span></h3>
      </aside>
    </section>
  `;

  document.querySelector("[data-voltar-detalhes]").addEventListener("click", () => abrirDetalhesDestino(destino.id));
  ligarReservaDestino(destino);
}

function calcularReserva(destino) {
  const inicio = document.querySelector("#reservaInicio").value;
  const fim = document.querySelector("#reservaFim").value;
  const adultos = Number(document.querySelector("#reservaAdultos").value || 0);
  const criancas = Number(document.querySelector("#reservaCriancas").value || 0);
  const quartos = Number(document.querySelector("#reservaQuartos").value || 0);
  const ingressos = Number(document.querySelector("#reservaIngressos").value || 0);

  let dias = 1;
  if (inicio && fim) {
    dias = Math.ceil((new Date(fim) - new Date(inicio)) / (1000 * 60 * 60 * 24));
    if (dias <= 0) dias = 1;
  }

  const valorAdultos = adultos * destino.precoMax * dias;
  const valorCriancas = criancas * Math.round(destino.precoMin * 0.75) * dias;
  const valorQuartos = quartos * 120 * dias;
  const valorIngressos = ingressos * 80;

  return {
    dias,
    total: valorAdultos + valorCriancas + valorQuartos + valorIngressos
  };
}

function atualizarResumoReserva(destino) {
  const pagamento = document.querySelector("input[name='pagamentoReserva']:checked");
  const calculo = calcularReserva(destino);

  document.querySelector("[data-resumo='nome']").textContent = document.querySelector("#reservaNome").value || "-";
  document.querySelector("[data-resumo='email']").textContent = document.querySelector("#reservaEmail").value || "-";
  document.querySelector("[data-resumo='adultos']").textContent = document.querySelector("#reservaAdultos").value || "0";
  document.querySelector("[data-resumo='criancas']").textContent = document.querySelector("#reservaCriancas").value || "0";
  document.querySelector("[data-resumo='quartos']").textContent = document.querySelector("#reservaQuartos").value || "0";
  document.querySelector("[data-resumo='ingressos']").textContent = document.querySelector("#reservaIngressos").value || "0";
  document.querySelector("[data-resumo='dias']").textContent = calculo.dias;
  document.querySelector("[data-resumo='pagamento']").textContent = pagamento ? pagamento.value : "-";
  document.querySelector("[data-resumo='total']").textContent = calculo.total.toFixed(2);
}

function ligarReservaDestino(destino) {
  const form = document.querySelector("[data-form-reserva]");
  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => atualizarResumoReserva(destino));
    input.addEventListener("change", () => atualizarResumoReserva(destino));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const pagamento = document.querySelector("input[name='pagamentoReserva']:checked");
    const calculo = calcularReserva(destino);

    localStorage.setItem(chaveReserva(destino.id), JSON.stringify({
      destino: destino.nome,
      inicio: document.querySelector("#reservaInicio").value,
      fim: document.querySelector("#reservaFim").value,
      nome: document.querySelector("#reservaNome").value,
      email: document.querySelector("#reservaEmail").value,
      adultos: document.querySelector("#reservaAdultos").value,
      criancas: document.querySelector("#reservaCriancas").value,
      quartos: document.querySelector("#reservaQuartos").value,
      ingressos: document.querySelector("#reservaIngressos").value,
      pagamento: pagamento ? pagamento.value : "",
      total: calculo.total.toFixed(2)
    }));

    alert("Reserva salva com sucesso!");
    mostrarReservaDestino(destino);
  });

  const botaoCancelar = document.querySelector("[data-cancelar-reserva]");
  if (botaoCancelar) {
    botaoCancelar.addEventListener("click", () => {
      const confirmar = confirm("Deseja cancelar esta reserva?");
      if (!confirmar) return;

      localStorage.removeItem(chaveReserva(destino.id));
      alert("Reserva cancelada.");
      mostrarReservaDestino(destino);
    });
  }

  atualizarResumoReserva(destino);
}

function mostrarMapaDestino(destino = destinoAtual()) {
  pararGaleriaAutomatica();
  destacarOpcaoMenu("destinos");
  destinoEscolhido = destino.id;

  const coordenadas = pegarCoordenadas(destino);
  const pontos = JSON.parse(localStorage.getItem(chaveMapa(destino.id)) || "[]");
  const todosPontos = [{ nome: destino.nome, localizacao: destino.localizacao, coordenadas }, ...pontos];

  areaConteudo.innerHTML = `
    <button class="voltar" type="button" data-voltar-detalhes>← Voltar para detalhes</button>

    <section class="titulo-pagina titulo-menor">
      <span class="rotulo-secao">Mapa do destino</span>
      <h1>${destino.nome}</h1>
      <p>Veja a localização principal do destino e salve pontos pesquisados para consultar depois.</p>
    </section>

    <section class="tela-mapa-destino">
      <div class="mapa-area">
        <div class="mapa-busca">
          <input type="text" id="pesquisaMapa" placeholder="Pesquisar qualquer local" />
          <button class="botao-mapa" type="button" data-pesquisar-mapa>Pesquisar</button>
          <button class="botao-acao" type="button" data-limpar-pontos>Limpar pontos</button>
        </div>
        <div class="mapa-visual" id="mapaDestino"></div>
        <p class="aviso-mapa" data-aviso-mapa>Carregando mapa de ${destino.nome}...</p>
      </div>

      <aside class="dicas-mapa">
        <h2>Pontos no mapa</h2>
        <div class="lista-pontos-mapa">
          ${todosPontos.map((ponto) => `
            <article>
              <strong>${ponto.nome}</strong>
              <p>${ponto.localizacao || "Ponto pesquisado no destino"}</p>
              ${ponto.coordenadas ? `<small>${ponto.coordenadas[0].toFixed(4)}, ${ponto.coordenadas[1].toFixed(4)}</small>` : ""}
            </article>
          `).join("")}
        </div>
      </aside>
    </section>
  `;

  document.querySelector("[data-voltar-detalhes]").addEventListener("click", () => abrirDetalhesDestino(destino.id));
  ligarMapaDestino(destino);
  montarMapaDestino(destino, pontos);
}

function ligarMapaDestino(destino) {
  document.querySelector("[data-pesquisar-mapa]").addEventListener("click", () => pesquisarPontoMapa(destino));

  document.querySelector("#pesquisaMapa").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    pesquisarPontoMapa(destino);
  });

  document.querySelector("[data-limpar-pontos]").addEventListener("click", () => {
    localStorage.removeItem(chaveMapa(destino.id));
    mostrarMapaDestino(destino);
  });
}

async function pesquisarPontoMapa(destino) {
  const campo = document.querySelector("#pesquisaMapa");
  const aviso = document.querySelector("[data-aviso-mapa]");
  const termo = campo.value.trim();

  if (!termo) {
    alert("Digite um local");
    return;
  }

  const pontos = JSON.parse(localStorage.getItem(chaveMapa(destino.id)) || "[]");
  const coordenadasDestino = pegarCoordenadas(destino);
  let coordenadas = criarCoordenadaProxima(coordenadasDestino, pontos.length);
  let localizacao = "Local pesquisado no mapa";

  aviso.textContent = "Pesquisando local...";

  try {
    const busca = encodeURIComponent(termo);
    const resposta = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${busca}`);
    const resultado = await resposta.json();

    if (resultado.length) {
      coordenadas = [Number(resultado[0].lat), Number(resultado[0].lon)];
      localizacao = resultado[0].display_name || localizacao;
    } else {
      aviso.textContent = "Nao encontrei esse local online, entao salvei um ponto proximo ao destino.";
    }
  } catch (erro) {
    console.warn("Nao foi possivel buscar o ponto no mapa", erro);
    aviso.textContent = "Nao consegui consultar o mapa online, mas salvei o ponto na sua lista.";
  }

  pontos.unshift({
    nome: termo,
    localizacao,
    coordenadas
  });

  localStorage.setItem(chaveMapa(destino.id), JSON.stringify(pontos.slice(0, 8)));
  mostrarMapaDestino(destino);
}

function montarMapaDestino(destino, pontos) {
  const aviso = document.querySelector("[data-aviso-mapa]");
  const elementoMapa = document.querySelector("#mapaDestino");
  const coordenadas = pegarCoordenadas(destino);

  if (!elementoMapa) return;

  if (mapaDestinoAberto) {
    mapaDestinoAberto.remove();
    mapaDestinoAberto = null;
  }

  elementoMapa.innerHTML = "";

  if (typeof L === "undefined") {
    aviso.textContent = "O mapa interativo precisa de internet para carregar. Os pontos pesquisados continuam salvos na lista.";
    elementoMapa.innerHTML = `
      <div class="mapa-sem-internet">
        <strong>${destino.nome}</strong>
        <span>${coordenadas[0].toFixed(4)}, ${coordenadas[1].toFixed(4)}</span>
      </div>
    `;
    return;
  }

  mapaDestinoAberto = L.map(elementoMapa, {
    scrollWheelZoom: false
  }).setView(coordenadas, 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(mapaDestinoAberto);

  L.marker(coordenadas)
    .addTo(mapaDestinoAberto)
    .bindPopup(`<strong>${destino.nome}</strong><br>${destino.localizacao}`)
    .openPopup();

  const marcadores = [coordenadas];

  pontos.forEach((ponto) => {
    if (!ponto.coordenadas) return;

    marcadores.push(ponto.coordenadas);

    L.marker(ponto.coordenadas)
      .addTo(mapaDestinoAberto)
      .bindPopup(`<strong>${ponto.nome}</strong><br>${ponto.localizacao || "Ponto pesquisado"}`);
  });

  if (marcadores.length > 1) {
    mapaDestinoAberto.fitBounds(marcadores, { padding: [35, 35] });
  }

  aviso.textContent = "Use o zoom, arraste o mapa ou pesquise pontos para montar seu roteiro.";
  setTimeout(() => mapaDestinoAberto.invalidateSize(), 100);
}

function mostrarFavoritos() {
  pararGaleriaAutomatica();
  destacarOpcaoMenu("favoritos");
  destinoEscolhido = null;
  const listaFavoritos = catalogoDestinos.filter((destino) => destinoFoiCurtido(destino.id));

  areaConteudo.innerHTML = `
    <section class="titulo-pagina titulo-menor">
      <span class="rotulo-secao">Sua selecao</span>
      <h1>Favoritos</h1>
      <p>Destinos curtidos aparecem aqui para voce comparar e planejar depois.</p>
    </section>
    ${
      listaFavoritos.length
        ? `<section class="grade-destinos">${listaFavoritos.map(criarCartaoDestino).join("")}</section>`
        : `<section class="mensagem-vazia">Voce ainda nao favoritou nenhum destino. Curta um card para ele aparecer aqui.</section>`
    }
  `;
  ligarCartoesDestino();
}

function mostrarTelaSimples(tela) {
  pararGaleriaAutomatica();
  destacarOpcaoMenu(tela);
  destinoEscolhido = null;
  const vistos = historico
    .map((id) => catalogoDestinos.find((destino) => destino.id === id))
    .filter(Boolean)
    .map((destino) => destino.nome);

  const paginas = {
    inicio: ["Painel", "Resumo da sua proxima viagem", "Veja destinos em alta, favoritos recentes e atalhos para planejar seu roteiro.", ["Destinos mais bem avaliados", "Promocoes por regiao", "Roteiros recomendados"]],
    grupo: ["Viagens em grupo", "Convide pessoas para viajar junto", "Monte grupos, compare destinos e acompanhe quem ja confirmou presenca.", ["Grupo Noronha 2026", "Amigos de inverno", "Familia no Nordeste"]],
    planejar: ["Planejamento", "Organize seu roteiro", "Defina datas, custos estimados, hospedagem e atividades principais.", ["Datas da viagem", "Orcamento diario", "Checklist de reservas"]],
    historico: ["Historico", "Ultimas buscas e visitas", "Acompanhe os destinos que voce visualizou recentemente.", vistos.length ? vistos : catalogoDestinos.slice(0, 3).map((destino) => destino.nome)],
    perfil: ["Perfil", "Preferencias da Izadora", "Ajuste seus interesses para receber sugestoes mais alinhadas.", ["Praias tranquilas", "Natureza", "Viagens de 5 a 7 dias"]],
    configuracoes: ["Configuracoes", "Ajustes da conta", "Controle notificacoes, privacidade e preferencias da plataforma.", ["Notificacoes", "Privacidade", "Idioma e moeda"]],
    sair: ["Sessao", "Tudo certo por aqui", "Esta tela representa a acao de sair no prototipo.", ["Salvar favoritos", "Limpar filtros", "Voltar para destinos"]]
  };

  const [rotulo, titulo, texto, cards] = paginas[tela] || paginas.inicio;

  areaConteudo.innerHTML = `
    <section class="titulo-pagina titulo-menor">
      <span class="rotulo-secao">${rotulo}</span>
      <h1>${titulo}</h1>
      <p>${texto}</p>
    </section>
    <section class="grade-painel">
      ${cards.map((card, index) => `<article class="cartao-painel"><span>0${index + 1}</span><strong>${card}</strong><p>Conteudo preenchido para navegacao do prototipo.</p></article>`).join("")}
    </section>
  `;
}

function navegar(tela) {
  if (tela === "destinos") return abrirListagemDestinos("destinos");
  if (tela === "buscar") return abrirListagemDestinos("buscar");
  if (tela === "favoritos") return mostrarFavoritos();
  return mostrarTelaSimples(tela);
}

async function iniciar() {
  try {
    const resposta = await fetch("data.json");
    const dados = await resposta.json();
    catalogoDestinos = dados.destinos;
    atualizarResumoFavoritos();
    abrirListagemDestinos("destinos");
  } catch (erro) {
    areaConteudo.innerHTML = `<section class="mensagem-vazia">Nao foi possivel carregar os dados dos destinos.</section>`;
  }
}

linksMenu.forEach((botao) => botao.addEventListener("click", () => navegar(botao.dataset.view)));

buscaTopo.addEventListener("input", (event) => {
  filtrosAplicados.busca = event.target.value;
  abrirListagemDestinos("buscar");
});

abrirMenu.addEventListener("click", abrirMenuLateral);
fecharMenu.addEventListener("click", fecharMenuLateral);
fundoMenu.addEventListener("click", fecharMenuLateral);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") fecharCamadasAbertas();
});

iniciar();
