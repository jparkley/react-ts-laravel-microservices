import React, { Component } from "react"
import axios from "axios"
import Wrapper from "../Wrapper"
import { Link } from "react-router-dom"
import { Role } from "../../classes/role"
import Deleter from "../components/Deleter"

class Roles extends Component {
  state = {
    roles: []
  }

  componentDidMount = async () => {
    const response = await axios.get("roles")
    this.setState({
      roles: response.data.data
    })
  }

  handleDelete = (id: number) => {
    this.setState({
      roles: this.state.roles.filter((r: Role) => r.id !== id)
    })
  }

  render() {
    return (
      <Wrapper>
        <h2>Roles</h2>

        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <div className="btn-toolbar mb-2">
            <Link to={"/roles/create"} className="btn btn-md btn-outline-secondary">
              Add Role
            </Link>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.roles.map((role: Role) => {
                return (
                  <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.name}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/roles/${role.id}/edit`} className="btn btn-md btn-outline-secondary mr-2">
                          Edit
                        </Link>
                        <Deleter id={role.id} endpoint={"roles"} handleDelete={this.handleDelete} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    )
  }
}
export default Roles
