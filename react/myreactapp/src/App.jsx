import React, { useState, useEffect } from "react";
import axios from "axios";
import Inputbar from "./components/Inputbar";
import Todos from "./components/todos";
import Users from "./components/users";
import Debug from "./components/debug";
import Photos from "./components/photos";
import Posts from "./components/posts";
import Albums from "./components/albums";
import "./components/component.css";

const App = () => {
  const [data, setData] = useState();
  const [route, setRoute] = useState("");

  const getData = async (route) => {
    if (route.length > 2 && route.startsWith("*")) { //debug commands are run uusing * wildcard
      const newRoute = route.includes("*") ? route.split("*")[1] : route;
      const url = `http://jsonplaceholder.typicode.com/${newRoute}`;
      const resp = await axios.get(`${url}`);
      setData(resp.data);
      setRoute(route);
    } else if (route) {

      const url = `http://jsonplaceholder.typicode.com/${route}`;
      const resp = await axios.get(`${url}`);
      setData(resp.data);
      const newRoute = route.includes("/") ? route.split("/")[0] : route;
      setRoute(newRoute);
    }
  }

  const selectOutputComponent = () => {
    switch (route) {
      case "todos":
        return <Todos data={data} />;
      case "users":
        return <Users data={data} />;
      case "photos":
        return <Photos data={data} />;
      case "posts":
        return <Posts data={data} />;
      case "albums":
        return <Albums data={data} />;
      default:
        if (route.startsWith("*")) {
          return <Debug data={data} />;
        } else {
          return "no data fetched";
        }
    }

  }


  function Clock(props) {
    const [date, setDate] = useState(new Date());

   useEffect(() => {
    var timerID = setInterval( () => tick(), 1000 );
  
    return function cleanup() {
        clearInterval(timerID);
      };
   });
  
     function tick() {
      setDate(new Date());
     }
  
     return (
        <div className="mdc-button__ripple">
          <h2>{date.toLocaleTimeString()}</h2>
        </div>
      );
  }

  return (
    <div>
     <Clock></Clock>
      <Inputbar getData={(route) => getData(route.trim())} />
      {selectOutputComponent()}
    </div>
  )
};

export default App;
