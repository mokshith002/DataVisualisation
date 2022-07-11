import React, { PureComponent, useEffect, useState } from "react";
import AttributeOptions, {generateRandomColor}from "./Miscellaneous";
import Chart from "react-apexcharts";

export default function CandleStick(props) {

    const { data, headers, filename } = props;

    const [axesOptions, setAxesOptions] = React.useState([]);
    const [numericOptions, setNumericOptions] = React.useState([]);
    const [formData, setFormData] = React.useState({xAxis: "", yAxis: ""});
    const [candlestick, setCandelstick] = useState();


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((oldData) => ({ ...oldData, [name]: value }));
    }


    const getCandlesticks = () => {
        const sticks = {
            series: [{
                data: data.map(row => {
                    // console.log(row);
                    return({
                        x: row[formData.xAxis],
                        y: numericOptions.filter(op => op != formData.xAxis).map(op => row[op])
                    })
                })
              }],
              options: {
                chart: {
                  type: 'candlestick',
                  height: 350
                },
                title: {
                  text: 'CandleStick Chart',
                  align: 'left'
                },
                xaxis: {
                  type: 'datetime'
                },
                yaxis: {
                  tooltip: {
                    enabled: true
                  }
                }
              },
        }

        console.log(sticks);

        setCandelstick(sticks);
    }

    useEffect(() => {
        getCandlesticks()
    },[formData])

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
        console.log(data);
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

        
        {candlestick && <Chart options={candlestick.options} series={candlestick.series} type='candlestick' height={350}/>}
        
      </div>
    );
}


