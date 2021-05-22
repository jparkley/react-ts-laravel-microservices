import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Dashboard from "./secure/dashboard/Dashboard"
import Users from "./secure/users/Users"
import Login from "./public/Login"
import Register from "./public/Register"
import UserCreate from "./secure/users/UserCreate"
import UserEdit from "./secure/users/UserEdit"
import "./App.css"
import Roles from "./secure/roles/Roles"
import RoleCreate from "./secure/roles/RoleCreate"
import RoleEdit from "./secure/roles/RoleEdit"
import Products from "./secure/products/Products"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} exact component={Dashboard} />
        <Route path={"/dashboard"} component={Dashboard} />
        <Route path={"/users"} exact component={Users} />
        <Route path={"/users/create"} component={UserCreate} />
        <Route path={"/users/:id/edit"} component={UserEdit} />
        <Route path={"/roles"} exact component={Roles} />
        <Route path={"/roles/create"} component={RoleCreate} />
        <Route path={"/roles/:id/edit"} component={RoleEdit} />
        <Route path={"/products"} exact component={Products} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
      </BrowserRouter>
    </div>
  )
}
export default App
