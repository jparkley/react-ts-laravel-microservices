import React, { Component } from "react"
import axios from "axios"
import Wrapper from "../Wrapper"
import { OrderItem } from "../../classes/order_item"
import { Order } from "../../classes/order"

class OrderItems extends Component<{ match: any }> {
  state = {
    orderItems: []
  }
  id = 0
  componentDidMount = async () => {
    this.id = this.props.match.params.id
    const response = await axios(`orders/${this.id}`)
    const order: Order = response.data.data
    this.setState({
      orderItems: order.order_items
    })
  }
  render() {
    return (
      <Wrapper>
        <h2>Order Items</h2>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orderItems.map((orderItem: OrderItem) => {
                return (
                  <tr key={orderItem.id}>
                    <td>{orderItem.id}</td>
                    <td>{orderItem.product_title}</td>
                    <td>{orderItem.price}</td>
                    <td>{orderItem.quantity}</td>
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
export default OrderItems
