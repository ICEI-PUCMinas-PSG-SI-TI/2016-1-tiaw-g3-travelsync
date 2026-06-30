const form = document.getElementById("formPerfil");
const msg = document.getElementById("msg");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const foto = document.getElementById("foto");
const bio = document.getElementById("bio");
const fotoPreview = document.getElementById("fotoPreview");


const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));


if (!usuario) {
  msg.textContent = "Você precisa estar logado para editar o perfil.";
}


function carregarPerfil() {
  if (!usuario) return;

  nome.value = usuario.nome || "";
  email.value = usuario.email || "";
  foto.value = usuario.foto || "";
  bio.value = usuario.bio || "";

  fotoPreview.src =
    usuario.foto || "https://via.placeholder.com/120";
}

carregarPerfil();


foto.addEventListener("input", () => {
  fotoPreview.src = foto.value || "https://via.placeholder.com/120";
});


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuarioAtualizado = {
    ...usuario,
    nome: nome.value,
    email: email.value,
    foto: foto.value,
    bio: bio.value
  };

  sessionStorage.setItem(
    "usuarioLogado",
    JSON.stringify(usuarioAtualizado)
  );


  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios = usuarios.map((u) =>
    u.email === usuario.email ? usuarioAtualizado : u
  );

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  msg.textContent = "Perfil atualizado com sucesso!";
  setTimeout(() => (msg.textContent = ""), 2500);
});