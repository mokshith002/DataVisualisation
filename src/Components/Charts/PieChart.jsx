import React, {useState, useEffect} from "react";
import AttributeOptions, {generateRandomColor} from "./Miscellaneous";
import Plot from 'react-plotly.js';


export default function RadarPlot(props){

    const {data, headers, filename} = props;

    const [types, setTypes] = React.useState([])
    const [pieChart, setPieChart] = React.useState()
    const [numericOptions, setNumericOptions] = React.useState([])
    const [typeOptions, setTypeOptions] = React.useState([])
    const [formData, setFormData] = React.useState({
        groupBy: "",
        type: "",
    })
    

    
    
    
    const generatePieChart = () => {
        
        if(types.length === 0) return;
        
        const filteredOptions = numericOptions.filter(heading => heading != formData.groupBy);  

        
        const plot = [{
            labels: filteredOptions,
            values: filteredOptions.map(op => data.filter(row => row[formData.groupBy] == formData.type)[0][op]),
            type: 'pie'
        }]
        
   

      console.log(plot);

      setPieChart(plot);        
      
    }



    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((oldData) => ({
            ...oldData,
            [name]: value
        }))
    }



    React.useEffect(() => {
      generatePieChart();
    },[formData.type])

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
              Pie Chart for <u><i>{filename}</i></u>
            </h2>
          </div>
        </div>

        <div class="d-flex justify-content-between w-75 mb-4">
          <AttributeOptions handleChange={handleChange} value={formData.groupBy} name="groupBy" options={typeOptions} text="Chose attributes to Group by"/>
          <AttributeOptions handleChange={handleChange} value={formData.type} name="type" options={types} text={`Chose ${formData.groupBy}`}/>
        </div>

        {pieChart && < Plot data={pieChart} layout={{ width:1300,  height:500}} />}

      </div>

    
    )

}
