const card = [
    {
        "id":1,
        "nome": "Ingressos do Beach Park",
        "descricao": "Com mais de 200.000 m², une um dos melhores parque aquáticos do mundo, quatro resorts e restaurantes com deliciosas experiências gastronômicas. O Aqua Park é o parque aquático responsável pela aventura e diversão no destino, com mais de 30 atrações para todas as idades, desde quem gosta de relaxar nas piscinas até os amantes de adrenalina com toboáguas radicais.",
        "estrelas": 4,
        "precoAdulto": 265,
        "precoCrianca": 255,
        "imagem": "imagens/beachpark.jpg"
    }
]

const destino = document.getElementById("destino")

card.forEach(passeio=>{
    destino.innerHTML += `
  <img src="${passeio.imagem}" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title">${passeio.nome}</h4>
    <p class="card-text">${passeio.descricao}</p>
    <p class="card-text"><strong>Inteira: </strong>${passeio.precoAdulto}  <strong>Meia: </strong>${passeio.precoCrianca}</p>
    <p class="card-text"><small class="text-body-secondary"><strong>Estrelas: </strong> ${passeio.estrelas} &#x2B50;</small></p>
  </div>
    `
})

const nome = document.getElementById("ino")
const email = document.getElementById("iemail")
const adultos = document.getElementById("iadulto")
const crianca = document.getElementById("icrian")
const quartos = document.getElementById("iquarto")
const ingresso = document.getElementById("iconvite")
const dias = document.getElementById("idia")

function calcularTotal(){
    const dataIni = new Date(document.getElementById("idata").value)
    const dataFin = new Date(document.getElementById("idatafi").value)

    const adul = Number(document.getElementById("iadulto").value)
    const crian = Number(document.getElementById("icrian").value)
    let dia = 1
    if(document.getElementById("idata").value && document.getElementById("idatafi").value){
        dia = Math.ceil(
            (dataFin - dataIni) / (1000*60*60*24)
        )
        if(dia<= 0) dia = 1
    }
    const valorAdultos = 
           dia*adul*card[0].precoAdulto
    const valorCrianca = 
           dia*crian*card[0].precoCrianca
    const total = valorAdultos+valorCrianca
     document.getElementById("ReTotal").textContent =
         total.toFixed(2)
    document.getElementById("idia").value = dia
    document.getElementById("ReDias").textContent = dia
}
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener("change", () => {

        const pagamento =
            document.querySelector('input[type="radio"]:checked');

        document.getElementById("Repagamento").textContent =
            pagamento ? pagamento.nextElementSibling.textContent : "";
    });
});

function atualizarDados(){
    document.getElementById("ReNome").textContent = nome.value
    document.getElementById("ReEmail").textContent = email.value
    document.getElementById("ReAdulto").textContent = adultos.value
    document.getElementById("ReCrianca").textContent = crianca.value
    document.getElementById("ReQuarto").textContent = quartos.value
    document.getElementById("ReIngresso").textContent = ingresso.value
    document.getElementById("ReDias").textContent = dias.value
}


document.querySelectorAll("input").forEach( input => {
           input.addEventListener("input", () => {
            atualizarDados()
            calcularTotal()
    })
})

const form = document.getElementById("Reserva")

form.addEventListener("submit", async function(event){
    event.preventDefault()
    console.log("Submit funcionando")
    const reserva = {
        nome: nome.value,
        email: email.value,
        adultos: adultos.value,
        criancas: crianca.value,
        quartos: quartos.value,
        ingressos: ingresso.value,
        dias: dias.value,
        total: document.getElementById("ReTotal").textContent
    }
    try {
        const resposta = await fetch("http://localhost:3000/reserva", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
        });
        if (resposta.ok) {
            alert("Usuário cadastrado com sucesso!");
            form.reset();
        }
    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
    }

    })