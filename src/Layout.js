import React, { Component } from "react";
import autoBind from "react-autobind";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  componentWillMount() {
    let plane = [];
    let num = 1;
    for (let i = 0; i < 4; i++) {
      if (!plane[i]) {
        plane[i] = [];
      }
      for (let ind = 0; ind < 4; ind++) {
        if (!plane[i][ind]) {
          plane[i][ind] = [];
        }
        plane[i][ind] = num;
        if (num === 16) {
          plane[i][ind] = null;
          break;
        }
        num++;
      }
    }

    this.setState({
      plane
    });
  }
  renderLayout() {
    let plane = this.state.plane;
    let row = [];
    for (let r in plane) {
      for (let c in plane[r]) {
        row.push(`<div class='col-md-3 " + plane[r][c] + "'></div>`);
      }
    }
    return row;
  }
  clickElement(e) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ element: ", e.target.value);
    let plane = this.state.plane;
    let position;
    for (let i = 0; i < 4; i++) {
      if (0 <= plane[i].indexOf(Number(e.target.value))) {
        console.log("строка: ", i);
        console.log("в строке: ", plane[i].indexOf(Number(e.target.value)));
        position = plane[i][plane[i].indexOf(Number(e.target.value))];
      }
    }
    this.checkNull(position);
  }
  checkNull(position) {
    console.log("position: ", position);
  }

  initNumber() {
    let randNumber = Math.random() * 2;
    randNumber = Math.floor(randNumber);
    if (randNumber === 0) {
      randNumber = 2;
    } else if (randNumber === 1) {
      randNumber = 4;
    }
    return randNumber;
  }
  initRC() {
    let position = [];
    let randRow = 0 + Math.random() * 4;
    let randCol = 0 + Math.random() * 4;
    randRow = Math.floor(randRow);
    randCol = Math.floor(randCol);
    position[0] = randRow;
    position[1] = randCol;

    return position;
  }

  initPlane(plane) {
    let inn = 0;
    for (let i = 0; i < 4; i++) {
      plane[i].indexOf(null);
      console.log(
        "@@@@@@@@@@@@ plane[i].indexOf(null)",
        plane[i].indexOf(null)
      );
      if (plane[i].indexOf(null) < 0) {
        inn++;
        if (4 <= inn) {
          alert("!!!!!!!!!!!!!");
          return;
        }
      }
    }
    let randNumber = this.initNumber();
    let position = this.initRC();
    if (plane[position[0]][position[1]] !== null) {
      while (plane[position[0]][position[1]] !== null) {
        position = this.initRC();
      }
    }
    if (plane[position[0]][position[1]] === null) {
      plane[position[0]][position[1]] = randNumber;
      this.setState({
        plane
      });
    }
  }

  render() {
    let plane = this.state.plane;
    console.log("@plane: ", plane);
    let position = this.state.position;
    let clickElement = this.clickElement;

    return (
      <div className="layout">
        <div className="container">
          <div className="row row_l">
            {plane.map(function(obj, i) {
              return (
                <div className={"layout_row row_" + i}>
                  {obj.map(function(cell, index) {
                    return (
                      <input
                        className={"col col_" + index + " s_" + cell}
                        ref={"col_" + index}
                        value={cell}
                        // disabled
                        onClick={clickElement}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            this.initPlane(plane);
          }}
        >
          start
        </button>
      </div>
    );
  }
}
