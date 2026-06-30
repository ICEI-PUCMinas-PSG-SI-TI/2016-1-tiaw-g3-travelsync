const formLogin = document.getElementById("login");
const formSenha = document.getElementById("formRedefinirSenha");
const ultimoCadastro = JSON.parse(sessionStorage.getItem("ultimoCadastro") || "null");

if (ultimoCadastro) {
  document.getElementById("iemail").value = ultimoCadastro.email || "";
  document.getElementById("isenha").value = ultimoCadastro.senha || "";
}

function pegarUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

function salvarUsuarios(lista) {
  localStorage.setItem("usuarios", JSON.stringify(lista));
}

function montarAdmin(email) {
  return {
    id: "admin",
    nome: "Administrador",
    usuario: "admin",
    email,
    admin: true
  };
}

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("iemail").value.trim().toLowerCase();
  const senha = document.getElementById("isenha").value;

  if ((email === "admin@gmail" || email === "admin@gmail.com") && senha === "1234") {
    sessionStorage.setItem("usuarioLogado", JSON.stringify(montarAdmin(email)));
    window.location.href = "cadastro_locais.html";
    return;
  }

  const usuarios = pegarUsuarios();
  const usuarioEncontrado = usuarios.find((usuario) => {
    return usuario.email.toLowerCase() === email && usuario.senha === senha;
  });

  if (!usuarioEncontrado) {
    alert("Email ou senha incorretos.");
    return;
  }

  sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
  window.location.href = "index.html";
});

formSenha.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("emailRecuperacao").value.trim().toLowerCase();
  const novaSenha = document.getElementById("novaSenha").value;
  const usuarios = pegarUsuarios();
  const indice = usuarios.findIndex((usuario) => usuario.email.toLowerCase() === email);

  if (email === "admin@gmail" || email === "admin@gmail.com") {
    alert("A senha do administrador padrao continua sendo 1234.");
    return;
  }

  if (indice === -1) {
    alert("Nao encontrei uma conta com esse email.");
    return;
  }

  usuarios[indice].senha = novaSenha;
  salvarUsuarios(usuarios);
  alert("Senha atualizada. Agora voce ja pode entrar.");
  formSenha.reset();
});