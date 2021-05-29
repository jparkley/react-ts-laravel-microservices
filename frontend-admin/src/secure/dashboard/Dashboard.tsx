import React, { Component } from "react"
import Wrapper from "../Wrapper"
import c3 from "c3"

class Dashboard extends Component {
  componentDidMount() {
    let chart = c3.generate({
      bindto: "#chart",
      data: {
        x: "x",
        columns: [["x"], ["sales"]],
        types: {
          Sales: "bar"
        }
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d"
          }
        }
      }
    })
  }

  render() {
    return (
      <Wrapper>
        <h2>Daily Sales</h2>

        <div id="chart" />
        {/* <canvas className="my-4" id="myChart" width="900" height="380"></canvas> */}
      </Wrapper>
    )
  }
}
export default Dashboard
