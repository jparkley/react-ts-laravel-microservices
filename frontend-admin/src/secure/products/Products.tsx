import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Wrapper from "../Wrapper"
import Paginator from "../components/Paginator"

import { Product } from "../../classes/product"
import { isParenthesizedExpression } from "typescript"

class Products extends Component {
  state = {
    products: []
  }
  page = 1
  last_page = 0

  componentDidMount = async () => {
    const response = await axios.get(`products?page=${this.page}`)
    this.setState({
      products: response.data.data
    })
    this.last_page = response.data.meta.last_page
  }

  handlePageChange = async (page: number) => {
    this.page = page
    await this.componentDidMount()
  }

  delete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`products/${id}`)
      } catch (e) {
        console.log(e)
      }

      this.setState({
        products: this.state.products.filter((p: Product) => p.id !== id)
      })
    }
  }

  render() {
    return (
      <Wrapper>
        <h2>Products</h2>

        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <div className="btn-toolbar mb-2">
            <Link to={"/products/create"} className="btn btn-md btn-outline-secondary">
              Add Product
            </Link>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((product: Product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>
                      <img src={product.image} width="50" />
                    </td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/products/${product.id}/edit`} className="btn btn-md btn-outline-secondary mr-2">
                          Edit
                        </Link>
                        <a href="#" className="btn btn-md btn-outline-danger" onClick={() => this.delete(product.id)}>
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
        <Paginator lastPage={this.last_page} handlePageChange={this.handlePageChange} />
      </Wrapper>
    )
  }
}
export default Products
