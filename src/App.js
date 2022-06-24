import * as XLSX from "xlsx"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  console.log("Hello");

  return (
    <div>
      <Router>
        <Switch>
          <Route exactPath='/'><Home /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
