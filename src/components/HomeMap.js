import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};`

export default class HomeMap extends React.Component{

    componentDidMount(){
        this.map = L.map('map', {
            center: [40, 0],
            zoom: 2,
            zoomControl: false
        });

        L.tileLayer('https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png', {
        detectRetina: true,
        maxNativeZoom: 20,
        maxZoom: 20,
	    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(this.map);       
    }

    render(){
        return <Wrapper width="1100px" height="730px"/>

    }


}