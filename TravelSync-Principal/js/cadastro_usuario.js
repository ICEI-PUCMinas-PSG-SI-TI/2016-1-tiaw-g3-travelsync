
const form = document.getElementById("cadastrousu")
form.addEventListener("submit", function(event){
    event.preventDefault()
    
    console.log("entrado no submit")

    const nome = document.getElementById("ino").value
    const email = document.getElementById("iemail").value
    const senha = document.getElementById("isenha").value
    const usuario = document.getElementById("inousu").value

    console.log("dados pegos")

    const usuarios =
       JSON.parse(localStorage.getItem("usuarios")) || []

    console.log(" localStorage lido")

    const novoUsuario = {
        id: Date.now(),
        nome: nome,
        email: email,
        senha: senha,
        usuario: usuario,
        admin: false,
        favoritos: []
    }

    usuarios.push(novoUsuario)

     console.log("usuário adicionado")

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    )

    console.log("salvo no localstorage")

    sessionStorage.setItem(
        "ultimoCadastro",
        JSON.stringify({
            email: email, 
            senha: senha
        })
    )
    alert("Usuário cadastrado com sucesso!")
    
    setTimeout(() => {
    window.location.href = "login.html"
}, 2000)
})
