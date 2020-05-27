import React from 'react';

export default function NavBar(props){
    const viewNames = ['cases', 'deaths', 'recovered']

    return(
        <div id='nav'>
        <nav>
        {viewNames.map((viewName) =>(
            
            <button type="button" key={viewName} onClick={()=> props.onSelectView(viewName)}>
            <strong>{viewName}</strong></button>
            
            ))}
            
            </nav>
        </div>

    )

}

