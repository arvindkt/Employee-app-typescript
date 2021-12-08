import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

const App = () => (
  <Router>
    <RouterPage path="/" pageComponent={<Login />} />
    <RouterPage path="/signup" pageComponent={<Signup />} />
    <RouterPage path="/home" pageComponent={<Home />} />
  </Router>
);


const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;

export default App;