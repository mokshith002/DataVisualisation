import React from "react";
import HistoryTable from "./Table";

export default function HistoryPage(props) {
    

    const data = []
    
    for(let i = 1; i <= 10; i++){
        data.push({
            vid: i,
            userid: i+4,
            filename: `File_${i}.csv`,
            time: 'currentTime'
        })
    }

  return (
    <div className="p-5 container">
      <HistoryTable data={data}/>
    </div>
  );
}
