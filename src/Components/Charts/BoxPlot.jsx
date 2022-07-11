import React, {useState, useEffect} from "react";
import AttributeOptions, {generateRandomColor} from "./Miscellaneous";
import Plot from 'react-plotly.js';


export default function BoxPlot(props){

    const {data, headers, filename} = props;

    const [types, setTypes] = React.useState([])
    const [boxPlot, setBoxPlot] = React.useState()
    const [numericOptions, setNumericOptions] = React.useState([])
    const [typeOptions, setTypeOptions] = React.useState([])
    const [formData, setFormData] = React.useState({
        groupBy: "",
        xAxis: headers[0],
    })
    const [checkBoxes, setCheckBoxes] = useState({})


    
    const generateBoxPlot = () => {

        
        const plot = [{
            x: data.filter(ele => checkBoxes[ele[formData.groupBy]]).map(ele => ele[formData.groupBy]),
            y: data.filter(ele => checkBoxes[ele[formData.groupBy]]).map(ele => ele[formData.xAxis]),
            type: 'box',
            marker: {color: "#23c233"}
        }]

        console.log(plot);

        setBoxPlot(plot);        

        setBoxPlot(plot);        
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
      generateBoxPlot();
    },[checkBoxes])

    React.useEffect(() => {
      formData.groupBy == "" ? setTypes([]) : setTypes([...new Set(data.map((row) => row[formData.groupBy]))]);
    },[formData])


    React.useEffect(() => {
        setTypeOptions([...new Set(headers.filter(header => typeof data[0][header] == "string"))])
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
          <AttributeOptions handleChange={handleChange} value={formData.xAxis} name="xAxis" options={numericOptions} text="Chose X axis"/>
        </div>


        <div class="d-flex justify-content-between w-75 mb-4">
          {types.map(type => <div><input checked={checkBoxes[type]} name={type} onChange={handleCheckBoxChange} type="checkbox"/>&nbsp; {type}</div>)}
        </div>


        {boxPlot && <Plot data={boxPlot} layout={{width:1300, height:500, boxmode:'group'}}/>}

      </div>

    
    )

}
