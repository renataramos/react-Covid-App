export async function fetchGlobalChartData() {
    
    const requestOption = {
        method: "GET",
        redirect: "follow",
        mode: 'cors'
    }

    try {
        const response = await fetch(`https://disease.sh/v2/historical/all`, requestOption)

        return response.ok ? response.json() : null
    } catch (err){
        console.log(err);
        return null;
    }
}

export async function fetchCountryChartData(countryID) {
    const requestOption = {
        method: "GET",
        redirect: "follow"
    }

    try {
        const response = await fetch(`https://disease.sh/v2/historical/${countryID}`, requestOption)

        return response.ok ? response.json() : null
    } catch (err){
        console.log(err);
        return null;
    }
}

export async function fetchCountryData(countryID){
    const data = await fetch(`https://disease.sh/v2/countries/${countryID}`)

    if (!data.ok){
        throw new Error("Not found")
    }
        
    return data.json()
}

export async function fetchCountriesData(){
    const requestOption = {
        method: "GET",
        redirect: "follow"
    }
    const api = `https://disease.sh/v2/countries`;
    const response = await fetch(api, requestOption);
    const content = await response.json();

    return content;
}

export async function fetchGlobalData(){
    const requestOption = {
        method: "GET",
        redirect: "follow",
        mode: 'cors'
    }
    const api = `https://disease.sh/v2/all`;
    const response = await fetch(api, requestOption);
    const content = await response.json();
  
    return content;
}