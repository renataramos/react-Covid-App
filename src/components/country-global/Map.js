import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default class Map extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            layerGroup: L.layerGroup([])
        }
    }

    componentDidMount(){
        this.map = L.map('map', {
            center: [27, 0],
            zoom: 2.5,
            scrollWheelZoom: false
          });

        L.tileLayer('https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png', {
        maxNativeZoom: 20,
        maxZoom: 20,
	    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    componentDidUpdate(){
        
        this.state.layerGroup.clearLayers();

        if(this.props.isFiltered){
            this.props.countries
            .filter((country) => country.country === this.props.input)
            .map((element)=>{
                const layer = L.circle([element.countryInfo.lat, element.countryInfo.long], {color: 'red', radius: 200})
                const outerLayer = L.circleMarker([element.countryInfo.lat, element.countryInfo.long], {color: 'steelblue', radius: 50})
                this.state.layerGroup.addLayer(layer)
                this.state.layerGroup.addLayer(outerLayer)
                return layer;
            });
            this.state.layerGroup.addTo(this.map) 
        }

        if(!this.props.isFiltered){
            this.props.countries.sort((a,b) => b[this.props.activeView] - a[this.props.activeView])
            .map((element) => {
                const circleRadius = element[this.props.activeView]/25000;
                const layer = L.circleMarker([element.countryInfo.lat, element.countryInfo.long], {color: conditionalStyling(this.props.activeView), radius: circleRadius})
                this.state.layerGroup.addLayer(layer)
                return layer;
            });
            this.state.layerGroup.addTo(this.map)
        }
    }
    render(){
        return  <div id="map"></div>
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