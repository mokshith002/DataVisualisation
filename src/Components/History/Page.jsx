import React from "react";
import HistoryTable from "./Table";

export default function HistoryPage(props) {
    

    const data = [
      { vid: 20, user_id: 1, filename: `Iris.csv`, time: "2022-07-12 15:46:25.806491" },
    ];
    
    for(let i = 2; i <= 10; i++){
        data.push({
            vid: i,
            user_id: i+4,
            filename: `File_${i}.csv`,
            time: 'currentTime'
        })
    }

    //TODO retrieve files from database

  return (
    <div className="p-5 container">
      <HistoryTable data={data} passData={props.passData}/>
    </div>
  );
}
