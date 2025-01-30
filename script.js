function iconBloquearBandeira(texto){
    const btnTeste = document.getElementById("iconFlag")
    btnTeste.innerText = texto
    // progress_activity - QUANDO ESTIVER CARREGANDO
    //lock - quando estiver bloqueado
}

let dicas = 1;
const btnDica = document.querySelector(".btnDica")


const form = document.querySelector(".form")

form.addEventListener("submit",(evento)=>{
    evento.preventDefault()
})

async function sortearPais(){
    const response = await fetch(`https://restcountries.com/v3.1/all`)
    const listaPaises = await response.json()
    const indexSorteado = Math.floor(Math.random() * listaPaises.length);
    const pais = listaPaises[indexSorteado];

    console.log(pais)
    const infoPais = {
        bandeira: pais.flags.png,
        area: pais.area,
        populacao: pais.population,
        moeda: Object.values(pais.currencies)[0].symbol,
        idioma: Object.values(pais.languages).join(", "),
        continente: pais.continents[0],
        capital: pais.capital[0]
    }
    return infoPais
}

async function mostrarDicas() {
    const infoPais = await sortearPais()
    
    document.getElementById("area").textContent = `Área (em Km): ${infoPais.area}`
    document.getElementById("populacao").textContent = `Total de habitantes: ${infoPais.populacao}`


    document.getElementById("moeda").textContent = `Moeda: ${infoPais.moeda}`
    document.getElementById("idioma").textContent = `Idioma(s): ${infoPais.idioma}`


    document.getElementById("continente").textContent = `Continente: ${infoPais.continente}`
    document.getElementById("capital").textContent = `Capital: ${infoPais.capital}`


    document.querySelector("img").src = infoPais.bandeira
  iconBloquearBandeira(" ")
    
}

mostrarDicas()