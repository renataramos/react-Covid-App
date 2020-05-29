import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'

export default function CountryChart(props){

    const {countryID} = useParams();
    const [data, setData] = useState({});

    useEffect(()=>{
        let isMounted=true;

        async function fetchData() {
            const requestOption = {
                method: "GET",
                redirect: "follow"
            }
    
            try {
                const response = await fetch(`https://disease.sh/v2/historical/${countryID}`, requestOption)
    
                return response.ok ? response.json() : null
            } catch (err){
                console.log(err);
                return null;
            }
        }

        async function prepareData(){
            let apiValues = await fetchData();
            let rawTimelineData = apiValues["timeline"]
            let rawCasesData = rawTimelineData["cases"]
            let rawRecoveredData = rawTimelineData["recovered"]
            let rawDeathData = rawTimelineData["deaths"]

            const chartData = [];

            for (let key in rawCasesData){
                if (rawCasesData.hasOwnProperty(key)){
                    const newRow = {
                        name: key,
                        cases: parseInt(rawCasesData[key]),
                        recovered: parseInt(rawRecoveredData[key]),
                        deaths: parseInt(rawDeathData[key])

                    }
                    chartData.push(newRow)
                }
            }

            setData(chartData)
        }

        if(isMounted){
            prepareData();
        }
        return () => isMounted = false

    }, [])

    return (
        <div>
        <LineChart width={1100} height={550} data={data}
        margin={{ top: 55, right: 30, left: 20, bottom: 75 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Line type="monotone" dataKey="cases" stroke="#FFA500" />
        <Line type="monotone" dataKey="recovered" stroke="#008000" />
        <Line type="monotone" dataKey="deaths" stroke="#FF0000" />
        
        <Legend />
        <Tooltip />
        </LineChart>
        
        
        
        
        </div>


    )

}