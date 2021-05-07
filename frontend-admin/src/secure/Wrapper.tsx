import React, { Component } from "react"
import Nav from "./components/Nav"
import Menu from "./components/Menu"

class Wrapper extends Component {
  render() {
    return (
      <>
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <Menu />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              {this.props.children}
            </main>
          </div>
        </div>
      </>
    )
  }
}
export default Wrapper
