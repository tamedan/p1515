import React from "react";
import { render } from "react-dom";
import Layout from "./Layout";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <h2>15 {"\u2728"}</h2>
    <Layout />
  </div>
);

render(<App />, document.getElementById("root"));
