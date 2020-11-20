import React, { useState } from "react";
import axios from "axios";
import Account from "./Account";
import Balance from "./Balance";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import Transfer from "./Transfer";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Inputlogin from "./Inputlogin";

function App() {
  const [data, setData] = useState(null);
  //const [route, setRoute] = useState("");

  const getData = async (route) => {
    if (route) {
      const url = `http://localhost:5000/bank/${route}/`;

      const resp = await axios.get(`${url}`);
      if (resp) {
        setData(resp.data);
      } else {
        setData(null);
      }
    } else {
      setData(null);
    }
  }

  const showLogin = () => {
    if (data) {
      return (
        <div>
          <h6>{data.name} has now logged in.</h6>
          <button onClick={() => setData(null)}>Logout</button>
        </div>
      );

    } else {
      return (
        <div>
          <h6>Login to bank using your bank ID:</h6>
          <h6><Inputlogin getData={(route) => getData(route)} /></h6>
        </div>
      );
    }
  }

  const showName = () => {
    if (data) {
      return (
        <div className="login">
          {data.id}:&nbsp;{data.name}&nbsp;({data.balance}€)&nbsp;&nbsp;
          <button onClick={() => setData(null)}>x</button>
        </div>

      );
    }
  }

  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Router>
        {showName()}
        <header className="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
          <div className="mdl-layout--large-screen-only mdl-layout__header-row">
            <h3>Roskapankki ™</h3>
          </div>
          <div className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark">
            <Link to="/" className="mdl-layout__tab"> Home </Link>
            <Link to="/account" className="mdl-layout__tab"> Account </Link>
            <Link to="/balance" className="mdl-layout__tab"> Balance </Link>
            <Link to="/withdraw" className="mdl-layout__tab"> Withdraw </Link>
            <Link to="/deposit" className="mdl-layout__tab"> Deposit </Link>
            <Link to="/transfer" className="mdl-layout__tab"> Transfer Funds </Link>
          </div>
        </header>
        <Switch>
          <Route exact path="/" render={() => (
            <div className="mdl-layout__tab-panel">
              <section className="section--center mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--0-col">
                  <h4>Welcome to Roskapankki.</h4>
                  {showLogin()}
                </div>
              </section>
            </div>
          )} />
          <Route exact path="/account" render={() => <Account getData={data}
            setData={(route) => setData(route)} />} />
          <Route exact path="/balance" render={() => <Balance getData={data} />} />
          <Route exact path="/withdraw" render={() =>
            <Withdraw getData={data} setData={(route) => setData(route)} />} />

          <Route exact path="/deposit" render={() =>
            <Deposit getData={data} setData={(route) => setData(route)} />} />

          <Route exact path="/transfer" render={() =>
            <Transfer getData={data} setData={(route) => setData(route)} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
