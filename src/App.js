import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div className="main">
          <Navbar/>
          <div className="App">
              <Switch>
                <Route exact path="/" component={Signup} />
                <Route exact path="/signin" component={Signin} />
              </Switch>
            </div>
            </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
