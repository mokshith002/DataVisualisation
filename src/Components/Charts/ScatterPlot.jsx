import React, { useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,} from "recharts";
import AttributeOptions from "./Miscellaneous";
import { generateRandomColor } from "./Miscellaneous";


export default function ScatterPlot(props){

    const {data, headers, filename} = props;

    const [types, setTypes] = React.useState([])
    const [scatterPlots, setScatterPlots] = React.useState()
    const [numericOptions, setNumericOptions] = React.useState([])
    const [typeOptions, setTypeOptions] = React.useState([])
    const [formData, setFormData] = React.useState({
        groupBy: "",
        xAxis: "",
        yAxis: "",
    })
    const [checkBoxes, setCheckBoxes] = useState({})


    
    // console.log(types);
    
    const generateScatterComponents = () => {
    
      if(types.length == 0){
        setScatterPlots(
            <Scatter name="All" data={data} fill={generateRandomColor()} />
          );
          return 
        }

        const formattedData = [];
        types.forEach(type => {
            const arr = data.filter(obj => obj[formData.groupBy] == type)
            formattedData.push(arr)
        })

        setScatterPlots(() => formattedData
          .filter(arr => checkBoxes[arr[0][formData.groupBy]])
          .map((arr) => { 
            return <Scatter
                name={arr[0][formData.groupBy]}
                data={arr}
                fill={generateRandomColor()}
            />
        }))
    }

    const generateCheckBoxes = () => {
      let obj = {}
      types.forEach(type => obj = {...obj, [type]: true})
      setCheckBoxes(({...obj}))
    }


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((oldData) => ({
            ...oldData,
            [name]: value
        }))
    }

    const handleCheckBoxChange = (e) => {
      const {name} = e.target;
      setCheckBoxes(prev => ({
        ...prev,
        [name]: !prev[name]
      }))
    }

    React.useEffect(() => {        
        generateCheckBoxes()
        generateScatterComponents();
    },[types])

    React.useEffect(() => {
      generateScatterComponents();
    },[checkBoxes])

    React.useEffect(() => {
      formData.groupBy == "" ? setTypes([]) : setTypes([...new Set(data.map((row) => row[formData.groupBy]))]);
    },[formData])

    React.useEffect(() => {
      // console.log(formData);
    },[formData])

    React.useEffect(() => {
        setTypeOptions([...new Set(headers.filter(header => typeof data[0][header] == "string"))])
        setNumericOptions([...new Set(headers.filter(header => typeof data[0][header] == "number"))])
    },[])


    return (

      <div class="p-5 container">

        <div class="row text-center">
          <div class="row">
            <h2>
              Scatter Plot for <u><i>{filename}</i></u>
            </h2>
          </div>
        </div>

        <div class="d-flex justify-content-between w-75 mb-4">
          <AttributeOptions handleChange={handleChange} value={formData.groupBy} name="groupBy" options={typeOptions} text="Chose attributes to Group by"/>
          <AttributeOptions handleChange={handleChange} value={formData.xAxis} name="xAxis" options={numericOptions} text="Chose X axis"/>
          <AttributeOptions handleChange={handleChange} value={formData.yAxis} name="yAxis" options={numericOptions} text="Chose Y axis"/>
        </div>

        {/* <CheckBoxes types={types} handleChange={handleCheckBoxChange} checkStates={checkBoxes}/> */}

        <div class="d-flex justify-content-between w-75 mb-4">
          {types.map(type => <div><input checked={checkBoxes[type]} name={type} onChange={handleCheckBoxChange} type="checkbox"/>&nbsp; {type}</div>)}
        </div>

        <ResponsiveContainer width="80%" height={600}>
          <ScatterChart width={400} 
            height={400} 
            margin={{ top: 20, right: 20, bottom: 20, left: 20,}} 
          >
          <CartesianGrid />
            <XAxis 
              type="number" 
              dataKey={formData.xAxis} 
              name={formData.xAxis} 
              unit="cm" 
              domain={["auto", "auto"]} 
              tickCount="10"
            />
            <YAxis 
              type="number" 
              dataKey={formData.yAxis} 
              name={formData.yAxis} 
              unit="cm" 
              domain={["auto", "auto"]} 
              tickCount="10"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            {scatterPlots}
          </ScatterChart>
        </ResponsiveContainer>

      </div>
    );
}
