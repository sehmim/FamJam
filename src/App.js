import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OnboardingPage from './pages/Onboarding';
import CreateRoom from './routes/CreateRoom';
import Room from './routes/Room';



function App() {
  return (

    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={OnboardingPage} />
        <Route path="/room" component={CreateRoom} />
        <Route path="/room/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
