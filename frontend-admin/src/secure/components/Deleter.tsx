import React, { Component } from "react"
import axios from "axios"

class Deleter extends Component<{ id: number; endpoint: string; handleDelete: any }> {
  delete = async () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await axios.delete(`${this.props.endpoint}/${this.props.id}`)
      this.props.handleDelete(this.props.id)
    }
  }

  render() {
    return (
      <a href="#" className="btn btn-md btn-outline-danger" onClick={() => this.delete()}>
        Delete
      </a>
    )
  }
}
export default Deleter
