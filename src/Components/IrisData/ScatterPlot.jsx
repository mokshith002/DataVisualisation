import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,} from "recharts";
import AttributeOptions from "./AttributeOptions";


export default function LineChart(props){

    const {data, headers, filename} = props;

    const [types, setTypes] = React.useState([])
    const [scatterPlots, setScatterPlots] = React.useState()
    const [numericOptions, setNumericOptions] = React.useState([])
    const [typeOptions, setTypeOptions] = React.useState([])
    const [formData, setFormData] = React.useState({
        groupBy: "",
        xAxis: "",
        yAxis: ""
    })


    function generateRandomColor() {
      let maxVal = 0xffffff; // 16777215
      let randomNumber = Math.random() * maxVal;
      randomNumber = Math.floor(randomNumber);
      randomNumber = randomNumber.toString(16);
      let randColor = randomNumber.padStart(6, 0);
      return `#${randColor.toUpperCase()}`;
    }


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

        setScatterPlots(() => formattedData.map((arr) => { 
            return <Scatter
                name={arr[0][formData.groupBy]}
                data={arr}
                fill={generateRandomColor()}
            />
        }))
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((oldData) => ({
            ...oldData,
            [name]: value
        }))
    }

    React.useEffect(() => {        
        generateScatterComponents()
    },[types])

    React.useEffect(() => {
      formData.groupBy == "" ? setTypes([]) : setTypes([...new Set(data.map((row) => row[formData.groupBy]))]);
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

        <ResponsiveContainer width="80%" height={600}>
          <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20,}} >
          <CartesianGrid />
            <XAxis type="number" dataKey={formData.xAxis} name={formData.xAxis} unit="cm" domain={["auto", "auto"]} tickCount="10"/>
            <YAxis type="number" dataKey={formData.yAxis} name={formData.yAxis} unit="cm" domain={["auto", "auto"]} tickCount="10"/>
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            {scatterPlots}
          </ScatterChart>
        </ResponsiveContainer>

      </div>
    );
}
