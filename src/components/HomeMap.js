import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};`

export default class HomeMap extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            
            layerGroup: L.layerGroup([])
        }
    }

    componentDidMount(){
        this.map = L.map('map', {
            center: [40, 0],
            zoom: 2,
          });

        L.tileLayer('https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png', {
        maxNativeZoom: 20,
        maxZoom: 20,
	    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(this.map);
 
    }

    componentDidUpdate(prevProps, prevState){
        
        this.state.layerGroup.clearLayers();

        if(this.props.activeView ==='cases'){
            this.props.countries.sort((a,b) => b.cases - a.cases)
            .slice(0,20)
            .map((element) => {
                const circleRadius = element.cases/25000;
                const layer = L.circleMarker([element.countryInfo.lat, element.countryInfo.long], {color: 'orange', radius: circleRadius})
                this.state.layerGroup.addLayer(layer)
                return layer;
            });
            this.state.layerGroup.addTo(this.map)
        }

        if(this.props.activeView ==='recovered'){
            this.props.countries.sort((a,b) => b.recovered - a.recovered)
            .slice(0,20)
            .map((element) => {
                const circleRadius = element.recovered/25000;
                const layer = L.circleMarker([element.countryInfo.lat, element.countryInfo.long], {color: 'green', radius: circleRadius})
                this.state.layerGroup.addLayer(layer)
                return layer;
            });
            this.state.layerGroup.addTo(this.map)
        }

        if(this.props.activeView ==='deaths'){


            this.props.countries.sort((a,b) => b.deaths - a.deaths)
            .slice(0,20)
            .map((element) => {
                const circleRadius = element.deaths/10000;
                const layer = L.circleMarker([element.countryInfo.lat, element.countryInfo.long], {color: 'red', radius: circleRadius})
                this.state.layerGroup.addLayer(layer)
                return layer;
            });
            this.state.layerGroup.addTo(this.map)
        }
    }

    render(){
        return <Wrapper width="1100px" height="730px"/>

    }
}