import React from "react"
import { NavLink } from "react-router-dom"

const Menu = () => (
  <nav className="col-md-2 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link " to={"/dashboard"}>
            <span data-feather="home"></span>
            Dashboard <span className="sr-only">(current)</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/users"}>
            <span data-feather="layers"></span>
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/roles"}>
            <span data-feather="layers"></span>
            Roles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/products"}>
            <span data-feather="layers"></span>
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/orders"}>
            <span data-feather="layers"></span>
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
)
export default Menu
