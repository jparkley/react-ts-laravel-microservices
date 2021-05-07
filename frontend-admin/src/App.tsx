import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Nav from "./secure/components/Nav"
import Menu from "./secure/components/Menu"
import Dashboard from "./secure/Dashboard"
import Users from "./secure/Users"
import Login from "./public/Login"
import "./App.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} exact component={Dashboard} />
        <Route path={"/users"} component={Users} />
        <Route path={"/login"} component={Login} />
      </BrowserRouter>
    </div>
  )
}
export default App
