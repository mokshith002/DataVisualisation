import * as XLSX from "xlsx"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './Components/Home';
import ScatterPlot from "./Components/Charts/ScatterPlot"

import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import LineCharts from "./Components/Charts/LineChart";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import BoxPlot from "./Components/Charts/BoxPlot";
import BeanPlot from "./Components/Charts/BeanPlot";
import CandleStick from "./Components/Charts/CandleStick";
import StackedAreaChart from "./Components/Charts/StackedAreaChart";
import PercentAreaChart from "./Components/Charts/PercentAreaChart";
import PieChart from "./Components/Charts/PieChart"
import RadarChart from "./Components/Charts/RadarChart";
import BarGraph from "./Components/Charts/BarGraph";
import HistoryPage from "./Components/History/Page";


function App() {

  const [file, setFile] = useState();
  const [data, setData] = useState(null)
  const [headers, setHeaders] = React.useState([])
  const [isPrev, setIsPrev] = React.useState(false)

  useEffect(() => {}, [file])

  useEffect(() => {
    if(file != null && !file.flag)
      parseData()
  },[file])

  const parseData = async () => {
      const _data = await file.arrayBuffer();
        const workbook = XLSX.read(_data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        setData(XLSX.utils.sheet_to_json(worksheet));

        const headings = XLSX.utils
          .sheet_to_csv(worksheet)
          .toString()
          .split('\n')[0]
          .split(',');
        
        setHeaders(headings)
  }

  const parseHistory = (content, filename) => {

    const rows = content.split('\r\n')
    const headings = rows[0].split(',');

    setHeaders(headings)

    const _data = [];

    for(let i = 1; i < rows.length; i++){
      const obj = {}
      const row = rows[i].split(',')
      for(let j = 0; j < row.length; j++){
        obj[headings[j]] = parseFloat(row[j]) ? parseFloat(row[j]) : row[j]
      }
      _data.push(obj);
    }

    console.log(_data);

    setData(_data)

    setFile(({name: filename, flag: true}))

  }

  const handleChange = (e) => {
    // localStorage.setItem('file', e.target.files[0])
      setFile(e.target.files[0])
  };

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'><Home handleChange={handleChange} file={file}/></Route>
          <Route exact path='/login'><Login /></Route>
          <Route exact path='/register'><Register/></Route>
          <Route exact path='/history'><HistoryPage passData={parseHistory}/></Route>
          {file != null && 
            <Route path='/scatter-plot'>
              <ScatterPlot 
                filename={file.name} 
                data={data} 
                headers={headers}  
              />
            </Route>
          }
          {file != null && 
            <Route path='/box-plot'>
              <BoxPlot
                filename={file.name} 
                data={data} 
                headers={headers}  
              />
            </Route>
          }
          {file != null && 
            <Route path='/radar-chart'>
              <RadarChart
                filename={file.name} 
                data={data} 
                headers={headers}  
              />
            </Route>
          }
          {file != null && 
            <Route path='/pie-chart'>
              <PieChart
                filename={file.name} 
                data={data} 
                headers={headers}  
              />
            </Route>
          }
          {file != null && 
            <Route path='/bean-plot'>
              <BeanPlot
                filename={file.name} 
                data={data} 
                headers={headers}  
              />
            </Route>
          }
          {file != null && 
            <Route path='/line-chart'>
              <LineCharts 
                filename={file.name} 
                data={data} 
                headers={headers}  
              />
            </Route>
          }
          {file != null && 
            <Route path='/stacked-area-chart'>
              <StackedAreaChart 
                filename={file.name} 
                data={data} 
                headers={headers}  
              />
            </Route>
          }
          {file != null && 
            <Route path='/percent-area-chart'>
              <PercentAreaChart 
                filename={file.name} 
                data={data} 
                headers={headers}  
              />
            </Route>
          }
          {file != null && 
            <Route path='/candlestick'>
              <CandleStick 
                filename={file.name} 
                data={data} 
                headers={headers}  
              />
            </Route>
          }
          {file != null && 
            <Route path='/bar-graph'>
              <BarGraph 
                filename={file.name} 
                data={data} 
                headers={headers}  
              />
            </Route>
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
