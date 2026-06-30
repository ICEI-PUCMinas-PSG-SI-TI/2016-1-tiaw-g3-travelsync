const formCadastro = document.getElementById("cadastrousu");

formCadastro.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("ino").value.trim();
  const email = document.getElementById("iemail").value.trim().toLowerCase();
  const senha = document.getElementById("isenha").value;
  const usuario = document.getElementById("inousu").value.trim();
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  const emailJaExiste = usuarios.some((item) => item.email.toLowerCase() === email);
  if (emailJaExiste) {
    alert("Esse email ja esta cadastrado. Tente entrar ou redefinir a senha.");
    return;
  }

  const novoUsuario = {
    id: Date.now(),
    nome,
    email,
    senha,
    usuario,
    admin: false,
    favoritos: []
  };

  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  sessionStorage.setItem("ultimoCadastro", JSON.stringify({ email, senha }));

  alert("Usuario cadastrado com sucesso!");
  window.location.href = "login.html";
});