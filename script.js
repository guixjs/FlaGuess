const form = document.getElementById("form")

form.addEventListener("submit", async (event)=>{
    event.preventDefault()
    const input = document.getElementById("form-input").value
    const paisEncontrado = await buscarPais(input)
    console.log(paisEncontrado)
})


async function buscarPais (pais){
    const url = `https://restcountries.com/v3.1/name/${pais}`
    const response = await fetch(url)
    const dadosPais = await response.json()
    return dadosPais[0]
}
