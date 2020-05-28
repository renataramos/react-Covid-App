import React from 'react';
import {
    Link,
} from 'react-router-dom'


export default function CountriesList(props){

    if (!props.isFiltered){
        if (props.activeView === 'cases'){
            return (
                    <div>
                    
                    <div id="num">
                        <h3 style={{color: 'orange'}}><strong>{props.casesNum}</strong></h3>
                    </div>
                        <ul>
                        {props.countries.sort((a,b)=> b.cases - a.cases)
                            .slice(0,20)
                            .map((element)=>(
                                <li key = {element.countryInfo._id}>
                                    <Link id="link" to={`/${element.country}`}> <strong>{element.country}</strong> : {element.cases} </Link>
                                </li>
                            ))}
                        </ul>   
                    </div>
            )
        }
    
        if (props.activeView === 'deaths'){
            return (
                    <div>
                    <div id="num">
                        <h3 style={{color: 'red'}}><strong>{props.deathsNum}</strong></h3>
                    </div>
                        <ul>
                        {props.countries.sort((a,b)=> b.deaths - a.deaths)
                            .slice(0,20)
                            .map((element)=>(
                                <li key = {element.countryInfo._id}>
                                    <Link id="link" to={`/${element.country}`}> <strong>{element.country}</strong> : {element.deaths} </Link>
                                </li>
                                ))}
                        </ul>   
                    </div>
            )
        }
    
        if (props.activeView === 'recovered'){
            return (
                    <div>
                    <div id="num">
                        <h3 style={{color: 'green'}}><strong>{props.recoveredNum}</strong></h3>
                    </div>
                        <ul>
                        {props.countries.sort((a,b)=> b.recovered - a.recovered)
                            .slice(0,20)
                            .map((element)=>(
                                <li key = {element.countryInfo._id}>
                                    <Link id="link" to={`/${element.country}`}> <strong>{element.country}</strong> : {element.recovered} </Link>
                                </li>
                                
                                ))}
                        </ul>   
                    </div>
            )
        }

    }

    if (props.isFiltered){
        if(props.activeView === 'cases'){
            return (
                <div>
                    <div id="num">
                        <h3 style={{color: 'orange'}}><strong>{props.casesNum}</strong></h3>
                    </div>
                        <ul>
                            {props.countries.filter((country)=>country.country === props.input)
                                .map((element)=>(
                                    <li key = {element.countryInfo._id}>
                                        <Link id="link" to={`/${element.country}`}> <strong>{element.country}</strong> : {element.cases} </Link>
                                    </li>
                                ))}
                        </ul>   
                </div>)

        }

        if(props.activeView === 'recovered'){
            return (
                <div>
                    <div id="num">
                        <h3 style={{color: 'green'}}><strong>{props.recoveredNum}</strong></h3>
                    </div>
                        <ul>
                            {props.countries.filter((country)=>country.country === props.input)
                                .map((element)=>(
                                    <li key = {element.countryInfo._id}>
                                        <Link id="link" to={`/${element.country}`}> <strong>{element.country}</strong> : {element.recovered} </Link>
                                    </li>
                                ))}
                        </ul>   
                </div>) 

        }

        if(props.activeView === 'deaths'){

            return (
                <div>
                    <div id="num">
                        <h3 style={{color: 'red'}}><strong>{props.deathsNum}</strong></h3>
                    </div>
                        <ul>
                            {props.countries.filter((country)=>country.country === props.input)
                                .map((element)=>(
                                    <li key = {element.countryInfo._id}>
                                        <Link id="link" to={`/${element.country}`}> <strong>{element.country}</strong> : {element.deaths} </Link>
                                    </li>
                                ))}
                        </ul> 
                </div>)
        }
    }
}

                                      