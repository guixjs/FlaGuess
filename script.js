
async function obterLista(){
    const response = await fetch(`https://restcountries.com/v3.1/all`)
    const listaPaises = await response.json()
    return listaPaises
}

async function sortearPais() {
    const listaPaises = await obterLista();
    const indexSorteado = Math.floor(Math.random()*listaPaises.length);
    return listaPaises[indexSorteado];
}
async function mostrarPais(){
    const pais = await sortearPais()
    const infoPais = {
        bandeira: pais.flags.png,
        area: pais.area,
        populacao: pais.population,
        moeda: Object.values(pais.currencies)[0].symbol,
        idioma: Object.values(pais.languages).join(", "),
        continente: pais.continents[0],
        capital: pais.capital[0]
    }
    mostrarDicas(infoPais)
}

async function mostrarDicas(infoPais) {
    document.getElementById("area").textContent = `Área (em Km): ${infoPais.area}`
    document.getElementById("populacao").textContent = `Total de habitantes: ${infoPais.populacao}`
    document.querySelector("img").src = infoPais.bandeira
    document.getElementById("moeda").textContent = `Símbolo da moeda local: ${infoPais.moeda}`
    document.getElementById("idioma").textContent = `Idioma(s): ${infoPais.idioma}`
    document.getElementById("continente").textContent = `Continente: ${infoPais.continente}`
    document.getElementById("capital").textContent = `Capital: ${infoPais.capital}`
    
}

mostrarPais()