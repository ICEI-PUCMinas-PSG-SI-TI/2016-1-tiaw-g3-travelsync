 
 const ultimoCadastro =
    JSON.parse(sessionStorage.getItem("ultimoCadastro"))

    if(ultimoCadastro){
        document.getElementById("iemail").value = 
        ultimoCadastro.email

         document.getElementById("isenha").value = 
        ultimoCadastro.senha
    }


const form = document.getElementById("login")
form.addEventListener("submit", function(event){
    event.preventDefault()

    const email = document.getElementById("iemail").value
    const senha = document.getElementById("isenha").value

    const usuarios =
       JSON.parse(localStorage.getItem("usuarios")) || []

    const usuarioEncontrado = usuarios.find( usuario =>
        usuario.email === email &&
        usuario.senha === senha
    )

    if(usuarioEncontrado){
        alert("Login concluído!!")
        sessionStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioEncontrado)
    )
      window.location.href = "index.html"
    }
    else{
        alert("Email ou senha incorretos!")
    }
})
