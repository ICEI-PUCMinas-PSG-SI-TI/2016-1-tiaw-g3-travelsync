const api = "http://localhost:3000/comentarios";

// Carregar comentários
async function carregarComentarios() {

    let resposta = await fetch(api);

    let comentarios = await resposta.json();

    let lista = document.getElementById("listaComentarios");

    lista.innerHTML = "";

    comentarios.forEach(comentario => {

        let novoComentario = document.createElement("div");

        novoComentario.classList.add("comentario");

        let inicial =
            comentario.nome.charAt(0).toUpperCase();

        let respostasHTML = "";

        if (comentario.respostas) {

            comentario.respostas.forEach(resposta => {

                respostasHTML += `
                    <div class="resposta">
                        ${resposta.texto}
                    </div>
                `;
            });
        }

        novoComentario.innerHTML = `

            <div class="cabecalho">

                <div class="usuario">

                    <div class="avatar">
                        ${inicial}
                    </div>

                    <strong>
                        ${comentario.nome}
                    </strong>

                </div>

                <span
                    class="coracao ${comentario.favorito ? 'favoritado' : ''}"
                    onclick="favoritar('${comentario.id}', ${comentario.favorito})">

                    ♥

                </span>

            </div>

            <p class="texto-comentario">
                ${comentario.texto}
            </p>

            <button
                class="btn-responder"
                onclick="mostrarResposta('${comentario.id}')">

                Responder

            </button>

            <div
                id="resposta-${comentario.id}"
                style="display:none; margin-top:10px;">

                <input
                    type="text"
                    id="texto-${comentario.id}"
                    placeholder="Digite sua resposta">

                <button
                    onclick="enviarResposta('${comentario.id}')">

                    Enviar

                </button>

            </div>

            <div class="respostas">

                ${respostasHTML}

            </div>

        `;

        lista.appendChild(novoComentario);

    });
}

// Adicionar comentário
async function adicionarComentario(event) {

    if (event) {
        event.preventDefault();
    }

    let nome =
        document.getElementById("nome").value;

    let comentario =
        document.getElementById("comentario").value;

    if (nome === "" || comentario === "") {

        alert("Preencha todos os campos!");

        return;
    }

    await fetch(api, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            nome: nome,

            texto: comentario,

            favorito: false,

            respostas: []

        })
    });

    let mensagem =
        document.getElementById("mensagem");

    mensagem.innerText =
        "Comentário enviado com sucesso!";

    document.getElementById("nome").value = "";
    document.getElementById("comentario").value = "";

    carregarComentarios();

    setTimeout(() => {

        mensagem.innerText = "";

    }, 3000);
}

// Favoritar comentário
async function favoritar(id, favoritoAtual) {

    await fetch(`${api}/${id}`, {

        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            favorito: !favoritoAtual

        })
    });

    carregarComentarios();
}

// Mostrar campo de resposta
function mostrarResposta(id) {

    let campo =
        document.getElementById(`resposta-${id}`);

    if (campo.style.display === "none") {

        campo.style.display = "block";

    } else {

        campo.style.display = "none";
    }
}

// Enviar resposta
async function enviarResposta(id) {

    let texto =
        document.getElementById(`texto-${id}`).value;

    if (texto === "") {

        alert("Digite uma resposta!");

        return;
    }

    let resposta =
        await fetch(`${api}/${id}`);

    let comentario =
        await resposta.json();

    if (!comentario.respostas) {

        comentario.respostas = [];
    }

    comentario.respostas.push({

        texto: texto

    });

    await fetch(`${api}/${id}`, {

        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            respostas: comentario.respostas

        })
    });

    carregarComentarios();
}

// Inicialização
carregarComentarios();