import React, { Component } from "react"
import { Redirect } from "react-router-dom"

class Nav extends Component {
  state = {
    redirect: false
  }
  handleClick = () => {
    localStorage.clear()
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />
    }
    return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          Discount Store
        </a>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="#" onClick={this.handleClick}>
              Sign out
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav
