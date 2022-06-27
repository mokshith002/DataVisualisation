import React, { PureComponent, useEffect, useState } from "react";
import AttributeOptions, {generateRandomColor}from "./Miscellaneous";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export default function LineCharts(props) {

    const { data, headers, filename } = props;

    const [axesOptions, setAxesOptions] = React.useState([]);
    const [numericOptions, setNumericOptions] = React.useState([]);
    const [formData, setFormData] = React.useState({xAxis: "", yAxis: ""});


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((oldData) => ({ ...oldData, [name]: value }));
    }

    const handleCheckBoxChange = (e) => {
      const {name} = e.target
      setFormData(prev => ({
        ...prev,
        [name]: !prev[name]
      }))
    }

    useEffect(() => {
      let obj = {}
      numericOptions.forEach(option => obj = {...obj, option: false})
      setFormData(prev => ({...prev, ...obj}))
    },[numericOptions])

    React.useEffect(() => {
      setAxesOptions([...new Set(headers)]);
      setNumericOptions([...new Set(headers)].filter(header => typeof data[0][header] == "number"));
    }, []);
    
    
    return (
        <div className="p-5 container">


        <div class="row text-center">
          <div class="row">
            <h2>
              Line Chart for{" "}
              <u>
                <i>{filename}</i>
              </u>
            </h2>
          </div>
        </div>

        <div class="d-flex justify-content-between w-75 mb-4">
          <AttributeOptions handleChange={handleChange} value={formData.xAxis} name="xAxis" options={axesOptions} text="Chose X axis"/>
        </div>

        <div class="d-flex justify-content-between w-75 mb-4">
          <label class="form-label">Chose Y axis</label>
          {numericOptions.map(numericOption => <div><input checked={formData[numericOption]} name={numericOption} onChange={handleCheckBoxChange} type="checkbox"/>&nbsp; {numericOption}</div>)}
        </div>

        <ResponsiveContainer width="90%" height={600}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={formData.xAxis}/>
            <YAxis tickCount={10}/>
            <Tooltip />
            <Legend />
            {/* <Line type="monotone" dataKey={formData.yAxis} stroke="#1421a8" activeDot={{r : 8}}/> */}
            {
              numericOptions.filter(option => formData[option]).map(dataKey => <Line type="monotone" dataKey={dataKey} stroke={generateRandomColor()} activeDot={{r:8}}/>)
            }
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}
