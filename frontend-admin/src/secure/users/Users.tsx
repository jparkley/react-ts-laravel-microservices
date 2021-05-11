import React, { Component } from "react"
import axios from "axios"
import Wrapper from "../Wrapper"
import { User } from "../../classes/user"
import { Link } from "react-router-dom"

class Users extends Component {
  state = {
    users: []
  }
  page = 1
  last_page = 0

  componentDidMount = async () => {
    const response = await axios.get(`users?page=${this.page}`)
    console.log(response)

    this.setState({
      users: response.data.data
    })
    this.last_page = response.data.meta.last_page
  }

  next = async () => {
    if (this.page === this.last_page) return
    this.page++
    await this.componentDidMount()
  }

  previous = async () => {
    if (this.page === 1) return
    this.page--
    await this.componentDidMount()
  }

  render() {
    return (
      <Wrapper>
        <h2>Users</h2>

        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <div className="btn-toolbar mb-2">
            <Link to={"/users/create"} className="btn btn-md btn-outline-secondary">
              Add User
            </Link>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user: User) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user.first_name} {user.last_name}{" "}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role.name}</td>
                    <td>
                      <div className="btn-group">
                        <a href="#" className="btn btn-md btn-outline-secondary mr-2">
                          Edit
                        </a>
                        <a href="#" className="btn btn-md btn-outline-danger">
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={this.previous}>
                Previous
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link" onClick={this.next}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </Wrapper>
    )
  }
}

export default Users
