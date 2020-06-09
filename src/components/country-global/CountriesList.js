import React from 'react';
import {
    Link,
} from 'react-router-dom'


export default function CountriesList(props){

    if (!props.isFiltered){
        
        return (
            <div>
                <div id="num">
                    <h5 style={{color: conditionalStyling(props.activeView)}}><strong>total of {props.activeView}:</strong></h5> 
                    <h3 style={{color: conditionalStyling(props.activeView)}}><strong>{props[props.activeView]}</strong></h3>
                </div>
                <ol id="countries">
                {props.countries.sort((a,b)=> b[props.activeView] - a[props.activeView])
                        
                        .map((element)=>(
                            <li key = {element.country}>
                                <Link id="link" to={`/${element.country}`}> <strong>{element.country}</strong> : {element[props.activeView]} </Link>
                            </li>
                        ))}
                    </ol>   
            </div>
        )
    }

    if (props.isFiltered){
       
        return (
            <div>
                <div id="num">
                    <h5 style={{color: conditionalStyling(props.activeView)}}><strong>total of {props.activeView}</strong></h5> 
                    <h3 style={{color: conditionalStyling(props.activeView)}}><strong>{props[props.activeView]}</strong></h3>
                </div>
                    <ul>
                        {props.countries.filter((country)=>country.country === props.input)
                            .map((element)=>(
                                <li key = {element.countryInfo._id}>
                                    <Link id="link" to={`/${element.country}`}> <strong>{element.country}</strong> : {element[props.activeView]} </Link>
                                </li>
                            ))}
                    </ul>   
            </div>)
        }
}


function conditionalStyling(activeView){
    if (activeView === 'cases'){
        return "orange"
    }
    if (activeView === 'deaths'){
        return "red"
    }
    return "green"
}
                                      