import React, { Component, SyntheticEvent } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"
import Wrapper from "../Wrapper"
import { Role } from "../../classes/role"
import { isThisTypeNode } from "typescript"

class UserCreate extends Component {
  state = {
    roles: [],
    redirect: false
  }
  first_name = ""
  last_name = ""
  email = ""
  role_id = 0

  componentDidMount = async () => {
    const response = await axios.get("roles")
    this.setState({
      roles: response.data.data,
      redirect: false
    })
  }
  submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const response = await axios.post("users", {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      role_id: this.role_id
    })
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/users"} />
    }
    return (
      <Wrapper>
        <form className="form-signin" onSubmit={this.submit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" name="first_name" onChange={e => (this.first_name = e.target.value)} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" name="last_name" onChange={e => (this.last_name = e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" name="email" onChange={e => (this.email = e.target.value)} />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role_id" className="form-control" onChange={e => (this.role_id = parseInt(e.target.value))}>
              {this.state.roles.map((role: Role) => {
                return (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                )
              })}
            </select>
          </div>

          <button className="btn btn-lg btn-primary btn-block">Save</button>
        </form>
      </Wrapper>
    )
  }
}

export default UserCreate
