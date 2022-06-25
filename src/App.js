import * as XLSX from "xlsx"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './Components/Home';
import ScatterPlot from "./Components/IrisData/ScatterPlot"

import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";


function App() {

  const [file, setFile] = useState();
  const [data, setData] = useState(null)
  const [headers, setHeaders] = React.useState([])

  useEffect(() => {}, [file])

  useEffect(() => {
    if(file != null)
      parseData()
  },[file])

  const parseData = async () => {
      const _data = await file.arrayBuffer();
        const workbook = XLSX.read(_data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        setData(XLSX.utils.sheet_to_json(worksheet));

        const headings = XLSX.utils.sheet_to_csv(worksheet).toString().split('\n')[0].split(',');
        
        setHeaders(headings)
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
          {file != null && <Route path='/scatter-plot'><ScatterPlot filename={file.name} data={data} headers={headers}  /></Route>}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
