import React, { Component } from "react"
import Wrapper from "../Wrapper"
import c3 from "c3"
import axios from "axios"

class Dashboard extends Component {
  componentDidMount = async () => {
    let chart = c3.generate({
      bindto: "#chart",
      data: {
        x: "x",
        columns: [
          ["x", "2021-1-1", "2021-2-1"],
          ["sales", 100, 200]
        ],
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

    const response = await axios.get("chart")
    const records: { date: string; sum: number }[] = response.data.data

    chart.load({
      columns: [
        ["x", ...records.map(r => r.date)],
        ["Sales", ...records.map(r => r.sum)]
      ]
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
