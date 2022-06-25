import React from "react";
import * as XLSX from "xlsx"
import {Button, TextField} from "@mui/material"
import axios from "axios"
import ScatterPlot from "./IrisData/ScatterPlot";
import { useHistory } from "react-router-dom";

export default function Home(props){


    const {file, handleChange} = props
    const [graph, setGraph] = React.useState("")

    let history = useHistory()

    // console.log(graph == );

    const handleClick = () => {
      history.push(`/${graph}`)
    }

    return(
      <div className="p-5 container" >
        <div class="row text-center">
          <div class="row">
              <h2>Home</h2>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Button className="w-15" variant='contained' component='label'>Chose file
            <input className="form-control primary" type="file" accept=".csv,.xlsx" id="formFile" hidden onChange={(e) => handleChange(e)}/>
          </Button>
          <input 
            class="form-control w-25"  
            value={file ? file.name : "No File Chosen"} />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <select
              class="form-select w-25"
              value={graph}
              onChange={(e) => {setGraph(e.target.value)}}
            >
              <option value="">Select Graph Type</option>
              <option value="scatter-plot">Scatter Plot</option>

          </select>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Button className="w-15" variant='contained' component='label' onClick={handleClick}>Submit</Button>
        </div>

      </div>
    )
}