import React, {useState, useEffect} from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Button} from "@mui/material";
import axios from "axios"
import { useHistory } from "react-router-dom";


export default function Table(props){

  const {data, passData} = props;

  const URL = "http://127.0.0.1:5000";

  const history = useHistory()

  const onFileSelect = async (params) => {
    
    const {user_id, time, filename} = params.row

    const req = { user_id, time};

    console.log(req);
    
    const res = await axios.get(`${URL}/api/upload`, {params : req});

    passData(res.data, filename)

    console.log(params);
    history.push('/')

  }

  const columns = React.useMemo(() => [
    { field: "filename", headerName: "File Name", type: "string", headerAlign: "center", align: "center", flex: 2,},
    { field: "time", headerName: "Time Uploaded", type: "string", headerAlign: "center", align: "center", flex: 2},
    {
      field: "del",
      headerName: "Select",
      headerAlign: "center",
      align: "center",
      type: "actions",
      flex: 1,
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Button className="w-15" variant='contained' component='label'>Select</Button>}
          label="Select"
          onClick={() => { onFileSelect(params)}}
        />,
      ],
    },
  ]);
  
   return (
     <div >
       <div className="row text-center">
         <h2 className="mb-2">All Employees</h2>
       </div>
       <div class="text-center d-flex justify-content-center mt-4" style={{ marginTop: 20 }}>
         <a href="/" type="button" class="btn btn-primary mb-5" style={{width:120}}>
           Upload File
         </a>
       </div>
       <div className="d-flex justify-content-center mt-4" style={{ height: 550, width: "80%", margin: "auto" }}>
         <DataGrid columns={columns} rows={data} getRowId={(row) => row.vid} />
       </div>
     </div>
   );


}
