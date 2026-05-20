const api = "http://localhost:3000/comentarios";

// Função para carregar comentários
async function carregarComentarios() {

    let resposta = await fetch(api);

    let comentarios = await resposta.json();

    let lista = document.getElementById("listaComentarios");

    lista.innerHTML = "";

    comentarios.forEach(comentario => {

        let novoComentario = document.createElement("div");

        novoComentario.classList.add("comentario");

        novoComentario.innerHTML = `
            <strong>${comentario.nome}</strong>
            <p>${comentario.texto}</p>
        `;

        lista.appendChild(novoComentario);
    });
}

// Função para adicionar comentário
async function adicionarComentario() {

    let nome = document.getElementById("nome").value;

    let comentario = document.getElementById("comentario").value;

    if (nome === "" || comentario === "") {

        alert("Preencha todos os campos!");

        return;
    }

    // Envia para API
    await fetch(api, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome: nome,
            texto: comentario
        })
    });

    // Mensagem
    document.getElementById("mensagem").innerText =
        "Comentário enviado com sucesso!";

    setTimeout(() => {
        document.getElementById("mensagem").innerText = "";
    }, 4000);

    // Limpa campos
    document.getElementById("nome").value = "";
    document.getElementById("comentario").value = "";

    // Atualiza lista
    carregarComentarios();
}

// Carrega comentários ao abrir página
carregarComentarios();