import React from 'react';
import {useState, useEffect} from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts'




export default function GlobalChart(props){
    
    const [casesData, setCasesData] = useState({});
    const [deathsData, setDeathsData] = useState({});
    const [recoveredData, setRecoveredData] = useState({});
    

    useEffect(()=>{
        let isMounted = true;

        async function fetchData() {
            const requestOption = {
                method: "GET",
                redirect: "follow",
                mode: 'cors'
            }
    
            try {
                const response = await fetch(`https://disease.sh/v2/historical/all`, requestOption)
    
                return response.ok ? response.json() : null
            } catch (err){
                console.log(err);
                return null;
            }
        }
    
        async function prepareData(){
            let apiValues = await fetchData();
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
            setCasesData(chartCasesData)

            for (let key in rawDeathsData){
                
                if(rawDeathsData.hasOwnProperty(key)){
                    const newRow = {
                        name: key,
                        value: parseInt(rawDeathsData[key])
                    }
                    chartDeathsData.push(newRow)
                    }
                }
            setDeathsData(chartDeathsData)

            for (let key in rawRecoveredData){
                
                if(rawRecoveredData.hasOwnProperty(key)){
                    const newRow = {
                        name: key,
                        value: parseInt(rawRecoveredData[key])
                    }
                    chartRecoveredData.push(newRow)
                    }
                }
            setRecoveredData(chartRecoveredData)
        }
        if(isMounted){
            prepareData();
        }
        return () => isMounted = false

    }, [])
    

    if(props.activeView === "cases"){
        return (
            <div id="homeChart" className="chart-wrapper">
            <div id="chartTitle"><h4><strong>last 30 days evolution worldwide</strong></h4></div>
                <AreaChart width={970} height={450} data={casesData}
                margin={{ top: 0, right: 10, left: 30, bottom: 70 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFA500" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FFA500" stopOpacity={0}/>
                    </linearGradient>
                
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#FFA500" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </div>
        )

    }

    if(props.activeView ==="recovered"){
        return (
            <div id="homeChart" className="chart-wrapper">
            <div id="chartTitle"><h4><strong>last 30 days evolution worldwide</strong></h4></div>
                <AreaChart width={970} height={450} data={recoveredData}
                margin={{ top: 0, right: 10, left: 30, bottom: 70 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#008000" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#008000" stopOpacity={0}/>
                    </linearGradient>
                
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#008000" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </div>
        )

    }
    
    return (
        <div id="homeChart" className="chart-wrapper">
        <div id="chartTitle"><h4><strong>last 30 days evolution worldwide</strong></h4></div>
            <AreaChart width={970} height={450} data={deathsData}
            margin={{ top: 0, right: 10, left: 30, bottom: 70 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
                </linearGradient>
            
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#FF0000" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </div>
    )
        
}

