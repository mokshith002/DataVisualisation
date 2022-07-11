import React, {useState, useEffect} from "react";
import AttributeOptions, {generateRandomColor} from "./Miscellaneous";
import Plot from 'react-plotly.js';


export default function RadarPlot(props){

    const {data, headers, filename} = props;

    const [types, setTypes] = React.useState([])
    const [radarPlot, setRadarPlot] = React.useState()
    const [numericOptions, setNumericOptions] = React.useState([])
    const [typeOptions, setTypeOptions] = React.useState([])
    const [formData, setFormData] = React.useState({
        groupBy: "",
    })
    const [checkBoxes, setCheckBoxes] = useState({})
    

    
    
    
    const generateRadarPlot = () => {
        
        if(types.length === 0) return;
        
        const filteredOptions = numericOptions.filter(heading => heading != formData.groupBy);  
        
        const plot = data.filter(row => checkBoxes[row[formData.groupBy]]).map(row => ({
            type: 'scatterpolar',
            r: [...filteredOptions.map(op => row[op]), row[filteredOptions[0]]],
            theta: [...filteredOptions, filteredOptions[0]],
            fill: 'toself',
            name: row[formData.groupBy]
        }))
        
   

      console.log(plot);

      setRadarPlot(plot);        
      
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
    },[types])

    React.useEffect(() => {
      generateRadarPlot();
    },[checkBoxes])

    React.useEffect(() => {
      formData.groupBy == "" ? setTypes([]) : setTypes([...new Set(data.map((row) => row[formData.groupBy]))]);
    },[formData])


    React.useEffect(() => {
        setTypeOptions([...new Set(headers)])
        setNumericOptions([...new Set(headers.filter(header => typeof data[0][header] == "number"))])
    },[])

    return(
        <div class="p-5 container">

        <div class="row text-center">
          <div class="row">
            <h2>
              Box Plot for <u><i>{filename}</i></u>
            </h2>
          </div>
        </div>

        <div class="d-flex justify-content-between w-75 mb-4">
          <AttributeOptions handleChange={handleChange} value={formData.groupBy} name="groupBy" options={typeOptions} text="Chose attributes to Group by"/>
        </div>


        <div class="d-flex justify-content-between w-75 mb-4">
          {types.map(type => <div><input checked={checkBoxes[type]} name={type} onChange={handleCheckBoxChange} type="checkbox"/>&nbsp; {type}</div>)}
        </div>


        {radarPlot && <Plot data={radarPlot} layout={
          {
            width:1300, 
            height:500, 
            boxmode:'group', 
            polar: {
              radialaxis: {
                visible: true,
                range: [0, Math.max(...([].concat(...[...data.map(obj => [...Object.values(obj).filter(val => typeof val === 'number')])])))]
              }
            }
          }
        }/>}

      </div>

    
    )

}
