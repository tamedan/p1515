import React, { Component } from "react";
import autoBind from "react-autobind";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
    Array.prototype.shuffle = function(b) {
      var i = this.length,
        j,
        t;
      while (i) {
        j = Math.floor(i-- * Math.random());
        t =
          b && typeof this[i].shuffle !== "undefined"
            ? this[i].shuffle()
            : this[i];
        this[i] = this[j];
        this[j] = t;
      }
      return this;
    };
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
          plane[i][ind] = 0;
          break;
        }
        num++;
      }
    }
    let defaultArr = [].concat(plane[0], plane[1], plane[2], plane[3]);
    this.setState({
      plane,
      defaultArr
    });
  }

  clickElement(e) {
    let plane = this.state.plane;
    let position = [];
    for (let i = 0; i < 4; i++) {
      if (0 <= plane[i].indexOf(Number(e.target.value))) {
        position.push(i);
        position.push(plane[i].indexOf(Number(e.target.value)));
      }
    }
    this.checkNull(position);
  }
  checkNull(position) {
    console.log("position: ", position);
    let row = position[0];
    let cell = position[1];
    let plane = this.state.plane;
    //Определяем положение пустого элемента
    if (plane[row - 1] && plane[row - 1][cell] == 0) {
      plane[row - 1][cell] = plane[row][cell];
      plane[row][cell] = 0;
    }
    if (plane[row][cell + 1] == 0) {
      plane[row][cell + 1] = plane[row][cell];
      plane[row][cell] = 0;
    }
    if (plane[row + 1] && plane[row + 1][cell] == 0) {
      plane[row + 1][cell] = plane[row][cell];
      plane[row][cell] = 0;
    }
    if (plane[row][cell - 1] == 0) {
      plane[row][cell - 1] = plane[row][cell];
      plane[row][cell] = 0;
    }
    this.setState({
      plane
    });
  }

  initPlane(plane) {
    this.setState({ plane: plane.shuffle(true) });
  }

  checkArray(plane) {
    // let arr = [].concat(plane[0], plane[1], plane[2], plane[3]);

    let defaultArr = this.state.defaultArr;
    // let defArr = [].concat(
    //   defaultArr[0],
    //   defaultArr[1],
    //   defaultArr[2],
    //   defaultArr[3]
    // );
    console.log("def: ", defaultArr);
    console.log("plane: ", plane);
    if (plane === this.state.defaultArr) {
      alert("Congratulations!");
    }
  }

  render() {
    let plane = this.state.plane;
    console.log("@plane: ", plane);
    let position = this.state.position;
    let clickElement = this.clickElement;
    this.checkArray(plane);

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
          Перемешать
        </button>
      </div>
    );
  }
}
