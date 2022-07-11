import React, {useState, useEffect} from "react";
import AttributeOptions, {generateRandomColor} from "./Miscellaneous";
import Plot from 'react-plotly.js';


export default function BarGraph(props){

    const {data, headers, filename} = props;

    const [types, setTypes] = React.useState([])
    const [barGraph, setBarGraph] = React.useState()
    const [numericOptions, setNumericOptions] = React.useState([])
    const [typeOptions, setTypeOptions] = React.useState([])
    const [formData, setFormData] = React.useState({
        groupBy: "",
    })
    const [checkBoxes, setCheckBoxes] = useState({})


    
    const generateBarGraph = () => {

        const filteredOptions = numericOptions.filter(lab => lab != formData.groupBy && checkBoxes[lab]);
        console.log(checkBoxes);
        console.log(filteredOptions);
        
        const plot = filteredOptions.map(col => ({

            x: types,
            y: data.map(row => row[col]),
            type: 'bar',
            name: col,
            // marker: {
            //     color: generateRandomColor(),
            //     opacity: 0.5
            // }
            
        }))

        console.log(plot);

        setBarGraph(plot);        

    }

    const generateCheckBoxes = () => {
      let obj = {}
      numericOptions.filter(lab => lab != formData.groupBy).forEach(op => obj = {...obj, [op]: true})
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
      generateBarGraph();
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
              Bar Graph for <u><i>{filename}</i></u>
            </h2>
          </div>
        </div>

        <div class="d-flex justify-content-between w-75 mb-4">
          <AttributeOptions handleChange={handleChange} value={formData.groupBy} name="groupBy" options={typeOptions} text="Chose attributes to Group by"/>
        </div>


        <div class="d-flex justify-content-between w-75 mb-4">
          {numericOptions.filter(lab => lab != formData.groupBy).map(type => <div><input checked={checkBoxes[type]} name={type} onChange={handleCheckBoxChange} type="checkbox"/>&nbsp; {type}</div>)}
        </div>


        {barGraph && <Plot data={barGraph} layout={{ width:1300, height:500, barmode: 'group'}}/>}

      </div>

    
    )

}