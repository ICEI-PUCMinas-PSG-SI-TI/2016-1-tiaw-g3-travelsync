const form = document.getElementById("formPerfil");
const msg = document.getElementById("msg");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const foto = document.getElementById("foto");
const bio = document.getElementById("bio");
const fotoPreview = document.getElementById("fotoPreview");
const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado") || "null");

if (!usuario) {
  alert("Entre na sua conta para editar o perfil.");
  window.location.href = "login.html";
}

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

carregarPerfil();
