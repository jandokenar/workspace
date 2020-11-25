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
  const apiUrl = "http://localhost:5000/bank/";
  const [data, setUserData] = useState(null);
  const [login, setlogin] = useState(true);

  const getUserData = async (route) => {
    if (route) {
      const url = `${apiUrl}${route}/`;
      try {
        const resp = await axios.get(`${url}`).catch(err => {
          if (err.response.status === 404) {
            setlogin(false);
          }
          throw err;
        }
        );
        if (resp) {
          setUserData(resp.data);
          setlogin(true);
        } else {
          setUserData(null);
          setlogin(false);
        }
      }
      catch (err) {
        setlogin(false);
      }

    } else {
      setUserData(null);
      setlogin(false);
    }
  }
  const showError = () => {
    if (!login) {
      return (`User not found.`);
    }
  }
  const showLogin = () => {
    if (data) {
      return (
        <div>
          <ul className="toc">
            <div>
              <h6>{data.name} has now logged in.</h6>
              <button onClick={() => setUserData(null)}>Logout</button>
            </div>
          </ul>
        </div>
      );

    } else {
      return (
        <div>
          <ul className="toc">
            <h6>Login:</h6>
            <Inputlogin getUserData={(route) => getUserData(route)} />
            {showError()}
          </ul>
        </div>
      );
    }
  }

  const showName = () => {
    if (data) {
      return (
        <div className="login">
          {data.id}:&nbsp;{data.name}&nbsp;({data.balance}€)&nbsp;&nbsp;
          <button onClick={() => setUserData(null)}>x</button>
        </div>
      );
    }
  }

  const showNavi = () => {
    if (data) {
      return (
        <div>
          <Link to="/" className="mdl-layout__tab"> Home </Link>
          <Link to="/account" className="mdl-layout__tab"> Account </Link>
          <Link to="/balance" className="mdl-layout__tab"> Balance </Link>
          <Link to="/withdraw" className="mdl-layout__tab"> Withdraw </Link>
          <Link to="/deposit" className="mdl-layout__tab"> Deposit </Link>
          <Link to="/transfer" className="mdl-layout__tab"> Transfers </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/" className="mdl-layout__tab"> Login </Link>
          <Link to="/account" className="mdl-layout__tab"> Create Account </Link>
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
            {showNavi()}
          </div>
        </header>
        <Switch>
          <Route exact path="/" render={() => (
            <div className="mdl-layout__tab-panel">
              <section className="section--center mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--0-col">
                  <h4>&nbsp;&nbsp;Home</h4>
                  {showLogin()}
                </div>
              </section>
            </div>
          )} />
          <Route exact path="/account" render={() => <Account getUserData={data}
            setUserData={(route) => setUserData(route)} />} />
          <Route exact path="/balance" render={() => <Balance getUserData={data} />} />
          <Route exact path="/withdraw" render={() =>
            <Withdraw getUserData={data} setUserData={(route) => setUserData(route)} />} />

          <Route exact path="/deposit" render={() =>
            <Deposit getUserData={data} setUserData={(route) => setUserData(route)} />} />

          <Route exact path="/transfer" render={() =>
            <Transfer getUserData={data} setUserData={(route) => setUserData(route)} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
