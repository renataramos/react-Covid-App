import React from 'react';

export default function Input(props){
    return (
        <div id="inputField">
        <input 
            id="input"
            type="text"
            placeholder="country name"
            value={props.value}
            onChange={props.onInputChange}
            
        />

        <button id="input-btn" onClick={props.onSubmit}><i className={changeButton(props)}></i>

        </button>
        </div>

    )
}

function changeButton(element){
    if(element.isFiltered){
        return "fas fa-search-plus" 
    }

    return "fas fa-search"
}

