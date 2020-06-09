import React from 'react';
import {useState, useEffect} from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {fetchGlobalChartData} from '../ApiService.js'


export default function GlobalChart(props){
    
    const [data, setData] = useState({});
    
    useEffect(()=>{
        let isMounted = true;

        async function prepareData(){

            let apiValues = await fetchGlobalChartData();
            let rawCasesData = apiValues["cases"];
            let rawDeathsData = apiValues["deaths"];
            let rawRecoveredData = apiValues["recovered"];
            
            const chartCasesData = []
            const chartDeathsData = []
            const chartRecoveredData = []


            for (let key in rawCasesData){
                
                if(rawCasesData.hasOwnProperty(key)){
                    const newRow = {
                        name: key,
                        value: parseInt(rawCasesData[key])
                    }
                    chartCasesData.push(newRow)
                    }
                }
            

            for (let key in rawDeathsData){
                
                if(rawDeathsData.hasOwnProperty(key)){
                    const newRow = {
                        name: key,
                        value: parseInt(rawDeathsData[key])
                    }
                    chartDeathsData.push(newRow)
                }
            }
           
            for (let key in rawRecoveredData){
                
                if(rawRecoveredData.hasOwnProperty(key)){
                    const newRow = {
                        name: key,
                        value: parseInt(rawRecoveredData[key])
                    }
                    chartRecoveredData.push(newRow)
                }
            }
            
            setData({
                cases: chartCasesData,
                deaths: chartDeathsData,
                recovered: chartRecoveredData
            })
        }

        if(isMounted){
            prepareData();
        }
        return () => isMounted = false

    }, [])

    return (
        <div id="homeChart" className="chart-wrapper">
            <div id="chartTitle"><h4><strong>last 30 days evolution worldwide</strong></h4></div>
            <ResponsiveContainer width="95%" height={350}>
            
                <AreaChart width={970} height={350} data={data[props.activeView]}
                margin={{ top: 0, right: 10, left: 30, bottom: 70 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={conditionalStyling(props.activeView)} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={conditionalStyling(props.activeView)} stopOpacity={0}/>
                    </linearGradient>
                
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke={conditionalStyling(props.activeView)} fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
                </ResponsiveContainer>
        </div>
    )
}

function conditionalStyling(activeView){
    if (activeView==='cases'){
        return "#FFA500"
    }
    if (activeView==='deaths'){
        return "#FF0000"
    }
    return "#008000"
}

