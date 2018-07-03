import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  render() {
    return (
      <div style={styles}>
        <h2>15 {"\u2728"}</h2>
        <Layout />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
