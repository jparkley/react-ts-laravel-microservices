import React, { Component, SyntheticEvent } from "react"
import axios from "axios"
import Wrapper from "../Wrapper"
import { Permission } from "../../classes/permission"
import { Redirect } from "react-router-dom"

class RoleCreate extends Component {
  state = {
    permissions: [],
    redirect: false
  }
  name = ""
  selected: number[] = []

  componentDidMount = async () => {
    const response = await axios.get("permissions")
    this.setState({
      permissions: response.data.data
    })
  }

  check = (id: number) => {
    // If Id exists in the array, remove it
    if (this.selected.filter(s => s === id).length > 0) {
      this.selected = this.selected.filter(s => s !== id)
      return
    }
    this.selected.push(id) // not in the array, so push
  }

  submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const response = await axios.post("roles", {
      name: this.name,
      permissions: this.selected
    })
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/roles"} />
    }
    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="col-lg-6 form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" id="name" onChange={e => (this.name = e.target.value)} />
          </div>

          <div className="col-lg-6 form-group">
            <label>Permissions</label>
            <div className="col-sm-8">
              {this.state.permissions.map((p: Permission) => {
                return (
                  <div className="form-check form-check-inline col-3 mr-3" key={p.id}>
                    <input type="checkbox" className="form-check-input" value={p.id} onChange={e => this.check(p.id)} />
                    <label htmlFor="" className="form-check-label">
                      {p.name}
                    </label>
                  </div>
                )
              })}
            </div>
            <button className="btn btn-lg btn-primary btn-block">Save</button>
          </div>
        </form>
      </Wrapper>
    )
  }
}
export default RoleCreate
