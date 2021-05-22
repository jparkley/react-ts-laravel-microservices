import React, { Component } from "react"
import axios from "axios"
import Wrapper from "../Wrapper"
import { Link } from "react-router-dom"
import { Product } from "../../classes/product"

class Products extends Component {
  state = {
    products: []
  }
  componentDidMount = async () => {
    const response = await axios.get("products")
    this.setState({
      products: response.data.data
    })
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
      </Wrapper>
    )
  }
}
export default Products
