import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Dashboard from "./secure/dashboard/Dashboard"
import Users from "./secure/users/Users"
import Login from "./public/Login"
import Register from "./public/Register"
import UserCreate from "./secure/users/UserCreate"
import "./App.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} exact component={Dashboard} />
        <Route path={"/dashboard"} component={Dashboard} />
        <Route path={"/users"} exact component={Users} />
        <Route path={"/users/create"} component={UserCreate} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
      </BrowserRouter>
    </div>
  )
}
export default App
