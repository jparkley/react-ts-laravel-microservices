import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Wrapper from "../Wrapper"
import { Order } from "../../classes/order"
import Paginator from "../components/Paginator"

class Orders extends Component {
  state = {
    orders: []
  }
  page = 1
  last_page = 0

  componentDidMount = async () => {
    const response = await axios.get(`orders?page=${this.page}`)
    this.setState({
      orders: response.data.data
    })
    this.last_page = response.data.meta.last_page
    console.log(this.state.orders)
  }

  handlePageChange = async (page: number) => {
    this.page = page
    await this.componentDidMount()
  }

  render() {
    return (
      <Wrapper>
        <h2>Orders</h2>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order: Order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {order.first_name} {order.last_name}{" "}
                    </td>
                    <td>{order.email}</td>
                    <td>{order.total}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/orders/${order.id}/edit`} className="btn btn-md btn-outline-secondary mr-2">
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Paginator lastPage={this.last_page} handlePageChange={this.handlePageChange} />
      </Wrapper>
    )
  }
}
export default Orders
