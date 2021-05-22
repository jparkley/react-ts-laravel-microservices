import React, { Component, PropsWithoutRef, SyntheticEvent } from "react"
import axios from "axios"
import Wrapper from "../Wrapper"
import { Permission } from "../../classes/permission"
import { Redirect } from "react-router-dom"
import { timeStamp } from "node:console"

class RoleEdit extends Component<{ match: any }> {
  state = {
    name: "",
    selected: [],
    permissions: [],
    redirect: false
  }
  name = ""
  selected: number[] = []
  id = 0

  componentDidMount = async () => {
    this.id = this.props.match.params.id

    const permissionsCall = await axios.get("permissions")
    const roleCall = await axios.get(`roles/${this.id}`)

    const roleResponse = roleCall.data.data
    this.selected = roleResponse.permissions.map((p: Permission) => p.id)
    this.setState({
      name: roleResponse.name,
      selected: this.selected,
      permissions: permissionsCall.data.data
    })
  }

  check = (id: number) => {
    if (this.isChecked(id)) {
      this.selected = this.selected.filter(s => s !== id)
      return
    }
    this.selected.push(id)
  }

  isChecked = (id: number) => {
    return this.state.selected.filter(s => s === id).length > 0
  }

  submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.put(`roles/${this.id}`, {
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
            <input type="text" className="form-control" name="name" id="name" defaultValue={(this.name = this.state.name)} onChange={e => (this.name = e.target.value)} />
          </div>

          <div className="col-lg-6 form-group">
            <label>Permissions</label>
            <div className="col-sm-8">
              {this.state.permissions.map((p: Permission) => {
                return (
                  <div className="form-check form-check-inline col-3 mr-3" key={p.id}>
                    <input type="checkbox" className="form-check-input" value={p.id} defaultChecked={this.isChecked(p.id)} onChange={e => this.check(p.id)} />
                    <label htmlFor="" className="form-check-label">
                      {p.name}
                    </label>
                  </div>
                )
              })}
            </div>
            <button className="btn btn-lg btn-primary btn-block">Update</button>
          </div>
        </form>
      </Wrapper>
    )
  }
}
export default RoleEdit
