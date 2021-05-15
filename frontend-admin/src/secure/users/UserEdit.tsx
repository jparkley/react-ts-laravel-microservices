import React, { Component, PropsWithRef, SyntheticEvent } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import Wrapper from "../Wrapper"
import { Role } from "../../classes/role"
import { User } from "../../classes/user"

class UserEdit extends Component<{ match: PropsWithRef<any> }> {
  state = {
    roles: [],
    first_name: "",
    last_name: "",
    email: "",
    role_id: 0,
    redirect: false
  }
  id = 0
  first_name = ""
  last_name = ""
  email = ""
  role_id = 0

  componentDidMount = async () => {
    this.id = this.props.match.params.id

    const rolesResponse = await axios.get("roles")
    this.setState({
      roles: rolesResponse.data.data
    })

    const userResponse = await axios.get(`users/${this.id}`)
    const user: User = userResponse.data.data
    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role_id: user.role.id
    })
  }

  submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      await axios.put(`/users/${this.id}`, {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        role_id: this.role_id
      })
    } catch (e) {
      console.log(e)
    }
    this.setState({ redirect: true })
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
            <input type="text" className="form-control" name="first_name" defaultValue={(this.first_name = this.state.first_name)} onChange={e => (this.first_name = e.target.value)} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" name="last_name" defaultValue={(this.last_name = this.state.last_name)} onChange={e => (this.last_name = e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" name="email" defaultValue={(this.email = this.state.email)} onChange={e => (this.email = e.target.value)} />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              name="role_id"
              className="form-control"
              value={(this.role_id = this.state.role_id)}
              onChange={e => {
                this.role_id = parseInt(e.target.value)
                this.setState({ role_id: this.role_id })
              }}
            >
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
export default UserEdit
