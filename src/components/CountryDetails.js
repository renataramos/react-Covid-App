import React from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'





export default function Country() {

    const [country, setCountry] = useState({})
    const [flag, setFlag] = useState({}) 
    
    const {countryID} = useParams();

        async function fetchData(){
            const data = await fetch(`https://disease.sh/v2/countries/${countryID}`)
            
            return data.json()
        }

        useEffect(()=>{
            let isMounted= true;
            
            fetchData().then((data)=> {
                if (isMounted){
                    setCountry(data)
                    setFlag(data.countryInfo.flag)
                }    
            })
            return () => isMounted = false}, []);
    
    
        const history = useHistory();
        const convertToMillion = function(number){
            return Math.round(number/1000000);
        }
        return (
            <div id="country-card">
                <h3><strong>{country.country}</strong></h3>
                <h5>_in <em>{country.continent}</em></h5>
                <div id ="details">
                <table>
                <thead>
                <tr>
                <td><img src={flag} alt="flag of the country in question"></img>
                </td>
                <td>
                <div id="details">
                <p>{country.cases} infected, <strong>of which {country.critical} are in critical status</strong>.</p>
                <p>{country.deaths} deaths, <strong> of which {country.todayDeaths} people died today</strong>. </p>
                <p>{country.recovered} recovered, <strong>and {country.todayCases} new cases were diagnosed</strong>.</p>
                <p>{country.tests} tests, <strong>in a country of {convertToMillion(country.population)} million inhabitants</strong>.</p>
                </div>
                </td> 
                </tr>
                </thead>
                </table>
                </div>

                <br></br>
                <button id="homeBtn" onClick={()=>{history.goBack()}} ><i id="homeBtn" className="fas fa-home"/></button>
            </div>
    
        )
    
    }

        





