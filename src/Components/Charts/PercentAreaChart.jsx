import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import React, {useEffect, useState} from 'react'
import AttributeOptions, {generateRandomColor} from './Miscellaneous';


export default function PercentAreaChart(props){
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
      numericOptions.forEach(option => obj = {...obj, [option]: false})
      setFormData(prev => ({...prev, ...obj}))
    },[numericOptions])

    useEffect(() => {
      setAxesOptions([...new Set(headers)]);
      setNumericOptions([...new Set(headers)]
          .filter(header => 
            typeof data[0][header] == "number"
          )
        );
    }, []);
    
    const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

    const getPercent = (value, total) => {
        const ratio = total > 0 ? value / total : 0;
        return toPercent(ratio, 2);
    };

    const renderTooltipContent = (o) => {
        const { payload = [], label } = o;
        const total = payload.reduce(
            (result, entry) => result + entry.value,
            0
        );

        return (
            <div className="customized-tooltip-content">
                <p className="total">{`${label} (Total: ${total})`}</p>
                <ul className="list">
                    {payload.map((entry, index) => (
                    <li key={`item-${index}`} style={{ color: entry.color }}>
                        {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                    </li>
                    ))}
                </ul>
            </div>
        );
    };
    
    return (
        <div className="p-5 container">


        <div class="row text-center">
          <div class="row">
            <h2>
              Percent Chart for{" "}
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
          {

            numericOptions.map(numericOption => 
              <div>
                <input 
                  checked={formData[numericOption]} 
                  name={numericOption} 
                  onChange={handleCheckBoxChange} 
                  type="checkbox"
                /> 
                &nbsp; {numericOption}
              </div>)

          }
        </div>

        <ResponsiveContainer width="90%" height={600}>
            <AreaChart
            width={500}
            height={400}
            data={data}
            stackOffset="expand"
            margin={{
                top: 10,
                right: 30,
                left: 40,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={formData.xAxis}/>
            <YAxis tickFormatter={toPercent}/>
            <Tooltip content={renderTooltipContent}/>
            <Legend />
            {

              numericOptions.filter(option => 
                formData[option]).map(dataKey => {
                    const col = generateRandomColor();
                    return (
                        <Area
                            type="monotone" 
                            dataKey={dataKey} 
                            stroke={col}
                            fill={col}
                            stackId='1'
                        />
                    )
                })

            }
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
}