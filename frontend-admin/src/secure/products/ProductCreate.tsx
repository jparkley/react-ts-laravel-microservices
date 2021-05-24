import React, { Component, SyntheticEvent } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import Wrapper from "../Wrapper"

class ProductCreate extends Component {
  title = ""
  description = ""
  image = ""
  price = 0

  state = {
    redirect: false
  }
  submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.post("products", {
      title: this.title,
      description: this.description,
      image: this.image,
      price: this.price
    })

    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/products"} />
    }
    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" className="form-control" onChange={e => (this.title = e.target.value)} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" className="form-control" onChange={e => (this.description = e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label>Image</label>
            <div className="input-group">
              <input type="text" name="image" className="form-control" onChange={e => (this.image = e.target.value)} />
              <div className="input-group-primary">
                Upload <input type="file" hidden />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" className="form-control" onChange={e => (this.price = parseFloat(e.target.value))} />
          </div>
          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    )
  }
}
export default ProductCreate
