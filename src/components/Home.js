import React from 'react';
import CountriesList from './country-global/CountriesList.js'
import NavBar from './country-global/NavBar.js'
import Input from './country-global/Input.js'
import Map from './country-global/Map.js'
import GlobalChart from './country-global/GlobalChart.js'
import {fetchCountriesData} from './ApiService.js'
import {fetchGlobalData} from './ApiService.js'

export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            casesNum: 0,
            recoveredNum: 0,
            deathsNum: 0,
            activeView: 'cases',
            countries: [],
            input: '',
            filtered: false,
            loading: true
        }
        this._isMounted = false
        this.handleGlobalData = this.handleGlobalData.bind(this)
        this.handleCountriesData = this.handleCountriesData.bind(this)
        this.handleSelectView = this.handleSelectView.bind(this)
        this.updateInput = this.updateInput.bind(this)
        this.toggleFiltered = this.toggleFiltered.bind(this)
    }

    componentDidMount(){
        this.handleGlobalData()
        this.handleCountriesData();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.activeView !== this.state.activeView){
            this.handleGlobalData();
            this.handleCountriesData();
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleGlobalData(){
        this.setState({
            loading: true
        })
        fetchGlobalData()
        .then((data) =>{
            this.setState({
                loading: false,
                casesNum: data.cases,
                recoveredNum: data.recovered,
                deathsNum: data.deaths
            })
        })
    }

    handleCountriesData(){
        fetchCountriesData()
        .then((data)=>{
            this.setState({
                countries: data
            })
        })
    }

    handleSelectView(viewName){
        this.setState({
            activeView: viewName
        })
    }

    updateInput(event){
        const value = event.target.value

        this.setState({
            input: value
        })
    }

    toggleFiltered(){
        const filtered = this.state.filtered;
        
        this.setState({
            filtered: !filtered
        })
    }

    render(){
        return (
            <div id="content">
                <table>
                <thead>
                    <tr>
                        <td>
                            <div id="list">
                            
                                <NavBar 
                                onSelectView={this.handleSelectView}
                                />
                                
                                
                                <div id = "container">
                                    <Input
                                    value={this.state.input}
                                    onInputChange={this.updateInput}
                                    onSubmit={this.toggleFiltered}
                                    isFiltered={this.state.filtered}
                                    />
                                    
                                    <CountriesList
                                    cases={this.state.casesNum}
                                    recovered={this.state.recoveredNum}
                                    deaths={this.state.deathsNum}
                                    countries={this.state.countries}
                                    activeView={this.state.activeView}
                                    input={this.state.input}
                                    isFiltered={this.state.filtered}
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="map">
                                <Map 
                                activeView={this.state.activeView}
                                countries={this.state.countries}
                                input={this.state.input}
                                isFiltered={this.state.filtered}
                                />
                            </div>
                            <div id="globalChart">
                                <GlobalChart
                                activeView={this.state.activeView}
                                />
                            </div>       
                        </td>
                    </tr>
                </thead>
                </table>
            </div>
        )
    }   
}