import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Quiz from './pages/quiz';

function App() {
  return (
    <div className="App">
      <Router>        
        <Switch>
          <Route exact path="/"> <Home/> </Route>
          <Route path="/quiz/:id" component={Quiz} />
        </Switch>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <React.Fragment>
      Grove Street, Home. At least it was before I fucked everything up.
    </React.Fragment>
  );
}

export default App;
