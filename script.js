// ELEMENTOS DO HTML
const btnDica = document.querySelector(".btnDica")
const form = document.querySelector(".form")
const input = document.getElementById("input")
const btnMostrarResposta = document.querySelector(".btnRes")

const dicaNome = document.getElementById("letrasPais")
const content = document.querySelector(".content")
const titulo = document.querySelector("h2")

const bloqueios = document.querySelectorAll(".bloqueado");



//impede a página de recarregar e chama a verificarResposta
form.addEventListener("submit",(evento)=>{
    evento.preventDefault()
    
    if(input.value.toLowerCase() == paisDaVez.nome.toLowerCase()){
        titulo.textContent = "ACERTOU"
        content.style.border = "5px solid #00e700"
        setTimeout(resetarTentativas,900)
        proxPais()
    }else{
        titulo.textContent = "ERROU"
        content.style.border = "5px solid #e70000"
        setTimeout(resetarTentativas,900)
    }
})

// VARIAVEIS
let listaPaises = []
let paisDaVez = null
let indexRepetidos = []
let dicasLiberadas = 0; // Começa sem dicas liberadas


async function carregarPaises() {
    if(listaPaises.length === 0){
        const response = await fetch(`https://restcountries.com/v3.1/all`)
        listaPaises = await response.json()
    }
    return listaPaises
}

async function sortearPais(){
    if(listaPaises.length == 0){
        listaPaises = await carregarPaises()
    }
    let indexSorteado = Math.floor(Math.random() * listaPaises.length);

    indexRepetidos.forEach(repetidos => {
        if(indexSorteado == repetidos){
            indexSorteado = Math.floor(Math.random() * listaPaises.length);
        }
    });
    const pais = listaPaises[indexSorteado];
    indexRepetidos.push(indexSorteado)
    
    paisSorteado = {
        nome: Object.values(pais.translations.por)[1],
        bandeira: pais.flags.png,
        moeda: Object.values(pais.currencies)[0].symbol,
        idioma: Object.values(pais.languages).join(", "),
        continente: pais.continents[0],
        capital: pais.capital[0]
    }
    
    paisDaVez = paisSorteado
    return paisSorteado
}


async function inserirInfos() {

    const infoPais = await sortearPais()

    document.getElementById("moeda").textContent = `Moeda: ${infoPais.moeda}`
    document.getElementById("idioma").textContent = `Idioma(s): ${infoPais.idioma}`

    document.getElementById("capital").textContent = `Capital: ${infoPais.capital}`
    document.getElementById("continente").textContent = `Continente: ${infoPais.continente}`

    
    const flag = document.querySelector("img");
    flag.src = infoPais.bandeira;
    await letrasNome()
    
}

async function letrasNome(){
    const nome = await paisDaVez.nome
    let nomePais = ''
    for (let i = 0; i < nome.length; i++) {
        if (nome[i] === " ") {
            nomePais += " ";
        } else if (i === 0 || nome[i - 1] === " ") {
            nomePais += nome[i];
        } else {
            nomePais += "_";
        }
    }
    dicaNome.innerText = `Resposta: ${nomePais} (${nome.length} letras)`

}

function mostrarRes(){
    if(dicasLiberadas<2){
        mostrarDica()
        mostrarDica()
    }
    dicaNome.innerHTML = `Resposta: ${paisDaVez.nome}`
    setTimeout(proxPais,1500)
}

function mostrarDica(){
    if (dicasLiberadas < bloqueios.length) {
        bloqueios[dicasLiberadas].style.opacity = "0%";
        dicasLiberadas++;
    }
}
async function proxPais(){
    bloqueios.forEach((bloqueio) => {
        bloqueio.style.opacity = "100%"; // Bloqueia novamente as dicas
    });
    dicasLiberadas = 0;
    await inserirInfos()
}

function resetarTentativas(){
    input.value = ""
    content.style.border = ""
    titulo.textContent = "ADIVINHE A BANDEIRA"
}
async function iniciarJogo(){
    alert("Não esqueça dos acentos!\nDivirta-se :)")
    await carregarPaises()
    inserirInfos()
    
}
iniciarJogo()