import React from 'react';
import {useParams, Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {browserHistory} from 'react-router'
import Loading from './Loading.js'
import CountryChart from './CountryChart.js'



function catchError(){
    browserHistory.push('/page-not-found')
    window.location.reload()
}

export default function Country() {

    const [country, setCountry] = useState({})
    const [flag, setFlag] = useState({})
    const [loadingStatus, setLoadingStatus]  = useState({})

    const {countryID} = useParams();

    async function fetchData(){
        const data = await fetch(`https://disease.sh/v2/countries/${countryID}`)
   

        if (!data.ok){
            throw new Error("Not found")
        }
            
        return data.json()
    }

    useEffect(()=>{
        let isMounted=true;
            
        setLoadingStatus(true)    
        fetchData().then((data)=> {
            if (isMounted){
                setCountry(data)
                setFlag(data.countryInfo.flag)
                setLoadingStatus(false)
            }    
        }).catch(catchError);

        return () => isMounted = false}, [])
            
                
    
    
    const convertToMillion = function(number){
            return Math.round(number/1000000);
    }

    return (
       <div>
       {loadingStatus=== true
       ? <Loading/>
       : <div id="country-container">
            <div id="country-title">
                <h3><strong>{country.country}</strong></h3>
                <h5>_in <em>{country.continent}</em></h5>
            </div>
            <div id="country-card">
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
                <div id="country-chart"><CountryChart/></div>
                <Link className="fas fa-home" id="homeBtn" to="/"></Link>
            </div>
        </div>}
        </div>
    
    )
    
}

        





