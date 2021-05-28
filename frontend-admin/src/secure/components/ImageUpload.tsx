import React, { Component } from "react"
import axios from "axios"

class ImageUpload extends Component<{ value: string; imageChanged: any }> {
  image = ""
  upload = async (files: FileList | null) => {
    if (files == null) return
    console.log(files)

    // Create an ojbect of formData
    const formData = new FormData()
    formData.append("image", files[0])
    const response = await axios.post("upload", formData)
    console.log(response)

    this.image = response.data.url
    this.props.imageChanged(this.image)
  }

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          name="image"
          className="form-control"
          onChange={e => {
            this.image = e.target.value
            this.props.imageChanged(this.image)
          }}
          value={(this.image = this.props.value)}
        />
        <div className="input-group-append">
          <label htmlFor="" className="btn btn-primary">
            Upload <input type="file" onChange={e => this.upload(e.target.files)} />
          </label>
        </div>
      </div>
    )
  }
}
export default ImageUpload
