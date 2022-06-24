import React from "react";
import * as XLSX from "xlsx"
import {Button, TextField} from "@mui/material"

export default function Home(){

    const [file, setFile] = React.useState(null)

    const handleChange = (e) => {
      setFile(e.target.files[0])
    };

    const parseData = async () => {
      const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(jsonData);
    }

    React.useEffect(() => {
      if(file){
        parseData();
      }
    }, [file])

    console.log("Home");

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
      </div>
    )
}