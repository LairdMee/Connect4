import React, { Component } from 'react'
/*
rcc class component shortcut
rafc class functional component shortcut
*/
// let color = "white"


class Square extends Component {
  // constructor(props) {
  //   super(props);
  // }
  // style {
  //   backgroundColor: color,
  //   borderRadius: "100%",
  // }
  render() {
    // if (this.props.color === "1") {
    //   color = 'red';
    // } else if (this.props.color === "2") {
    //   color = 'black';
    // }

    return (
      <div
        className="square"
        style={{backgroundColor: this.props.color}}
        onClick={this.props.handleChange}
      >
        {/* {this.props.color} */}
      </div>
    )
  }
}

export default Square;

