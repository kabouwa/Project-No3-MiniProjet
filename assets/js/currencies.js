const countryAPI = 'https://api.restcountries.com/countries/v5?';
const Auth = 'Bearer rc_live_5d3448b93f594d16877742768c0a4838'

async function getCountry(limit=1,offset=0){
    const res = await  fetch(countryAPI + `limit=${limit}&offset=${offset}`,{ 
        method : "GET",
        headers: { 'Authorization':  Auth},
    })
    const data = await res.json()
    return data.data.objects
}

async function Currencies(){
    let countries = await getCountry(100,0)
    countries.push(... await getCountry(100,100))
    countries.push(... await getCountry(100,200))
    
    countries = countries.map(country => country.currencies.map(country => country.code)).filter(tab => tab.length)
    finalResult = []
    countries.forEach(tab => {
        tab.forEach(currency => finalResult.push(currency))
    })
    return finalResult
}


fetch("/assets/js/currencies.json")
.then(res => res.json() )
.then(currencies => {
    $("#devise").html(
        `<option value="" selected disabled>Choisir</option>`
        + currencies.map(currency => `<option value="${currency}">${currency}</option>`).join("")
    )
})
