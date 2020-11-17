import React, { useState } from "react";
import axios from "axios";
import Inputbar from "./components/Inputbar";
import Todos from "./components/todos";
import Users from "./components/users";
import Debug from "./components/debug";
import Photos from "./components/photos";
import Posts from "./components/posts";
import Albums from "./components/albums";

const App = () => {
  const [data, setData] = useState();
  const [route, setRoute] = useState("");

  const getData = async (route) => {
    if (route.length > 2 && route.includes("*")) { //debug
      const newRoute = route.includes("*") ? route.split("*")[1] : route;
      const url = `http://jsonplaceholder.typicode.com/${newRoute}`;
      const resp = await axios.get(`${url}`);
      setData(resp.data);
      setRoute(route);
    } else if (route){

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
        if (route.includes("*")) {
          return <Debug data={data} />;
        } else {
          return "no data fetched";
        }
    }

  }

  return (
    <div>
      <Inputbar getData={(route) => getData(route.trim())} />
      {selectOutputComponent()}
    </div>
  )
};

export default App;