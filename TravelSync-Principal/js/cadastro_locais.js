const usuario = 
JSON.parse(sessionStorage.getItem("usuarioLogado"))

if(!usuario || !usuario.admin){
    alert("Acesso permitido apenas para administradores!")
    window.location.href = "index.html"
}
let livros = JSON.parse(localStorage.getItem("livros")) || []

let idEditando = null

const form = document.getElementById("formLivro")
form.addEventListener("submit", function(event){
    event.preventDefault()
    const novoLivro ={
    id:Date.now(),
    nome:document.getElementById("nome").value,
    autor: document.getElementById("autor").value,
    descricao: document.getElementById("descricao").value,
    estrelas: document.getElementById("estrelas").value,
    classificacao: document.getElementById("classificacao").value,
    imagem_principal: document.getElementById("imagem").value,

    leituras_relacionadas: [
        {
            id: 1,
            nome: document.getElementById("rel1nome").value,
            descricao: document.getElementById("rel1desc").value,
            imagem: document.getElementById("imagem1").value
        },
        {
            id: 2,
            nome: document.getElementById("rel2nome").value,
            descricao: document.getElementById("rel2desc").value,
            imagem: document.getElementById("imagem2").value
        },
        {
            id: 3,
            nome: document.getElementById("rel3nome").value,
            descricao: document.getElementById("rel3desc").value,
            imagem: document.getElementById("imagem3").value
        },
        {
            id: 4,
            nome: document.getElementById("rel4nome").value,
            descricao: document.getElementById("rel4desc").value,
            imagem: document.getElementById("imagem4").value
        }
      ]
    }
  if(idEditando){
    const indice = livros.findIndex(
        livro => livro.id === idEditando 
    )
    novoLivro.id = idEditando
    livros[indice] = novoLivro
    idEditando = null
    alert("Livro atualizado")
  }
  else{
    livros.push(novoLivro)
    alert("Livro cadastrado com sucesso!")
  }
     localStorage.setItem(
        "livros",
        JSON.stringify(livros)
     )
     form.reset()
     mostrarLivrosCrud()
})
function mostrarLivrosCrud(){
    const listaCrud =
        document.getElementById("listaCrud")
    listaCrud.innerHTML = ""
    livros.forEach(livro => {
        listaCrud.innerHTML += `
          <div class="card p-2 mb-2">
                <h4>${livro.nome}</h4>
                <p>${livro.autor}</p>

                <button
                 class="btn btn-warning"
                 onclick="editarLivro(${livro.id})">
                 Editar
                </button>

                <button
                    class="btn btn-danger"
                    onclick="excluirLivro(${livro.id})">
                    Excluir
                </button>
            </div>
        `
    })
}

function excluirLivro(id){
    livros = livros.filter(
        livro => livro.id !== id
    )
    localStorage.setItem(
        "livros",
        JSON.stringify(livros)
    )
    mostrarLivrosCrud()
}

function editarLivro(id){
    const livro = livros.find(
        livro => livro.id === id
    )

    idEditando = id

    document.getElementById("nome").value = livro.nome
    document.getElementById("autor").value = livro.autor
    document.getElementById("descricao").value = livro.descricao
    document.getElementById("estrelas").value = livro.estrelas
    document.getElementById("classificacao").value = livro.classificacao
    document.getElementById("imagem").value = livro.imagem_principal
    if(livro.leituras_relacionadas){
    document.getElementById("rel1nome").value = livro.leituras_relacionadas[0]?.nome || ""
    document.getElementById("rel1desc").value = livro.leituras_relacionadas[0]?.descricao || ""
    document.getElementById("imagem1").value = livro.leituras_relacionadas[0]?.imagem || ""

    document.getElementById("rel2nome").value = livro.leituras_relacionadas[1]?.nome || ""
    document.getElementById("rel2desc").value = livro.leituras_relacionadas[1]?.descricao || ""
    document.getElementById("imagem2").value = livro.leituras_relacionadas[1]?.imagem || ""

    document.getElementById("rel3nome").value = livro.leituras_relacionadas[2]?.nome || ""
    document.getElementById("rel3desc").value = livro.leituras_relacionadas[2]?.descricao || ""
    document.getElementById("imagem3").value = livro.leituras_relacionadas[2]?.imagem || ""

    document.getElementById("rel4nome").value = livro.leituras_relacionadas[3]?.nome || ""
    document.getElementById("rel4desc").value = livro.leituras_relacionadas[3]?.descricao || ""
    document.getElementById("imagem4").value = livro.leituras_relacionadas[3]?.imagem || ""
}
}
mostrarLivrosCrud()