import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router";
import { Link, BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div style={styles}>
          <h2>15 {"\u2728"}</h2>
          <Link type={"button"} to={"/layout"}>
            Layout
          </Link>
          &nbsp;||&nbsp;
          <Link type={"button"} to={"/testLayout2"}>
            testLayout2
          </Link>
          <Layout />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
