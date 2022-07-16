import React from "react";
import HistoryTable from "./Table";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function HistoryPage(props) {
    

    const user_id = localStorage.getItem('user_id');

    const URL = "http://127.0.0.1:5000";

    const history = useHistory()

    if(!user_id){
       history.push('/login')
    }

    const [data, setData] = React.useState();

    const getData = async () => {

      const res = await axios.get(`${URL}/api/upload?user_id=${user_id}`);

      console.log(eval(res.data));
      setData(eval(res.data))
    }

    React.useState(() => {
      getData()
    },[])

    //TODO retrieve files from database

  return (
    <div className="p-5 container">
      {data && <HistoryTable data={data} passData={props.passData}/>}
    </div>
  );
}
