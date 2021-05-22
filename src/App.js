import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import styles from './App.module.css';
import Marker from './views/marker/marker';
import Babylon from './views/babylon/babylon';


function App() {

  return (
    <Router>
      <div className={styles['container']}>
        <Switch>
          <Route exact path="/">
            <Marker />
          </Route>
          <Route path="/babylonjs">
            <Babylon />
          </Route>
          <Route exact path="/map">
            <Marker />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
